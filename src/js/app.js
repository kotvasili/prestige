$(document).ready(function () {

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		$('.section__links').find('.text').css({
			'background-image': 'none',
			'background-color': 'transparent'
		});
		var svg = '<svg viewBox="0 0 41.2 19" xmlns="http://www.w3.org/2000/svg"><path class="fill" d="m0,8.9l25,0l0,2l-25,0l0,-2z" clip-rule="evenodd" fill-rule="evenodd"/><path class="stroke" d="m39.2,9.5l-13.5,7.8l0,-15.6l13.5,7.8z" stroke-miterlimit="10" stroke-width="2" fill="none"/></svg>';
		$('.section__links').find('.icon').css({
			'background-image': 'none',
			'background-color': 'transparent'
		}).append(svg);
	}

	//breadcrumbs 
	function breadcrumbs() {
		var vh = $(window).height(),
			fT = $('.frame_top').height(),
			fB = $('.frame_bottom').height(),
			inner = $('.breadcrumbs-inner');

		inner.css('width', vh - fT -fB)

	};
	breadcrumbs();

	$(window).on("resize", function(){
		breadcrumbs();
	});


	//images or links draggeble
	function drag() {
		$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	}
	drag();

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

	//swiper

	var design = $('.carousel__designer');
	if(design.length) {
		var designerNav = design.find('.carousel__designer-navi'),
			itemLength = design.find('.designer-slide').length - design.find('.swiper-slide-duplicate').length;

		console.log(itemLength)
		if(itemLength === 1) {
			designerNav.hide();
		}
		var swiper = new Swiper(design, {
			effect: 'fade',
			slidesPerView: 1,
			nextButton: '.carousel__designer-next',
			loop: true
		});
	}

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

				wrapperMargin = ($(window).height() - topBorder.innerHeight() - bottomBorder.innerHeight() - wrapperRect.height + 850) / 2;

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
	}
	appendSlide();	

	function Motion($motion) {
		var $direction, $wrapper;

		//console.log($motion.length)

		$('.sq-carousel').on('mousemove', function(e){
			var x, y,
				deltaX = e.pageX,
				deltaY = e.pageY;

				//$motion.each(function(){
					var speedX, speedY,
						direction = $(this).data('direction') || 1;

						speedX = parseInt(deltaX, 10) / 109 * direction || 0.20;
						speedY = parseInt(deltaY, 10) / 109 * direction || 0.20;

						x = Math.round((deltaX) * speedX) / 790;
						y = Math.round((deltaY) * speedY) / 590;

						TweenLite.to($('.sq-carousel-item.active').find('.sq-carousel_mask-inner'), 1,{x: x, y: y})
				//});
		});
	};
	function MotionKill($motion) {
			//console.log($motion.length)
			TweenLite.killTweensOf($motion);
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
			Motion();
			var tl1 = new TimelineLite();
			tl1
				.set($rCarousel, {x: '100%'})
				.set($lCarousel, {x: '-100%'})
				.set($cCarousel, {y: '100%'})
				.to($rCarousel, 1.5, {x: '-=100%', ease:Power3.easeInOut},0)
				.to($lCarousel, 1.5, {x: '+=100%', ease:Power3.easeInOut},0)
				.to($cCarousel, 1.5, {y: '-=100%', ease:Power3.easeInOut},0)

			if($rCarousel.find('.sq-carousel-item').length === 1 || $lCarousel.find('.sq-carousel-item').length === 1 || $cCarousel.find('.sq-carousel-item').length === 1) {
				$btnNext.hide()
			}

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
			Motion();
			MotionKill($('.sq-carousel-item.active').siblings().find('.sq-carousel_mask-inner'));
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
			$btnNext = $('.carousel_layout-next'),
			$slideText = $('.carousel_text-item');
		

		function initProjects() {
			if($slide.length === 1) $btnNext.hide();

			TweenLite.set($slide.not($visibleSlide), {
				autoAlpha: 0
			});
			TweenLite.set($slideText.not($activeSlide), {
				autoAlpha: 0
			});				

			var tl = new TimelineLite();
			tl
				.set($('.carousel_layout-item.active'), {x: '0', rotationY: 17, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next(), {x: '-2.9%', scaleX:0.92, scaleY:0.92, rotationY: 17, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next().next(), {x: '-5.1%', scaleX:0.85, scaleY:0.85, rotationY: 17, transformOrigin:"left 50%"})
				.set($('.carousel_layout-item.active').next().next().next(), {x: '-5.1%', scaleX:0.85, scaleY:0.85, rotationY: 17, transformOrigin:"left 50%"})
		};

		initProjects();

		function refreshSlide(current, prev, prevPrev, prevPrevPrev) {
			var tl = new TimelineLite({onComplete: circleSlide});
			tl
				.set(current, {x: '0', autoAlpha: 1, scaleX: 1, scaleY: 1, className: '-=active', zIndex: 3})
				.set(prev, {x: '-2.9%', scaleX: 0.92, scaleY: 0.92, className: '+=active', zIndex: 2})
				.set(prevPrev, {x: '-5.1%', scaleX: 0.85, scaleY: 0.85, zIndex: 1})
				.set(prevPrevPrev, {autoAlpha: 0, x: '-5.1%', scaleX:0.85, scaleY:0.85, rotationY: 17, transformOrigin:"left 50%", zIndex: 0})

				.to(current, 1, {x: '0', autoAlpha: 0, scaleX: 1.1, scaleY: 1.1, ease:Power3.easeInOut}, 0)
				.to(prev, 1, {x: '+=2.9%', scaleX: 1, scaleY: 1, ease:Power3.easeInOut}, 0)
				.to(prevPrev, 1, {x: '+=2.2%', scaleX: 0.92, scaleY: 0.92, ease:Power3.easeInOut}, 0)
				.to(prevPrevPrev, 1, {autoAlpha: 1, ease:Power3.easeInOut}, 0)		
		}

		function refreshText(currentTextOut, currentTextIn) {
			var $first = currentTextOut.parents().find('.carousel_text-item:first-of-type'),
				$titleOut = currentTextOut.find('.title'),
				$titleIn = currentTextIn.find('.title'),
				$titleInFirst = $first.find('.title'),
				tl = new TimelineLite();

				console.log($(currentTextIn).length)

			if(currentTextIn.length !== 0) {
				tl
					.set(currentTextIn, {y: '15%', autoAlpha: 0, className: '+=active', zIndex: 4})
					.set(currentTextOut, {className: '-=active', zIndex: 1, autoAlpha: 1})

					.to(currentTextIn, 1, {y: '-=15%', autoAlpha: 1, ease:Power3.easeInOut}, 0)
					.to(currentTextOut, 1, {y: '-=15%', autoAlpha: 0, zIndex: 1, ease:Power3.easeInOut}, 0)
			} else {
				tl
					.set($first, {y: '15%', autoAlpha: 0, className: '+=active', zIndex: 4})
					.set(currentTextOut, {className: '-=active', zIndex: 1, autoAlpha: 1})

					.to($first, 1, {y: '-=15%', autoAlpha: 1, ease:Power3.easeInOut}, 0)
					.to(currentTextOut, 1, {y: '-=15%', autoAlpha: 0, zIndex: 1, ease:Power3.easeInOut}, 0)
			}
		}

		$btnNext.on('click', function(e){
			e.preventDefault();
			if($(this).hasClass('animate')) return false;

			$(this).addClass('animate');

			var current = $('.carousel_layout').find('.active'),
				prev = current.next(),
				prevPrev = prev.next(),
				prevPrevPrev = prevPrev.next(),
				currentTextOut = $('.carousel_text-item.active'),
				currentTextIn = $('.carousel_text-item.active').next('.carousel_text-item');
			refreshSlide(current, prev, prevPrev, prevPrevPrev);
			refreshText(currentTextOut, currentTextIn);
		});

		function circleSlide() {
			var active = $('.carousel_layout-item.active'),
				buff,
				parent = active.parent(),
				tl = new TimelineLite(),
				item = $('.carousel_layout-item');

			buff = active.prev().clone();
			active.prev().remove();
			parent.append(buff);

			if( item.length === 2 ) {
				tl
					.set(item, {x: '0', rotationY: 17, transformOrigin:"left 50%",zIndex: 3})
					.set(item.next(), {x: '-2.9%', scaleX:0.92, scaleY:0.92, rotationY: 17, transformOrigin:"left 50%", zIndex: 1})

					.to(item.next(), 0.2, {autoAlpha: 1, ease:Power3.easeInOut}, 0)
			} else if( item.length === 3 ) {
				tl
					.set(item, {x: '0', rotationY: 17, transformOrigin:"left 50%", zIndex: 3})
					.set(item.next(), {x: '-2.9%', scaleX:0.92, scaleY:0.92, rotationY: 17, transformOrigin:"left 50%", zIndex: 2})
					.set(item.next().next(), {x: '-5.1%', scaleX: 0.85, scaleY: 0.85, zIndex: 1})

					.to(item.next(), 0.2, {autoAlpha: 1, ease:Power3.easeInOut}, 0)
			} else {
				tl
					.set(item.last(), {x: '-5.1%', scaleX:0.85, scaleY:0.85, rotationY: 17, transformOrigin:"left 50%", zIndex: 0})
			}

			$btnNext.removeClass('animate');

		}

	})();


	function workLink(){
		var parent = $('.work_gallery');

		parent.each(function(){
			var _ = $(this),
				link = _.find('a'),
				center = _.find('.center');
			var tl = new TimelineLite();

			link.on('mouseover', function(){
				var $this = $(this);
				if($this.parent().hasClass('left')) {
					_.addClass('top_right');					
				} else if ($this.parent().hasClass('right')) {
					_.addClass('bottom_left');	
				} else if($this.parent().hasClass('center')) {
					_.addClass('right_left');
				} else {
					return false;
				}
			});

			link.on('mouseout', function (event) {
				var $this = $(this),
						$target = $(event.target);

					if($target.parents('.work_gallery-item').hasClass('left')) {
						_.removeClass('top_right')
					} else if($target.parents('.work_gallery-item').hasClass('right')) {
						_.removeClass('bottom_left');
					} else if($target.parents('.work_gallery-item').hasClass('center')) {
						_.removeClass('right_left');
					};
			})

		});
	};
	workLink();


	// isotope
	if ($('.projects').length) {
		isotopeSorts($('.project__grid'));
	}

	function isotopeSorts(grid) {
		var $grid = grid.isotope({
			itemSelector: '.projects-col',
			layoutMode: 'fitRows',
			category: '[data-category]'
		});
		$('.filter__item').on('click', function(){
			var fValue = $(this).data('filter');
			$grid.isotope({filter: fValue});
		})
	}


});
