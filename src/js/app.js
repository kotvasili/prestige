$(document).ready(function () {
	setTimeout(function(){
		$(window).scrollTop(0);
	}, 100);
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
					data = {}, topBorder;
			$parallaxes.each(function(){
				data = {};
				$prlx = $(this);
				axis = $prlx.data('axis') || 'y',
				topBorder = $('.frame_top'),
				bottomBorder = $('.frame_bottom');

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

				wrapperMargin = ($(window).height() - topBorder.innerHeight() - bottomBorder.innerHeight() - wrapperRect.height) / 2;

				if (0 > wrapperMargin && (scrollTop + wrapperRect.top) <= topBorder.innerHeight()) {
					wrapperMargin = 0;
				}

				y = Math.round((wrapperRect.top - topBorder.innerHeight() - wrapperMargin) * speed) * direction;

				if (scrollTop === 0) {
					y = 0;
				} else {
					scrollHeight = bSH;
					scrollPosition = $(window).height() + scrollTop;
					if (
						scrollHeight - wrapperOffset - $wrapper.innerHeight() - bottomBorder.innerHeight() <= 2 &&
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

	function appendSlide() {
		$('.sq-carousel-r .sq-carousel-item').each(function(){
			var _ = $(this),
				bgItem = _.find('.sq-carousel_bg'),
				bg = bgItem.attr('style');
			bgItem.append('<div class="sq-carousel_mask sq-carousel_mask-first"><div class="sq-carousel_mask-inner" style="' + bg + '"></div></div><div class="sq-carousel_mask sq-carousel_mask-second"><div class="sq-carousel_mask-inner" style="' + bg +'"></div></div>');	
		});
		maskSize();
		if($('.sq-carousel_mask-inner').length) {
			Motion($('.sq-carousel_mask-inner'));
		}
	}
	appendSlide();	

	function Motion($motion) {
		var $direction, $wrapper;

		$('.sq-carousel').on('mousemove', function(e){
			var x, y,
				deltaX = e.pageX,
				deltaY = e.pageY;

				$motion.each(function(){
					var speedX, speedY,
						direction = $(this).data('direction') || 1;

						speedX = parseInt(deltaX, 10) / 109 * direction || 0.20;
						speedY = parseInt(deltaY, 10) / 109 * direction || 0.20;

						x = Math.round((deltaX) * speedX) / 790;
						y = Math.round((deltaY) * speedY) / 590;

						TweenLite.to($motion, 1,{x: x, y: y})
				});
		});
	};	
	
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

					var kx = (vW / maskVW) * 16.59;

					$this.children().css({
						"width": vW,
						"height": vH,
						"right": -kx
					});
				} else {
					var maskVW = $(this).width();
					var kx = (vW / maskVW) * 24.59;
					$this.children().css({
						"width": vW,
						"height": vH,
						"left": -kx
					});
				}

			});
		});
	}
	$(window).on('resize', function() {
			maskSize();
	});


	//main carousel
	(function(){
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

	})();


	(function(){
		var $activeSlide = $('.active'),
			$slide = $('.carousel_layout-item'),
			$visibleSlide = $(':nth-child(-n+3)'),
			$layout = $('.carousel_layout'),
			$btnNext = $('.carousel_layout-next');

		function initProjects() {
			TweenLite.set($slide.not($visibleSlide), {
				autoAlpha: 0
			});

			var tl = new TimelineLite();
			tl
				.set($('.carousel_layout-item.active'), {x: '0', rotationY: 13, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next(), {x: '-7%', scaleX:0.92, scaleY:0.92, rotationY: 15, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next().next(), {x: '-13%', scaleX:0.85, scaleY:0.85, rotationY: 15, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next().next().next(), {x: '-13%', scaleX:0.85, scaleY:0.85, rotationY: 15, transformOrigin:"left 50%"})
		};

		initProjects();

		function refreshSlide(current, prev, prevPrev, prevPrevPrev) {
			var tl = new TimelineLite();
				tl
					.set(current, {x: '0', autoAlpha: 1, scaleX: 1, scaleY: 1, className: '-=active', zIndex: 3})
					.set(prev, {x: '-7%', scaleX: 0.92, scaleY: 0.92, className: '+=active', zIndex: 2})
					.set(prevPrev, {x: '-13%', scaleX: 0.85, scaleY: 0.85, zIndex: 1})
					.set(prevPrevPrev, {autoAlpha: 0, x: '-13%', scaleX:0.85, scaleY:0.85, rotationY: 13, transformOrigin:"left 50%"})

					.to(current, 0.5, {x: '0', autoAlpha: 0, scaleX: 1.1, scaleY: 1.1, ease:Power3.easeInOut}, 0)
					.to(prev, 0.5, {x: '+=7%', scaleX: 1, scaleY: 1, ease:Power3.easeInOut}, 0)
					.to(prevPrev, 0.5, {x: '+=6%', scaleX: 0.92, scaleY: 0.92, ease:Power3.easeInOut}, 0)
					.to(prevPrevPrev, 0.5, {autoAlpha: 1, ease:Power3.easeInOut}, 0)
				
		}

		$btnNext.on('click', function(e){
			e.preventDefault();
			//if($(this).hasClass('animate')) return false;

			//$(this).addClass('animate');

			var current = $('.carousel_layout').find('.active'),
				prev = current.next(),
				prevPrev = prev.next(),
				prevPrevPrev = prevPrev.next(),
				length = $('.carousel_layout').find('.carousel_layout-item').length;

			refreshSlide(current, prev, prevPrev, prevPrevPrev)
		});

	})();



});
