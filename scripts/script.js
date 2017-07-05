var	popupOverlay = document.querySelector('.popup-overlay'),
	enter = document.querySelector('.enter'),
	hiddenForm = document.querySelector('.hidden-form'),
	login = document.querySelector('.login-field'),
	password = document.querySelector('.password-field'),
	storageName = localStorage.getItem('login'),
	close = document.querySelectorAll('.close-btn'),

	mapBlock = document.querySelector('.map'),
	address = document.querySelector('.address'),

	gallery = document.querySelector('.content-gallery'),
	bigGallery = document.querySelector('.big-gallery'),
	galleryPhotos = document.querySelectorAll('.gallery-photo'),
	bigGalleryPhoto = document.querySelector('.big-gallery-photo'),
	photoShowed = document.querySelector('.photo-showed img'),
	mainIndex = document.querySelector('.main-index'),
	PhotosSrc,

	msgForm = document.querySelector('.msg-form'),
	writeMsg = document.querySelector('.write-msg'),
	emailField = document.querySelector('.email-field'),

	photoBig = document.querySelector('.photo-big'),
	photosSmall = document.querySelectorAll('.photo-small'),

	unavailable = document.querySelectorAll('.unavailable'),
	unavailableMSG = document.querySelector('.unavailable-msg'),
	newIMG,

	gallery,
	btn,
	photos,

	showed,
	indexOfShowed,

	i;

// Вывод формы входа
if (hiddenForm) {
	enter.addEventListener('click', function (event) {
		event.preventDefault();
		popupOverlay.classList.add('show-block');
		hiddenForm.classList.add('show-block');
		hiddenForm.classList.add('hidden-form-animation');
		setTimeout(function () { //ie, edge fix cursor bug
			if (storageName) {
				login.value = storageName;
				password.focus();
			} else {
				login.focus();
			}
		}, 600);
	});

	// Закрытие формы по нажатию на Esc
	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27 && hiddenForm.classList.contains('show-block')) {
			hiddenForm.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});

	// Закрытие формы входа по клику вне формы
	document.addEventListener('click', function (event) {
		if (hiddenForm.classList.contains('show-block') && event.target !== enter && event.target !== hiddenForm && event.target.parentNode !== hiddenForm && event.target.parentNode.parentNode !== hiddenForm) {
			hiddenForm.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});

	// Анимация ошибки, если хотя бы одно поле пустует
	hiddenForm.addEventListener('submit', function (event) {
		if (!login.value || !password.value) {
			event.preventDefault();
			hiddenForm.classList.remove('hidden-form-animation');
			hiddenForm.classList.add('hiddenForm-error');
			setTimeout(function () {
				hiddenForm.classList.remove('hiddenForm-error');
				if (storageName) {
					login.value = storageName;
					password.focus();
				} else {
					login.focus();
				}
			}, 600);
		} else {
			localStorage.setItem('login', login.value);
		}
	});
}

// Переключение фотографий галереи на главной странице
function photoChanging(event) {
	event.preventDefault();
	showed = document.getElementsByClassName('gallery-photo photo-showed');
	indexOfShowed = photos.indexOf(showed[0]);


	if ((this.className === 'btn btn-next') && (indexOfShowed < (photos.length - 1))) {
		photos[indexOfShowed].classList.remove('photo-showed');
		photos[indexOfShowed + 1].classList.add('photo-showed');
	} else if ((this.className === 'btn btn-prev') && (indexOfShowed > 0)) {
		photos[indexOfShowed].classList.remove('photo-showed');
		photos[indexOfShowed - 1].classList.add('photo-showed');
	}
	// переключаем фото по кругу
	if ((this.className === 'btn btn-next') && (indexOfShowed == (photos.length - 1))) {
		photos[indexOfShowed].classList.remove('photo-showed');
		photos[0].classList.add('photo-showed');
	} else if ((this.className === 'btn btn-prev') && (indexOfShowed == 0)) {
		photos[indexOfShowed].classList.remove('photo-showed');
		photos[photos.length - 1].classList.add('photo-showed');
	}

	// смена больших фотографий
	photoShowed = document.querySelector('.photo-showed img');
	PhotosSrc = photoShowed.getAttribute('src').slice(0, -6) + '.jpg';
	bigGalleryPhoto.setAttribute('src', PhotosSrc);
}

// Показать большие фотографии
function galleryShow(event) {
	event.preventDefault();
	bigGallery.classList.add('show-block');
	//чтобы большая картинка изначально не загружалась, в hnml src путое:
	PhotosSrc = photoShowed.getAttribute('src').slice(0, -6) + '.jpg';
	bigGalleryPhoto.setAttribute('src', PhotosSrc);
	bigGallery.scrollIntoView(false);
	window.scrollBy(0, 100);
}

if (gallery) {
	btn = gallery.querySelectorAll('.btn');
	photos = Array.prototype.slice.call(document.querySelectorAll('.gallery-photo'));

	for (i = 0; i < btn.length; i += 1) {
		btn[i].addEventListener('click', photoChanging);
	}

	for (i = 0; i < galleryPhotos.length; i += 1) {
		galleryPhotos[i].addEventListener('click', galleryShow);
	}

	// Закрытие большой галереи по нажатию на Esc
	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27 && bigGallery.classList.contains('show-block')) {
			bigGallery.classList.remove('show-block');
		}
	});

	// Закрытие больших фото по клику сбоку от фото
	document.addEventListener('click', function (event) {
		if (bigGallery.classList.contains('show-block') && (event.target == mainIndex || event.target == address || event.target == writeMsg || event.target == enter)) {
			bigGallery.classList.remove('show-block');
		}
	});

}

// Показать карту
if (mapBlock) {
	address.addEventListener('click', function (event) {
		event.preventDefault();
		popupOverlay.classList.add('show-block');
		mapBlock.classList.add('show-block');
		mapBlock.scrollIntoView(true);
		window.scrollBy(0, -20);
	});

	// Закрытие карты по нажатию на Esc
	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27 && mapBlock.classList.contains('show-block')) {
			mapBlock.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});
	// Закрытие карты по клику вне карты
	document.addEventListener('click', function (event) {
		if (mapBlock.classList.contains('show-block') && event.target !== address && event.target !== mapBlock && event.target.parentNode !== mapBlock) {
			mapBlock.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});
}

// Показать окно обратной связи
if (msgForm) {
	writeMsg.addEventListener('click', function (event) {
		event.preventDefault();
		popupOverlay.classList.add('show-block');
		msgForm.classList.add('show-block');
		msgForm.scrollIntoView(true);
		window.scrollBy(0, -20);
		emailField.focus();
	});

	// Закрытие формы по нажатию на Esc
	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27 && msgForm.classList.contains('show-block')) {
			msgForm.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});

	// Закрытие формы по клику вне формы
	document.addEventListener('click', function (event) {
		if (msgForm.classList.contains('show-block') && event.target !== writeMsg && event.target !== msgForm && event.target.parentNode !== msgForm) {
			msgForm.classList.remove('show-block');
			popupOverlay.classList.remove('show-block');
		}
	});
}

// Закрытие форм, карты и больших фотографий по нажатию на крестик
function closing(event) {
	event.preventDefault();
	hiddenForm.classList.remove('show-block');
	mapBlock.classList.remove('show-block');
	msgForm.classList.remove('show-block');
	bigGallery.classList.remove('show-block');
	popupOverlay.classList.remove('show-block');
}

if (close) {
	for (i = 0; i < close.length; i += 1) {
		close[i].addEventListener('click', closing);
	}
}

// Окно отсутствующего товара в каталоге
function unavailableOpening(event) {
	event.preventDefault();
	unavailableMSG.classList.add('msg-active');
}

if (unavailableMSG) {
	for (i = 0; i < unavailable.length; i += 1) {
		unavailable[i].addEventListener('click', unavailableOpening);
	}

	// Закрытие окна по клику в окне

	unavailableMSG.addEventListener('click', function (event) {
		event.preventDefault();
		unavailableMSG.classList.remove('msg-active');
	});

	// Закрытие формы по нажатию на Esc
	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27 && unavailableMSG.classList.contains('msg-active')) {
			unavailableMSG.classList.remove('msg-active');
		}
	});
}

// Переключение большого фото товара
function bigPhotoChanging() {
	newIMG = this.getAttribute('src').slice(0, -6) + '.jpg';
	photoBig.setAttribute('src', newIMG);
}
if (photoBig) {
	for (i = 0; i < photosSmall.length; i += 1) {
		photosSmall[i].addEventListener('click', bigPhotoChanging);
	}
}
