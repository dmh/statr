// =================================
// =====IMPORTANT!!!================
// =====Variables like (aaa, bbb, ccc, ddd etc) used as local variables in IIFE (immediately-invoked function expression).

(function ($, undefined) {

//========mouse wheel===============
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
// =================================

// =========ready===================
    $(function () {

// =========smart resize============
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

//=========global var===============
        var pagg = $('.pagination');
        window.location.hash = '#one';
        !('ontouchstart' in document.documentElement) &&  $('body').addClass('no-touch');
    // ==============helper function====================
        function helper(as, www) {
            if (as.keyCode === 40 || as.keyCode === 39 || as === 'up' || as === -1) {
                var ccc = www.next().attr('id'),
                    ddd = 'a[href="#' + ccc + '"]';
                pagg.find(ddd).trigger('click.pagg');
            } else if (as.keyCode === 38 || as.keyCode === 37 || as === 'down' || as === 1) {
                var cccc = www.prev().attr('id'),
                    dddd = 'a[href="#' + cccc + '"]';
                pagg.find(dddd).trigger('click.pagg');
            } else {
                return false;
            }
        }
    // =========================================

    //=========pagination click animation==========
        (function () {

            function rock() {
                var $html = $('html,body');
                $html.animate({ scrollTop: 0 }, 500);
                pagg.find('a[href="#one"]').css('background-color', '#dd1036');
                var stop = 0;
                pagg.find('a').on('click.pagg ', function (event) {
                    // console.log(stop);
                    var ccc = $(this).attr('href');
                    if (stop === 0) {
                        var that = $(this),
                            ddd = $(ccc).offset().top;
                        stop = 1;
                        $('html,body').animate({ scrollTop: ddd }, 500, function () {
                            $('.header').addClass('fixed');
                            window.location.hash = ccc;
                            pagg.find('a').css('background-color', '#ccc');
                            that.css('background-color', '#dd1036');

                            window.location.hash === '#one' && $('.header').removeClass('fixed');
                            window.location.hash === '#two' && $('.animated_blocks').addClass('animate');

                            var $benefits = $('.main-nav a[href="#three"]'),
                                winLocHash = window.location.hash;

                            (winLocHash === '#three' || winLocHash === '#four' || winLocHash === '#five' || winLocHash === '#six') ? $benefits.addClass('active') : $benefits.removeClass('active');
                            // stop = 0;
                            setTimeout(function () {
                                stop = 0;
                            }, 100);

                        });
                    } else {
                        return false;
                    }
                    if (ccc  === '#three' || ccc === '#four' || ccc === '#five' || ccc === '#six') {$(ccc).find('.slide-small-box, .foto__text').addClass('anima-small-slide'); }
                    return false;
                });
            }
            window.innerWidth > 700 &&   rock();

        }());
    //=========footer tabs==========
        (function () {

            var aaa = $('#seven');
            aaa.find('.pricing').on('click', function () {
                aaa.removeClass('show__form');
                aaa.addClass('show__pricing');
                var that = $(this);
                redLink(that);
                // redLink();
                return false;

            });
            aaa.find('.question').on('click.que', function () {
                aaa.removeClass('show__pricing');
                aaa.addClass('show__form');
                var that = $(this);
                redLink(that);
                // redLink();
                return false;
            });
            function redLink(that) {
                that.hasClass('pricing') ? that.addClass('redlink') && aaa.find('.question').removeClass('redlink') : aaa.find('.question').addClass('redlink') && aaa.find('.pricing').removeClass('redlink');
                setTimeout(function () {$('.slide-long__text').first().css('opacity', 0); }, 400);
            }
        }());

        //=========resize page height
        (function () {
            var aaa = window.innerHeight,
                ccc = $('.slide-height');
            window.innerWidth > 700 && ccc.css('height', aaa);
            window.innerWidth < 700 && ccc.css('height', 600);
            window.innerWidth < 700 && $('#seven').css({ 'height': 'auto', 'padding-bottom': '110px' });
            window.innerWidth > 700 && (function () {
                $(window).smartresize(function () {
                    ccc.css('height', window.innerHeight);
                    var ar = ['#one', '#two', '#three', '#four', '#five', '#six', '#seven'];
                    $(this).scrollTop(window.innerHeight * ar.indexOf(window.location.hash));
                });
            }());
        }());

        // ======= others buttons animation========================================BUG
        (function () {
            $('.scrol-icon, .logo a, .contact, .main-nav a[href="#three"]').on('click', function () {
                var ccc = $(this).attr('href'),
                    ddd = 'a[href="' + ccc + '"]';
                pagg.find(ddd).trigger('click.pagg');
                ccc === '#seven' &&  $('.question').trigger('click.que');
                if (window.innerWidth > 700) {return false; }
                if (window.innerWidth < 700) {
                    var rtrt = $('.main-nav');
                    rtrt.removeClass('mob-menu-act');
                }
            });
        }());

        //========= keyup animation==========
        (function () {
            $(window).on('keydown', function (e) {
                var aaa = window.location.hash,
                www = $(aaa),
                as = e;
                helper(as, www);
            });
        }());

        //=============login form================
        (function () {
            var aaa = $('#login'),
                bbb = $('.main-nav');
            if (!('ontouchstart' in document.documentElement)) {
                bbb.find('a[href="#login"]').on('click', function () {
                    aaa.addClass('show');
                    return false;
                });
                $('.login__close, .login__background').on('click', function () {
                    aaa.removeClass('show');
                    if (window.innerWidth < 700) {
                        var rtrt = $('.main-nav');
                        rtrt.removeClass('mob-menu-act');
                    }

                    return false;
                });
            } else {
                $(window).swipe({ swipe: function () {} });
                bbb.find('a[href="#login"]').on('touchstart', function () {
                    aaa.addClass('show');
                    return false;
                });
                $('.login__close').on('touchstart', function () {
                    aaa.removeClass('show');

                    if (window.innerWidth < 700) {
                        var rtrt = $('.main-nav');
                        rtrt.removeClass('mob-menu-act');
                    }

                    return false;
                });
            }
        }());

        //=========mobile-menu==========
        (function () {
            function mobNav() {
                var aaa = $('.mob-menu'),
                    bbb = $('.main-nav');
                aaa.on('click', function () {
                    aaa.toggleClass('mob-act');
                    bbb.toggleClass('mob-menu-act');
                    return false;
                });
            }
            window.innerWidth < 700 &&   mobNav();
        }());

        //=========touch & scroll animation==========
        (function () {
            var scroll = function scroll(sc) {
                var aaa = $(sc);
                // ===============swipe================================
                aaa.swipe({
                    swipe: function (e, direction) {
                        var that = $(this),
                            dir = direction;
                        helper(dir, that);
                    },
                    fallbackToMouseEvents: false,
                    threshold: 75
                });
                // ==============mousewheel=========================
                aaa.on('mousewheel', function (e, delta) {
                    var that = $(this),
                        dir = delta;
                    helper(dir, that);
                    return false;
                });
            };
            window.innerWidth > 700 &&  scroll('#one') | scroll('#two') | scroll('#three') | scroll('#four') | scroll('#five') | scroll('#six') | scroll('#seven');
            window.innerWidth < 700 && $(window).swipe('disable');
        }());
    // =============================
    });
// =================================
// =================================
// =================================
}(jQuery));
