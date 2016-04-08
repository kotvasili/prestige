$(document).ready(function () {
	function burger(){
		var burger = $('.humburger'),
				nav = $('.navigation'),
				close = nav.find('.close');

		burger.on('click', function(){
			nav.addClass('inner-nav')
		});
		close.on('click', function(){
			nav.removeClass('inner-nav')
		});
	};
	burger();

	//Parallax
	if($('.parallax').length) {
		Parallax($('.parallax'));
	}
	function Parallax($parallaxes) {
		$(window).on('scroll', function(){
			var scrollTop = $(window).scrollTop(),
					bSH = $('body').scrollHeight,
					$prlx, $wrapper, wrapperRect, wrapperOffset, wrapperMargin,
					speed, direction, y, scrollHeight, scrollPosition, axis,
					data = {};
			$parallaxes.each(function(){
				data = {};
				$prlx = $(this);
				axis = $prlx.data('axis') || 'y';

				if (!$prlx.length) {
					return false;
				}

				if ($prlx.closest('.js-parallax-wrapper').length) {
					$wrapper = $prlx.closest('.js-parallax-wrapper');
				} else {
					$wrapper = $prlx.parent();
				}

				wrapperRect = $wrapper[0].getBoundingClientRect();
				speed = parseInt($prlx.data('speed'), 10) / 109 || 0.20;
				direction = parseInt($prlx.data('direction'), 10) || 1;
				wrapperOffset = $wrapper.offset().top;

				// if (wrapperMargin < 0 && (scrollTop + wrapperRect.top) <= Helpers.topBorder) {
				// 	wrapperMargin = 0;
				// }

				y = Math.round((wrapperRect.top) * speed) * direction;

				if (scrollTop === 0) {
					y = 0;
				} else {
					scrollHeight = bSH;
					scrollPosition = $(window).height() + scrollTop;
					if (
						scrollHeight - wrapperOffset - $wrapper.innerHeight() <= 2 &&
						(scrollHeight - scrollPosition) / scrollHeight === 0
						) {
						y = 0;
					}
				}
				data[axis] = y;
				TweenLite.to($prlx, 1, data);
			});
		});
	};

	// $('.swiper-slide_inner').each(function(){
	// 	var $this = $(this),
	// 			vW = $this.innerWidth(),
	// 			vH = $this.innerHeight(),
	// 			maskInner = $(this).find('.slide_mask-inner');

	// 		maskInner.css({
	// 			"width": vW,
	// 			"height": vH
	// 		});
	// });

	// $('.main-view').on('mousemove', function(e){
	// 	var x, x1;
	// 	var deltaX = e.pageX;
	// 	var deltaY = e.pageY;

	// 	var kx = deltaX / 20;

	// 	$('.slide_mask-inner').each(function(){
	// 		var data1 = {}, 
	// 				data2 = {},
	// 				$prlx1 = $(this),
	// 				axisX = 'x',
	// 				axisY = 'y',
	// 				wrapperRect;
	// 		speed = parseInt(deltaX, 10) / 109 || 0.20;

	// 		x1 = Math.round((deltaX) * speed) / 890;
	// 		y1 = Math.round((deltaY) * speed) / 890;

	// 		TweenLite.to($prlx1, 1, 
	// 			{
	// 				x: x1,
	// 				y: y1
	// 			}
	// 		);
	// 	});
	// });

	function maskSize() {
		var rotator = $('.sq-carousel-r'),
			rotatorItem = rotator.find('.sq-carousel-item');

		rotatorItem.each(function(){
			var $this = $(this),
				parent = $this.parents('.sq-carousel-r'),
				vW = parent.width(),
				vH = parent.height(),
				maskInner = $this.find('.sq-carousel_mask-inner'),
				mask = $this.find('.sq-carousel_mask');

			mask.each(function(){
				var $this = $(this);
				if($this.hasClass('sq-carousel_mask-first')) {
					var maskVW = $(this).width();

					console.log(maskVW)

					var kx = (vW / maskVW) * 20.59;

					$this.children().css({
						"width": vW,
						"height": vH,
						"right": -kx
					});
				} else {
					var maskVW = $(this).width();
					var kx = (vW / maskVW) * 24.59;
					console.log(maskVW)
					$this.children().css({
						"width": vW,
						"height": vH,
						"left": -kx
					});
				}

			});
		});
	}
	maskSize();
	$(window).on('resize', function() {
			maskSize();
	});


	//main carousel

	var $activeSlide = $('.active'),
			$slide = $('.sq-carousel-item'),
			$btnNext = $('.sq-carousel-next'),
			$rCarousel = $('.sq-carousel-r'),
			$lCarousel = $('.sq-carousel-l'),
			$cCarousel = $('.sq-carousel-c')

	function init() {
		TweenLite.set($slide.not($activeSlide), {
			autoAlpha: 0
		});
		var tl1 = new TimelineLite();
		tl1
			.set($rCarousel, {x: '100%'})
			.set($lCarousel, {x: '-100%'})
			.set($cCarousel, {y: '100%'})
			.to($rCarousel, 1.5, {x: '-=100%', ease:Power3.easeInOut},0)
			.to($lCarousel, 1.5, {x: '+=100%', ease:Power3.easeInOut},0)
			.to($cCarousel, 1.5, {y: '-=100%', ease:Power3.easeInOut},0)
		

	}
	init();

	function goToNextSlide(sQleft, sQright, sQcenter){
		var tl = new TimelineLite({onComplete: foo});

		var $sQleftOut = sQleft.find('.sq-carousel-item.active'),
				$sQleftIn = sQleft.find('.sq-carousel-item.active').next('.sq-carousel-item'),
				$sQleftFirst = sQleft.find('.sq-carousel-item:first-of-type'),
				$sQrightOut = sQright.find('.sq-carousel-item.active'),
				$sQrightIn = sQright.find('.sq-carousel-item.active').next('.sq-carousel-item'),
				$sQrightFirst = sQright.find('.sq-carousel-item:first-of-type'),
				$sQcenterOut = sQcenter.find('.sq-carousel-item.active'),
				$sQcenterIn = sQcenter.find('.sq-carousel-item.active').next('.sq-carousel-item'),
				$sQcenterFirst = sQcenter.find('.sq-carousel-item:first-of-type');


		if($sQleftIn.length !== 0 && $sQrightIn.length !== 0 && $sQcenterIn.length !== 0) {
			tl
				.set($sQleftIn, {x: '-100%', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQleftOut , {className: '-=active', zIndex: 1})

				.set($sQrightIn, {x: '100%', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQrightOut , {className: '-=active', zIndex: 1})

				.set($sQcenterIn, {y: '100%', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQcenterOut , {className: '-=active', zIndex: 1})

				.to($sQleftOut, 1.5, {x: '-100%', zIndex: 1, ease:Power3.easeInOut}, 0)
				.to($sQleftIn, 1.5, {x: '+=100%', zIndex: 4, ease:Power3.easeInOut}, 0)

				.to($sQrightOut, 1.5, {x: '100%', zIndex: 1, ease:Power3.easeInOut}, 0)
				.to($sQrightIn, 1.5, {x: '-=100%', zIndex: 4, ease:Power3.easeInOut}, 0)

				.to($sQcenterOut, 1.5, {y: '100%', zIndex: 1, autoAlpha: 0, ease:Power3.easeInOut}, 0)
				.to($sQcenterIn, 1.5, {y: '-=100%', zIndex: 4, ease:Power3.easeInOut}, 0)
		} else {
			tl
				.set($sQleftFirst, {x: '0', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQleftOut , {className: '-=active', zIndex: 1})

				.set($sQrightFirst, {x: '0', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQrightOut , {className: '-=active', zIndex: 1})

				.set($sQcenterFirst, {y: '0', autoAlpha: 1, className: '+=active', zIndex: 4})
				.set($sQcenterOut , {className: '-=active', zIndex: 1})

				.to($sQleftFirst, 1.5, {x: '+=100%', zIndex: 4, ease:Power3.easeInOut}, 0)
				.to($sQleftOut, 1.5, {x: '-100%', zIndex: 1, ease:Power3.easeInOut}, 0)

				.to($sQrightFirst, 1.5, {x: '-=100%', zIndex: 4, ease:Power3.easeInOut, onComplete: foo}, 0)
				.to($sQrightOut, 1.5, {x: '100%', zIndex: 1, ease:Power3.easeInOut}, 0)

				.to($sQcenterFirst, 1.5, {y: '-=100%', zIndex: 4, ease:Power3.easeInOut, onComplete: foo}, 0)
				.to($sQcenterOut, 1.5, {y: '100%', zIndex: 1, autoAlpha: 0, ease:Power3.easeInOut}, 0)
		}
	}

	function foo() {
		$btnNext.removeClass('animate');
	}

	$btnNext.on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('animate')) return false;

		$(this).addClass('animate');

		var sQleft = $('.sq-carousel-l'),
				sQright = $('.sq-carousel-r'),
				sQcenter = $('.sq-carousel-c');

		goToNextSlide(sQleft, sQright, sQcenter);
	});

});