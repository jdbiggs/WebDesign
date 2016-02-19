'use strict';
var Common;
Common = {
    init: function () {
        var self = this;

        self.initEvents();

        //$(window).on({
        //    load: function () {
        //    },
        //    resize: function () {
        //        clearTimeout(self.resizeTimeout);
        //        self.resizeTimeout = setTimeout(function () {
        //        }, 100);
        //    },
        //    scroll: function () {
        //    }
        //});
    },

    initEvents: function () {
        var msgInput = $('.js-msg-input'),
            payInputBox = $('.js-pay-inputBox'),
            payInputBtn = $('.pay-input-btn'),
            msgBtn = $('.msg-btn'),
            payBtn = $('.pay-btn'),
            requestBtn = $('.request-btn'),
            photoBtn = $('.photo-btn'),
            currencyNav = $('.cur-nav');

        msgInput.on('focus', function() {
            payInputBtn.hide();
            msgBtn.show();
        });

        msgInput.on('focusout', function() {
            payInputBtn.show();
            msgBtn.hide();
        });

        payInputBtn.on('click', function(e) {
            e.preventDefault();
            payInputBtn.hide();
            photoBtn.hide();
            msgInput.hide();
            payBtn.show();
            currencyNav.show();
            requestBtn.show();
            payInputBox.css({display: 'block'});
        });

        //payBtn.on('click', function(e) {
        //    $('.calculating').show();
        //    currencyNav.hide();
        //});

       $('.cur-nav__link').on('click', function(e) {
	       e.preventDefault();
	        Common.changeCur.apply(this);
       });


	    $('.modal__cancelBtn').on('click', function(e) {
		    payInputBtn.show();
		    photoBtn.show();
		    msgInput.show();
		    payBtn.hide();
		    currencyNav.hide();
		    requestBtn.hide();
		    payInputBox.css({display: 'none'});
	    });

	    $('.autosize:visible').each(function() {
		    Common.initAutoSize.apply(this);
	    });


	    $('.def-field-pay').focus(function(e) {
		    e.preventDefault();
		    Common.setFocusPayField.apply(this);
	    }).focusout(function(e) {
		    e.preventDefault();
		    Common.loseFocusPayField.apply(this);
	    });

    },

	changeCur: function() {
		var newCur = $(this).text();
		$('.cur-nav__link').removeClass('active');
		$(this).addClass('active');
		$('.pay-input-placeholder').text(newCur);
	},

    initAutoSize: function() {
        autosize($(this));
    },

	setFocusPayField: function() {
		$(this).closest('.payForm__rowBox').removeClass('filled').addClass('focused');
		$(this).closest('.payForm__row').removeClass('filled').addClass('focused');

		$(this).closest('.payForm__row').siblings().removeClass('filled');
		$(this).closest('.payForm__row').siblings().find('.def-field-pay').val('');
	},

	loseFocusPayField: function() {

		if(!$.trim($(this).val())) {
			$(this).closest('.payForm__row').removeClass('focused').removeClass('filled');
			$(this).closest('.payForm__rowBox').removeClass('focused').removeClass('filled');
		} else {
			$(this).closest('.payForm__row').removeClass('focused').addClass('filled');
			$(this).closest('.payForm__rowBox').removeClass('focused').addClass('filled');
		}
	}
};

$(document).ready(function() {
    Common.init();
});