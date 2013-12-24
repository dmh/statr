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

// =========smart resize===================
  (function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

  })(jQuery,'smartresize');
// =================================





//=========half global var===========
var pagg = $('.pagination');
window.location.hash = '#one';

//=========temp==========
// $('.animated_blocks').addClass('animate');
!("ontouchstart" in document.documentElement) &&  $('body').addClass('no-touch');
//========================

// ==============helper function====================
function helper (as,www){
    if ( as.keyCode === 40 || as.keyCode === 39 || as === 'up' || as === -1){
        var ccc = www.next().attr('id');
        var ddd = 'a[href="#' + ccc + '"]';
        pagg.find(ddd).trigger('click.pagg');
    }
    else if ( as.keyCode === 38 || as.keyCode === 37 || as === 'down' || as === 1) {
            var ccc = www.prev().attr('id');
            var ddd = 'a[href="#' + ccc + '"]';
            pagg.find(ddd).trigger('click.pagg');
    }
    else{
        return false;
    };
};
// =========================================


//=========pagination click animation==========
;(function(){

function rock(){
    // var aaa = $('html,body');
    // aaa.animate({ scrollTop: 0 },500);
    pagg.find('a[href="#one"]').css('background-color', '#dd1036');
    var stop = 0;
    pagg.find('a').on('click.pagg ', function(event){
        // console.log(stop);
        if (stop === 0) {
        var ccc = $(this).attr('href');
        var that = $(this);
            stop = 1;
            !window.TransitionEvent ?
                // ======================
            (function(){
                var ddd = $(ccc).offset().top;
                $('html,body').animate({ scrollTop: ddd },500,function() {
                    window.location.hash = ccc;
                    pagg.find('a').css('background-color', '#ccc');
                    that.css('background-color', '#dd1036');
                    stop = 0;
                });
            }())
                //======================
            :(function(){
            var ddd = window.innerHeight;
            var ar = ['#one', '#two', '#three', '#four', '#five', '#six', '#seven'];
            var lkk = ar.indexOf(ccc) * ddd;
            var lkj = 'translateY(-'+ lkk + 'px)';

            $('.all-slides').css({ 'transform': lkj });
            window.location.hash === '#two' && $('.animated_blocks').addClass('animate');
            // $('.all-slides').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
                    setTimeout (function(){
                    // e.stopPropagation();
                    $('.header').addClass('fixed');
                    window.location.hash = ccc;
                    pagg.find('a').css('background-color', '#ccc');
                    that.css('background-color', '#dd1036');

                        window.location.hash === '#one' && $('.header').removeClass('fixed');
                        // window.location.hash === '#two' && $('.animated_blocks').addClass('animate');

                        var ben = $('.main-nav a[href="#three"]');
                        var winl = window.location.hash;

                        (winl=== '#three' || winl ==='#four' || winl ==='#five' || winl ==='#six' ) ? ben.addClass('active') : ben.removeClass('active');
                    return false;
                // });


                    },600);
                    setTimeout (function(){

                        stop = 0;

                    },900);
                    // function benn (){
                    // };
                    // window.location.hash === '#two' && $('.animated_blocks').addClass('animate');

            }());
        }
        else {
            return false
        };
        if ( ccc  === '#three' || ccc === '#four' || ccc === '#five'|| ccc === '#six') {$(ccc).find('.slide-small-box, .foto__text').addClass('anima-small-slide') };
        return false;
    });

};
window.innerWidth > 700 &&   rock();


}());
//=========footer tabs==========
;(function(){

    var aaa = $('#seven');
        aaa.find('.pricing').on('click', function(){
        // $(this).addClass('red-link');
        // aaa.find('.question').removeClass
        aaa.removeClass('show__form');
        aaa.addClass('show__pricing');
        var that = $(this);
        redLink(that);
        // redLink();
        return false;


    });
    aaa.find('.question').on('click.que', function(){
        aaa.removeClass('show__pricing');
        aaa.addClass('show__form');
        var that = $(this);
        redLink(that);
        // redLink();
        return false;
    });
        function redLink (that){
        that.hasClass('pricing') ? that.addClass('redlink') && aaa.find('.question').removeClass('redlink') : aaa.find('.question').addClass('redlink') && aaa.find('.pricing').removeClass('redlink');
        setTimeout(function(){$('.slide-long__text').first().css('opacity', 0)},400);
        // console.log(that.hasClass('pricing'));
        // return console.log(that);
    };

}());


//=========resize page height==========
;(function(){
    var aaa = window.innerHeight;
    var ccc = $('.slide-height');
    window.innerWidth > 700 && ccc.css('height', aaa);
    window.innerWidth < 700 && ccc.css('height', 600);
    window.innerWidth < 700 && $('#seven').css({'height':'auto', 'padding-bottom':'110px' });
    window.innerWidth > 700 && (function (){
    $(window).smartresize(function(){
        ccc.css('height', window.innerHeight);
        var ar = ['#one', '#two', '#three', '#four', '#five', '#six', '#seven'];
        var plpl = window.innerHeight * ar.indexOf(window.location.hash)
        var lkj = 'translateY(-'+ plpl + 'px)';
        $('.all-slides').css({'transform': lkj});
    });
    }());

}());


// ======= others buttons animation========================================BUG
(function(){
    $('.scrol-icon, .logo a, .contact, .main-nav a[href="#three"]').on('click', function(){
        var ccc = $(this).attr('href');
        var ddd = 'a[href="' + ccc + '"]';
        pagg.find(ddd).trigger('click.pagg');
        ccc === '#seven' &&  $('.question').trigger('click.que');
        //event.preventDefault();
        if (window.innerWidth > 700 ) {return false;}
        // if (window.innerWidth < 700 ) {
        //     var bbb = $('.main-nav');
        //     bbb.removeClass('mob-menu-act');
        //     }
        // return false;
        // .trigger('click.pagg');
    });
    // $('.logo a').on('click', function(){
        // var re = $(this).attr('href');
        // var ge = 'a[href="' + re + '"]';
        // pagg.find('a[href="#one"]').trigger('click.pagg');
        // $().trigger('click.pagg');
        // return false;
    // });
}());


//========= keyup animation==========
;(function(){
    $(window).on('keydown', function (e) {
        var aaa = window.location.hash;
        var www = $(aaa);
        var as = e;
        helper(as, www);
    });
}());

//=============login form================
(function(){
    var aaa = $('#login');
    var bbb = $('.main-nav');
    if(!("ontouchstart" in document.documentElement)) {
        bbb.find('a[href="#login"]').on('click', function(){
            aaa.addClass('show');
            return false;
        });
        $('.login__close, .login__background').on('click', function(){
            aaa.removeClass('show');

            if (window.innerWidth < 700 ) {
                var bbb = $('.main-nav');
                bbb.removeClass('mob-menu-act');
            }

            return false;
        });
    }
    else{
        $(window).swipe({swipe:function(e){}});
        bbb.find('a[href="#login"]').on('touchstart', function(){
                    aaa.addClass('show');
                    return false;
        });
        $('.login__close').on('touchstart', function(){
            aaa.removeClass('show');

            if (window.innerWidth < 700 ) {
                var bbb = $('.main-nav');
                bbb.removeClass('mob-menu-act');
            }

            return false;
        });
    };
}());



//=========mobile-menu==========
(function(){
    function aaa(){
        var aaa = $('.mob-menu');
        var bbb = $('.main-nav');
        aaa.on('click', function(e){
                aaa.toggleClass('mob-act');
                bbb.toggleClass('mob-menu-act')
                // bbb.addClass('mob-menu-act')
                return false;
            });
    };
window.innerWidth < 700 &&   aaa();
}());












//=========touch & scroll animation==========
;(function(){
    var scroll = function scroll (sc){
        var aaa = $(sc);
        // ===============swipe================================
        aaa.swipe( {
            swipe:function(e, direction) {
                var www = $(this);
                var as = direction;
                helper(as, www);
            },
            fallbackToMouseEvents: false,
            threshold:75
        });
        // ==============mousewheel=========================
        aaa.on('mousewheel', function(e, delta) {
            var www = $(this);
            var as = delta;
            helper(as, www);
            return false;
        });
    };
window.innerWidth > 700 &&  scroll('#one') | scroll('#two') | scroll('#three') | scroll('#four') | scroll('#five') | scroll('#six') | scroll('#seven');
window.innerWidth < 700 && $(window).swipe("disable");
}());
// ================================



//=============================
});
// ================================

// ================================
// ================================
// ================================
}(jQuery));


