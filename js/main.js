'use strict'

document.addEventListener('DOMContentLoaded', e => {
   function testWebP(callback) {
   let webP = new Image()
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2)
   }
   webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebP(function (support) {
   if (support == true) {
      document.querySelector('body').classList.add('webp')
   } else {
      document.querySelector('body').classList.add('no-webp')
   }
})

   let iconMenu = document.querySelector('.icon-menu')
let menuButtons = document.querySelectorAll('._menu-btn')
let body = document.querySelector('body')
let menuBody = document.querySelector('.menu__body')
if (menuButtons.length > 0) {
   menuButtons.forEach(menuBtn => {
         menuBtn.addEventListener('click', function () {
            iconMenu.classList.toggle('active')
            body.classList.toggle('lock')
            menuBody.classList.toggle('active')
         })
   })
}

   // HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
   const headerPos = $('.header__bottom').offset()

$(window).scroll(() => {
   const scrollTop = $(window).scrollTop()
   if ($(document).width() > 991.98) {
      if (scrollTop >= headerPos.top) {
         if (!$('.header').hasClass('scrolled')) {
            $('.header').addClass('scrolled')
         }
      } else {
         $('.header').removeClass('scrolled')
      }
   } else {
      if (scrollTop >= 50) {
         if (!$('.header').hasClass('scrolled')) {
            $('.header').addClass('scrolled')
         }
      } else {
         $('.header').removeClass('scrolled')
      }
   }
})

   $('.goto').click(function () {
   var el = $(this).attr('href').replace('#', '')
   if (el) {
		let offset = 0
		let headerHeight;
		if ($(document).width() > 991.98) {
			headerHeight = $('.header__bottom').height()
		} else {
			headerHeight = $('header').height()
		}
		console.log(headerHeight);
      $('body,html').animate(
         {
            scrollTop: $('.' + el).offset().top + offset - headerHeight,
         },
         700,
         function () {},
      )

      if ($('.menu__body').hasClass('active')) {
         $('.menu__body,.icon-menu').removeClass('active')
         $('body').removeClass('lock')
      }
      return false
   }
})

   $('body').on('click', '.tab__navitem', function (event) {
   var eq = $(this).index()
   if ($(this).hasClass('parent')) {
      var eq = $(this).parent().index()
   }
   if (!$(this).hasClass('active')) {
      $(this).closest('.tabs').find('.tab__navitem').removeClass('active')
      $(this).addClass('active')
      $(this)
         .closest('.tabs')
         .find('.tab__item')
         .removeClass('active')
         .eq(eq)
         .addClass('active')
      if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
         $(this).closest('.tabs').find('.slick-slider').slick('setPosition')
      }
   }
})

   //SLIDERS
if ($('.works__items').length > 0) {
   $('.works__items').slick({
      autoplay: false,
      infinite: false,
      arrows: true,
      slidesToShow: 1,
      nextArrow: $('.works__slider .arrows__arrow_next'),
      prevArrow: $('.works__slider .arrows__arrow_prev'),
   })

   $('.works__items').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
      changeSlideNum(nextSlide + 1)
   })

   const changeSlideNum = (slideNum = 1) => {
      $('.works__slide-num').text(() => {
         return `${slideNum} из ${$('.works__item').length}`
      })
	}
	changeSlideNum()
}
/*


// SLIDER ON MOBILE
if($('.reviews-object__items').length>0){
		let slider=$('.reviews-object__items');
	function reviews_object(){
		slider.slick({
			dots: true,
			arrows: false,
			accessibility:false,
			slidesToShow:1,
			autoplaySpeed: 3000,
			//asNavFor:'',
			//appendDots:
			//appendArrows:$('.mainslider-arrows .container'),
			nextArrow:'<button type="button" class="slick-next ic-arrow"></button>',
			prevArrow:'<button type="button" class="slick-prev ic-arrow"></button>',
			responsive: [{
				breakpoint: 9999,
				settings:'unslick'
			},{
				breakpoint: 768,
				settings: {
					
				}
			}]
		});
	}
		reviews_object();
	$(window).resize(function(event) {
			var w=$(this).outerWidth();
		if(w<768 && !slider.hasClass('slick-initialized')){
			reviews_object();
		}
	});
}


//SLICK FIX
function slick_fix(slider){
	//SET OPTIONS
	//$('.progress__slider').slick('slickSetOption',{autoplay:false},true);
		var sltoshow=slider.get(0).slick.options.slidesToShow;
		var all=slider.find('.slick-slide').length;
		var allactive=slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function(event,slick,currentSlide,nextSlide){
		if(nextSlide==0){
				var ind=all-allactive;
			if(sltoshow==1){
				slider.find('.slick-slide').eq(ind).addClass('active');
			}else{
				sliderfix(slider,ind);
			}
		}
		if(nextSlide==allactive-1){
			if(sltoshow==1){
				slider.find('.slick-slide').eq(0).addClass('active');
			}else{
				sliderfix(slider,sltoshow-1);
			}
		}
		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		}else if(nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0 )) {
			direction = 'next';
		}else{
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function(event, slick, currentSlide){
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider,v){
		for (var i=0; i < sltoshow; i++) {
				var n=v+i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}
}
*/
/*
if($('.newsmodule-slider').length>0){
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function(event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo',$(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);
	
	$('.newsmodule-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.newsmodule-navigator-info span').eq(0).html(nextSlide+1);
	});
	$('.newsmodule-slider').on('afterChange', function(event, slick, currentSlide){
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide+1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function(event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function(event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}
*/

   //UP
$(window).scroll(function () {
   var w = $(window).width()
   if ($(window).scrollTop() > 50) {
      $('#up').fadeIn(300)
   } else {
      $('#up').fadeOut(300)
   }
})
$('#up, .to-top').click(function (event) {
   event.preventDefault()
   $('body,html').animate({ scrollTop: 0 }, 300)
})

   $('.pl').click(function (event) {
   var pl = $(this).attr('href').replace('#', '')
   popupOpen(pl)
   return false
})
function popupOpen(pl) {
   $('.popup').removeClass('active').hide()
   setTimeout(function () {
      $('body').addClass('lock')
   }, 300)

   history.pushState('', '', '#' + pl)
   $('.popup-' + pl)
      .fadeIn(300)
      .delay(300)
      .addClass('active')

   if ($('.popup-' + pl).find('.slick-slider').length > 0) {
      $('.popup-' + pl)
         .find('.slick-slider')
         .slick('setPosition')
   }
}
function popupClose() {
   $('.popup').removeClass('active').fadeOut(300)
   if (!$('.menu__body').hasClass('active')) {
      $('body').removeClass('lock')
   }
   history.pushState('', '', window.location.href.split('#')[0])
}
$('.popup-close,.popup__close').click(function (event) {
   popupClose()
   return false
})
$('.popup').click(function (e) {
   if (
      !$(e.target).is('.popup>.popup__container *') ||
      $(e.target).is('.popup-close') ||
      $(e.target).is('.popup__close')
   ) {
      popupClose()
      return false
   }
})
$(document).on('keydown', function (e) {
   if (e.which == 27) {
      popupClose()
   }
})
   const forms = () => {
   const forms = document.forms

   for (let i = 0; i < forms.length; i++) {
      const form = forms[i]

      form.addEventListener('submit', e => {
         e.preventDefault()
         sendForm(form)
      })
   }

   async function sendForm(form) {

      let error = validateForm(form)

      let formData = new FormData(form)

      if (error === 0) {
         form.classList.add('_sending')
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
         })
         if (response.ok) {
            let result = await response.json()
            popupOpen('succes')
            form.reset()
            form.classList.remove('_sending')
         } else {
            popupOpen('fail')
            form.classList.remove('_sending')
         }
      }
   }

   function validateForm(form) {
      let error = 0
      const formReq = form.querySelectorAll('._req')

      for (let i = 0; i < formReq.length; i++) {
         const input = formReq[i]
         removeFormError(input)
         if (input.classList.contains('_email')) {
            if (!validateEmail(input)) {
               addFormError(input)
               error++
            }
         } else if (input.classList.contains('_phone')) {
            if (!validatePhone(input)) {
               addFormError(input)
               error++
            }
         } else {
            if (input.value.trim().length <= 1) {
               addFormError(input)
               error++
            }
         }
      }

      return error
   }

   function addFormError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
   }
   function removeFormError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
   }

   function validateEmail(input) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(input.value).toLowerCase())
   }
   function validatePhone(input) {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return re.test(String(input.value).toLowerCase())
   }
}
forms()

   const calcValue = () => {
   let sum = 0
   let percent = 1
   $('.form-calc__slider').each(function () {
      if ($(this).hasClass('_bool')) {
         if ($(this).find('.ui-slider-value').text() == 'Да') {
            percent *= $(this).data().percent
         }
      } else {
         sum += $(this).data().price * +$(this).find('.ui-slider-value').text()
      }
   })
   return ((sum / 2) * percent).toFixed()
}


   let ranges = $('.slider-range')
   $('.form-calc__slider').slider({
		min: 100,
		max: 1,
      create: function () {
			let text
         if ($(this).hasClass('_bool')) {
            if ($(this).slider('value') == 1) {
               text = 'Да'
            } else {
               text = 'Нет'
            }
         } else {
            text = $(this).slider('value')
         }
         $(this).find('.ui-slider-value').text(text)
      },
      slide: function (event, ui) {
         let text
         if ($(this).hasClass('_bool')) {
            if (ui.value == 1) {
               text = 'Да'
            } else {
               text = 'Нет'
            }
         } else {
            text = ui.value
         }
			$(this).find('.ui-slider-value').text(text)
			$('.calc__price p').text(calcValue())
			
      },
	})

	$( ".form-calc__slider._bool" ).slider( "option", "min", 0 );
	$( ".form-calc__slider_height" ).slider( "option", "max", 400 );
	$( ".form-calc__slider_width" ).slider( "option", "max", 600 );

})
