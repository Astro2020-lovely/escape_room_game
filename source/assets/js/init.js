/**
	* @package Escapium HTML
	* @version 1.2.2
	* Template Scripts
	* Created by Dan Fisher
*/

;(function ($){
	'use strict';

	// Preloader
	$(window).on('load', function () {
		$('#js-preloader').delay(0).fadeOut();
		$('#js-preloader-overlay').delay(200).fadeOut('slow');
	});
	$.fn.exists = function () {
		return this.length > 0;
	};

	/* ----------------------------------------------------------- */
	/*  Predefined Variables
	/* ----------------------------------------------------------- */
	var mainNav = $('.main-nav');
	var roomsGrid = $('.js-rooms--grid');
	var mainSlider = $('.js-main-slider');
	var roomSlick = $('.js-room-single-slick');
	var roomsRelated = $('.js-rooms-related');
	var InstaFeed = $('#instagram-feed');
	var InstaFeedTagged = $('#instagram-feed-tagged');
	var mpSingle = $('.mp_single-img');
	var mpGallery = $('.mp_gallery');
	var mpIframe = $('.mp_iframe');
	var gmap = $('.gm-map');
	var testiSlick = $('.js-testimonials-slick');

	var Core = {

		initialize: function () {

			this.stickyHeader();

			this.headerNav();

			this.isotope();

			this.slickSlider();

			this.instagramFeed();

			this.googleMap();

			this.magnificPopupInit();

			this.animateOnScroll();

			this.miscScripts();

		},

		stickyHeader: function () {

			var $headerHeight = $('#header').innerHeight();
			$('.page-heading').css('padding-top', $headerHeight);

			$('#header').jPinning({

				// offset for header to hide or show in pixels
				offset: 100,

			});

		},

		headerNav: function () {

			if (mainNav.exists()) {

				var wrapper = $('.site-wrapper');
				var navList = $('.main-nav__list');
				var navListLi = $('.main-nav__list > li');
				var toggleBtn = $('#header-mobile__toggle');

				// Clone Log In Link
				var navLogin = $('.nav-secondary__login').clone();
				navLogin.appendTo(navList);

				// Mobile Menu Toggle
				toggleBtn.on('click', function (){
					wrapper.toggleClass('site-wrapper--has-overlay');
					$(this).toggleClass('burger-menu-icon--active');
				});

				$('.site-overlay, .main-nav__back').on('click', function (){
					wrapper.toggleClass('site-wrapper--has-overlay');
				});

				$('.site-overlay').on('click', function (e){
					e.preventDefault();
					wrapper.removeClass('site-wrapper--has-overlay-pushy site-wrapper--has-overlay');
				});

				// Add toggle button and class if menu has submenu
				navListLi.has('.main-nav__sub').addClass('has-children').prepend('<span class="main-nav__toggle"></span>');
				navListLi.has('.main-nav__megamenu').addClass('has-children').prepend('<span class="main-nav__toggle"></span>');

				$('.main-nav__toggle').on('click', function (){
					$(this).toggleClass('main-nav__toggle--rotate').parent().siblings().children().removeClass('main-nav__toggle--rotate');

					$('.main-nav__sub, .main-nav__megamenu').not($(this).siblings('.main-nav__sub, .main-nav__megamenu')).slideUp('normal');
					$(this).siblings('.main-nav__sub').slideToggle('normal');
					$(this).siblings('.main-nav__megamenu').slideToggle('normal');
				});

				// Add toggle button and class if submenu has sub-submenu
				$('.main-nav__list > li > ul > li').has('.main-nav__sub-2').addClass('has-children').prepend('<span class="main-nav__toggle-2"></span>');
				$('.main-nav__list > li > ul > li > ul > li').has('.main-nav__sub-3').addClass('has-children').prepend('<span class="main-nav__toggle-2"></span>');

				$('.main-nav__toggle-2').on('click', function (){
					$(this).toggleClass('main-nav__toggle--rotate');
					$(this).siblings('.main-nav__sub-2').slideToggle('normal');
					$(this).siblings('.main-nav__sub-3').slideToggle('normal');
				});

				// Search Form
				$('.js-search-form-control').on('click', function (e){
					$('html, body').addClass('search-active');
					$('.input-search').focus();
					e.preventDefault();
				});

				$('.js-search-form-close').on('click', function (e){
					$('html, body').removeClass('search-active');
					e.preventDefault();
				});
			}
		},


		isotope: function () {

			if (roomsGrid.exists() ) {
				var isotopeGrid = roomsGrid.imagesLoaded(function () {

					var $filter = $('.js-filter');

					// init Isotope after all images have loaded
					isotopeGrid.isotope({
						filter: '*',
						itemSelector: '.room',
						layoutMode: 'fitRows',
						masonry: {
							columnWidth: '.room'
						}
					});

					// filter items on button click
					$filter.on('click', 'button', function () {
						var filterValue = $(this).attr('data-filter');
						$filter.find('button').removeClass('btn-primary').addClass('btn-outline-secondary');
						$(this).removeClass('btn-outline-secondary').addClass('btn-primary');
						isotopeGrid.isotope({
							filter: filterValue
						});
					});
				});
			}

		},


		slickSlider: function () {

			// Single Room Slider
			if (mainSlider.exists()) {

				mainSlider.on('init', function (e, slick) {
					var firstAnimatingElements = $('.main-slider__item:first-child').find('[data-animation]');
					doAnimations(firstAnimatingElements);
				});
				mainSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
					var $animatingElements = $('.main-slider__item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
					doAnimations($animatingElements);
				});
				mainSlider.slick({
					autoplay: true,
					autoplaySpeed: 7000,
					arrows: false,
					dots: true,
					infinite: true,
					speed: 600,
					fade: true,
					rows: 0,
					cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				});

			}


			// Single Room Slider
			if (roomSlick.exists()) {
				roomSlick.slick({
					autoplay: true,
					autoplaySpeed: 7000,
					arrows: false,
					dots: true,
					infinite: true,
					speed: 600,
					fade: true,
					rows: 0,
					cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
				});

			}

			// Related Rooms
			if (roomsRelated.exists()) {

				roomsRelated.slick({
					arrows: true,
					dots: false,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					rows: 0,

					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								arrows: false
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								arrows: false
							}
						}
					]
				});

			}


			// Testimonials
			if (testiSlick.exists()) {
				testiSlick.slick({
					autoplay: true,
					autoplaySpeed: 7000,
					arrows: true,
					dots: false,
					infinite: true,
					speed: 600,
					cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
					slidesToShow: 2,
					slidesToScroll: 1,
					prevArrow: '<span class="slick-arrow-divider"></span><button type="button" class="slick-prev-arrow"><span></span></button>',
					nextArrow: '<button type="button" class="slick-next-arrow"><span></span></button>',
					rows: 0,

					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								arrows: false
							}
						}
					]
				});

			}

		},


		instagramFeed: function (){

			if (InstaFeed.exists()) {

				var instaFeed = new Instafeed({
					get: 'user',
					target: 'instagram-feed',
					userId: '6679748018',
					accessToken: '',
					limit: 6,
					template: '<li class="widget-instagram__item"><a href="{{link}}" id="{{id}}" class="widget-instagram__link-wrapper" target="_blank"><span class="widget-instagram__plus-sign"><img src="{{image}}" alt="" class="widget-instagram__img" /></span></a></li>'
				});
				instaFeed.run();
			}

			if (InstaFeedTagged.exists()) {

				var instaFeedTagged = new Instafeed({
					get: 'user',
					target: 'instagram-feed-tagged',
					userId: '6679748018',
					accessToken: '',
					limit: 8,
					template: '<li class="widget-instagram__item" data-aos="zoom-in" data-aos-duration="600"><a href="{{link}}" id="{{id}}" class="widget-instagram__link-wrapper" target="_blank"><span class="widget-instagram__plus-sign"><img src="{{image}}" alt="" class="widget-instagram__img" /><span class="widget-instagram__item-meta"><span class="widget-instagram__item-meta-likes"><i class="ion-heart"></i> {{likes}}</span><span class="widget-instagram__item-meta-comments"><i class="ion-chatbubble"></i> {{comments}}</span></span></span></a></li>',
					resolution: 'low_resolution'
				});
				instaFeedTagged.run();
			}

		},


		googleMap: function () {
			// Google Map
			if (gmap.exists()) {
				gmap.each(function () {

					var $elem = $(this);
					var mapAddress = $elem.attr('data-map-address') ? $elem.attr('data-map-address') : 'New York, USA';
					var mapZoom = $elem.attr('data-map-zoom') ? $elem.attr('data-map-zoom') : '15';
					var mapIcon = $elem.attr('data-map-icon') ? $elem.attr('data-map-icon') : '';
					var mapStyle = $elem.attr('data-map-style');

					var stylesOutput = '';

					// Skins
					if (mapStyle === 'default') {
						// Skin: Default
						stylesOutput = [{'featureType': 'administrative.country','elementType': 'geometry','stylers': [{'visibility': 'simplified'},{'hue': '#ff0000'}]}];

					} else if (mapStyle === 'light-dream') {
						// Skin: Light Dream
						stylesOutput = [{'featureType': 'landscape', 'stylers': [{'hue': '#FFBB00'}, {'saturation': 43.400000000000006}, {'lightness': 37.599999999999994}, {'gamma': 1}]}, {'featureType': 'road.highway', 'stylers': [{'hue': '#FFC200'}, {'saturation': -61.8}, {'lightness': 45.599999999999994}, {'gamma': 1}]}, {'featureType': 'road.arterial', 'stylers': [{'hue': '#FF0300'}, {'saturation': -100}, {'lightness': 51.19999999999999}, {'gamma': 1}]}, {'featureType': 'road.local', 'stylers': [{'hue': '#FF0300'}, {'saturation': -100}, {'lightness': 52}, {'gamma': 1}]}, {'featureType': 'water', 'stylers': [{'hue': '#0078FF'}, {'saturation': -13.200000000000003}, {'lightness': 2.4000000000000057}, {'gamma': 1}]}, {'featureType': 'poi', 'stylers':[{'hue': '#00FF6A'}, {'saturation': -1.0989010989011234}, {'lightness': 11.200000000000017}, {'gamma': 1}]}];

					} else if (mapStyle === 'shades-of-grey') {
						// Skin: Shades of Grey
						stylesOutput = [{'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': [{'saturation': 36}, {'color': '#000000'}, {'lightness': 40}]}, {'featureType': 'all', 'elementType': 'labels.text.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'all', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 17}, {'weight': 1.2}]}, {'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 21}]}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 29}, {'weight': 0.2}]}, {'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 18}]}, {'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 19}]}, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}];

					} else if (mapStyle === 'blue-water') {
						// Skin: Blue Water
						stylesOutput = [{'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#444444'}]},{'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'color': '#f2f2f2'}]}, {'featureType': 'poi', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'road', 'elementType': 'all', 'stylers': [{'saturation': -100}, {'lightness': 45}]}, {'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#46bcec'}, {'visibility': 'on'}]}];

					} else {
						// Skin: Ultra Light
						stylesOutput = [{'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#e9e9e9'}, {'lightness': 17}]}, {'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}, {'lightness': 17}]}, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]}, {'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{'color': '#ffffff'}, {'lightness': 18}]}, {'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{'color': '#ffffff'}, {'lightness': 16}]}, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]}, {'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{'color': '#dedede'}, {'lightness': 21}]}, {'elementType': 'labels.text.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]}, {'elementType': 'labels.text.fill', 'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]}, {'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]}, {'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{'color': '#fefefe'}, {'lightness': 20}]}, {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]}];
					}

					$elem.gmap3({
						zoom: Number(mapZoom),
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						scrollwheel: false,
						address: mapAddress,
						styles: stylesOutput,
					}).marker({
						address: mapAddress,
						icon: mapIcon,
					});
				});
			}
		},


		magnificPopupInit: function (){
			if (mpSingle.exists()) {
				// Single Image
				$('.mp_single-img').magnificPopup({
					type: 'image',
					removalDelay: 300,

					gallery: {
						enabled: false
					},
					mainClass: 'mfp-fade',
					autoFocusLast: false,

				});
			}

			if (mpGallery.exists() ) {
				// Multiple Images (gallery)
				$('.mp_gallery').magnificPopup({
					type: 'image',
					removalDelay: 300,

					gallery: {
						enabled: true
					},
					mainClass: 'mfp-fade',
					autoFocusLast: false,

				});
			}

			if (mpIframe.exists() ) {
				// Iframe (video, maps)
				$('.mp_iframe').magnificPopup({
					type: 'iframe',
					removalDelay: 300,
					mainClass: 'mfp-fade',
					autoFocusLast: false,

					patterns: {
						youtube: {
							index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

							id: 'v=', // String that splits URL in a two parts, second part should be %id%
							// Or null - full URL will be returned
							// Or a function that should return %id%, for example:
							// id: function(url) { return 'parsed id'; }

							src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
						},
						vimeo: {
							index: 'vimeo.com/',
							id: '/',
							src: '//player.vimeo.com/video/%id%?autoplay=1'
						},
						gmaps: {
							index: '//maps.google.',
							src: '%id%&output=embed'
						}
					},

					srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".

				});
			}
		},


		animateOnScroll: function () {

			AOS.init();

		},


		miscScripts: function () {

		},

	};

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function() {
				$this.removeClass($animationType);
			});
		});
	}

	$(document).on('ready', function () {
		Core.initialize();
	});

})(jQuery);
