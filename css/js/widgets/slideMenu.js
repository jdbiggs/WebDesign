
var SlideMenu ={
	init: function() {
		var slideMenuTrigger = $('.nav-btn'),
			navWrapper = $('.header'),
			slideWidth = 230,
			menu = $('.slideMenu'),
			menuBg = $('#slideMenu__helper'),
			animSpeed = 200;

		SlideMenu.initJQueryEvents(slideMenuTrigger, navWrapper, slideWidth,  menu, menuBg, animSpeed);
		SlideMenu.initGlobalEvents(slideMenuTrigger, navWrapper, slideWidth,  menu, menuBg, animSpeed);

		$(window).on({
			load: function () {
			},
			resize: function () {
				clearTimeout(self.resizeTimeout);
				self.resizeTimeout = setTimeout(function () {
					SlideMenu.fixMenuHeight(menu);
				}, 100);
			},
			scroll: function () {
			}
		});
	},

	initJQueryEvents: function(slideMenuTrigger, navWrapper, slideWidth,menu, menuBg, animSpeed) {
		slideMenuTrigger.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			SlideMenu.openMenu(slideMenuTrigger, navWrapper, slideWidth, menu, menuBg, animSpeed);
			SlideMenu.fixMenuHeight(menu);
		});

		menu.on('click', function(e) {
			e.stopPropagation();
		});
	},

	initGlobalEvents: function(slideMenuTrigger, navWrapper, slideWidth,menu, menuBg, animSpeed) {
		$(document).click(function(){
			SlideMenu.closeMenu(slideMenuTrigger, navWrapper, slideWidth, menu, menuBg, animSpeed);
		});
	},

	openMenu: function(slideMenuTrigger, navWrapper, slideWidth, menu, menuBg, animSpeed) {
		var selected = $(this).hasClass('slide-open');
		menu.stop(true, true).animate({left: 0}, animSpeed);
		menuBg.stop(true, true).animate({left: 0}, animSpeed);

		$(this).addClass('slide-open', !selected);
		$('body').addClass('slide-open');
	},

	closeMenu: function(slideMenuTrigger, navWrapper, slideWidth, menu, menuBg, animSpeed) {
		menu.stop(true, true).animate({left: -slideWidth}, animSpeed);
		menuBg.stop(true, true).animate({left: -slideWidth}, animSpeed);

		slideMenuTrigger.removeClass('slide-open');
		$('body').removeClass('slide-open');
	},

	fixMenuHeight: function(menu) {
		menu.css({maxHeight: $(window).height()});
	}
};

$(function() {
	SlideMenu.init();
});