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


	//swiper
	var swiper_1 = new Swiper('.subsection_slider-l .swiper-container', {
		effect: 'fade',
		simulateTouch :false,
		slidesPerView: 1,
		loop: true,
		speed: 500
	});
	var swiper_2 = new Swiper('.subsection_slider-r .swiper-container', {
		effect: 'fade',
		simulateTouch :false,
		slidesPerView: 1,
		nextButton: '.swiper-button-next',
		loop: true,
		speed: 5000
	});
	var swiper_3 = new Swiper('.subsection_slider-c .swiper-container', {
		effect: 'fade',
		slidesPerView: 1,
		loop: true,
		speed: 500,
	});

	// swiper_2.params.control = [swiper_3];
	// swiper_3.params.control = [swiper_1];

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
				console.log(data)
				TweenLite.to($prlx, 1, data);
			});
		});
	};

	$('.swiper-slide_inner').each(function(){
		var $this = $(this),
				vW = $this.innerWidth(),
				vH = $this.innerHeight(),
				maskInner = $(this).find('.slide_mask-inner');

			maskInner.css({
				"width": vW,
				"height": vH
			});
	});

	$('.main-view').on('mousemove', function(e){
		var x, x1;
		var deltaX = e.pageX;
		var deltaY = e.pageY;

		var kx = deltaX / 20;

		$('.slide_mask-inner').each(function(){
			var data1 = {}, 
					data2 = {},
					$prlx1 = $(this),
					axisX = 'x',
					axisY = 'y',
					wrapperRect;
			speed = parseInt(deltaX, 10) / 109 || 0.20;

			x1 = Math.round((deltaX) * speed) / 890;
			y1 = Math.round((deltaY) * speed) / 890;

			TweenLite.to($prlx1, 1, 
				{
					x: x1,
					y: y1
				}
			);
		});

				
		

	});

});
