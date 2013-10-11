(function($,undefined){
// =================================
//========mouse wheel=========
    (function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
    }(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    }));
// ===============================

// =========ready===================
$(function(){
// =================================


//=========resize page height==========
;(function(){
    var aaa = window.innerHeight;
    var bbb = aaa /10 + 'rem'
    var ccc = $('.slide-height');
    ccc.css('height', bbb);
    // $(window).on('resize', function(){
        // ccc.css('height', window.innerHeight / 10 + 'rem');
    // });
}());


//=========main menu black==========
;(function(){
    var aaa = $('.header');
    $(window).scroll(function(){
        if ($(window).scrollTop() > $('#one').height() ) {
            aaa.css('background', '#000');
        }
        else{
             aaa.css('background', 'transparent')
        };
        return false;
    });
}());


//=========half global var==========
var pagg = $('.pagination');

//=========pagination click animation==========
;(function(){
    var aaa = $('html,body');
    aaa.animate({ scrollTop: 0 },500);
    window.location.hash = '#one';
    pagg.find('a[href="#one"]').css('background-color', '#dd1036');
    var stop = 0;
    pagg.find('a').on('click.pagg ', function(event){
        var that = $(this);
        var ccc = $(this).attr('href');
        var ddd = $(ccc).offset().top;
        if (stop === 0) {
            stop = 1;
            $('html,body').animate({ scrollTop: ddd },500,function() {
                window.location.hash = ccc;
                pagg.find('a').css('background-color', '#ccc');
                that.css('background-color', '#dd1036');
                stop = 0;
            });
        };
        return false;
    });

}());

// ======= others buttons animation===============
(function(){
    $('.scrol-icon, .logo a, .contact').on('click', function(){
        var ccc = $(this).attr('href');
        var ddd = 'a[href="' + ccc + '"]';
        pagg.find(ddd).trigger('click.pagg');
        return false;
    });
}());


//========= keyup animation==========
;(function(){
    $(window).on('keydown', function (e) {
      var aaa = window.location.hash;
      if ( e.keyCode === 38 || e.keyCode === 37) {
            var ccc = $(aaa).prev().attr('id');
            var ddd = 'a[href="#' + ccc + '"]';
            pagg.find(ddd).trigger('click.pagg');
      }
      else if ( e.keyCode === 40 || e.keyCode === 39){
            var ccc = $(aaa).next().attr('id');
            var ddd = 'a[href="#' + ccc + '"]';
            pagg.find(ddd).trigger('click.pagg');
      }
      else{
        return true;
      };
      return false;
    });
}());

//========= scroll animation==========
;(function(){
    var scroll = function scroll (sc){
        var aaa = $(sc);
        aaa.on('mousewheel', function(event, delta) {
            if (delta === -1) {
                var ccc = $(this).next().attr('id');
                var ddd = 'a[href="#' + ccc + '"]';
                pagg.find(ddd).trigger('click.pagg');
            }
            else if (delta === 1) {
                var ccc = $(this).prev().attr('id');
                var ddd = 'a[href="#' + ccc + '"]';
                pagg.find(ddd).trigger('click.pagg');
            }
            else{
                return false;
            };
        return false;
        });
    };
    scroll('#one');
    scroll('#two');
    scroll('#three');
    scroll('#four');
    scroll('#five');
    scroll('#six');
}());


//=============login form================
(function(){
    var aaa = $('#login');
    var bbb = $('.main-nav');
    aaa.hide();
    // fadeIn()
    bbb.find('a[href="#login"]').on('click', function(){
        // aaa.show();
        aaa.fadeIn('slow');
        return false;
    });
    $('.login__close, .login__background').on('click', function(){
        aaa.hide();
        return false;
    });
}());






//=============================
});
// ================================

// ================================
// ================================
// ================================
}(jQuery));


