(function($,undefined){
// =================================
// =================================
// =================================

//=========page height==========
$(function(){


;(function(){
    var ddd = window.innerHeight;
    // console.log(ddd);
    var ttt = ddd /10 + 'rem'
    // console.log(ddd);
    $('.slide-height').css('height', ttt);
}());


;(function(){
    $(window).scroll(function(){
    var aaa = $('.header');
    // console.log( $(window).scrollTop());
    // console.log($('#one').height());
    if ($(window).scrollTop() > $('#one').height() ) {
    aaa.css('background', '#000');
    } else{ aaa.css('background', 'transparent')};
    });
}());

;(function(){
    $('html,body').animate({ scrollTop: 0 },500);
    window.location.hash = '#one';
    // var ccc = window.location.hash;
    // console.log(ccc);
    $('.pagination a[href="#one"]').css('background-color', '#dd1036');
    // console.log($('.pagination a [href="#one"]'));
    var ttt = 0;
    $('.pagination a, .scrol-icon, .logo a').on('click.rr ', function(event){
        var aaa = $(this).attr('href');
        var bbb = $(aaa).offset().top;
        if (ttt === 0) {
        ttt = 1;
        $('html,body').animate({ scrollTop: bbb },700,function() {
            window.location.hash = aaa;
            ttt = 0;
        });
};
        $('.pagination a').css('background-color', '#ccc');
        if ($(this).parent().hasClass('logo') == 1) {
            $('.pagination a[href="#one"]').css('background-color', '#dd1036');
        }
        else if ( $(this).hasClass('scrol-icon') == 1){
            $('.pagination a[href="#two"]').css('background-color', '#dd1036');
        }
        else{
            $(this).css('background-color', '#dd1036');
        };

        // console.log($(this).parent());
        // var rrr = $(this).context.hash;
        // console.log(rrr)
        // if (true) {};
        // $('.pagination a[href="rrr"]"').css('background-color', '#dd1036');
        // $(this).css('background-color', '#dd1036');
        // event.stopPropagation();
        // window.location.hash = aaa;
        // return false;
    });

}());


;(function(){

// $(window).on('keypress', function(e){
//  console.log(e.keyCode);
// });
$('body').keyup(function (event) {
  console.log(event.keyCode);
});

}());

;(function(){
        var aaa = 0;
        var bbb = $('#one').height();
        // var ddd = bbb - 1;

        // console.log(bbb);
        // console.log(ddd);
        // var ddd = 0;
        // $(window).on('rrr',function(){
        //     if ( ccc === 100 ) {
        //     $('.pagination a[href="#two"]').trigger('click.rr');
        //     // return false;

        // // return false
        // } else {
        //     $(window).off("scroll");
        //     $('.pagination a[href="#fore"]').trigger('click.rr');
        // }

        // });
         // $(window).on('scroll', function(){
             // if(ccc > aaa){
                // $(window).off('scroll');
             // $('.pagination a[href="#fore"]').trigger('click.rr');
             // false
        // };
        // Do some stuff here ..
        //     $(window).off("scroll");
            // $(window).trigger('rrr');
        // });
// function ggg (event, delta) {
//     console.log(delta);
//     setTimeout(function(){
//     if (delta === -1 ) {
//      $('.pagination a[href="#two"]').trigger('click.rr');
//     };
//     // return false;
//     $('#one').on('mousewheel.ff', ggg);
//     return false;
// }, 100);
//     return false;
//     $('#one').off('mousewheel.ff');

// };
// function gggg (event, delta) {
//     console.log(delta);
//     setTimeout(function(){
//     if (delta === 1 ) {
//      $('.pagination a[href="#one"]').trigger('click.rr');
//     };
//     // return false;
//     $('#two').on('mousewheel.ff', gggg);
//     return false;
//     // console.log('sgdsg');
// }, 100);
//     return false;
//     $('#two').off('mousewheel.ff');

// };


// $('#one').on('mousewheel.ff', ggg);
// $('#two').on('mousewheel.ff', gggg);
var ttt = 0;
$('#one').on('mousewheel', function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    // window.setTimeout(function(){
    if (delta === -1 ) {
     $('.pagination a[href="#two"]').trigger('click.rr');
    };
    return false;
    // $('#one').on('mousewheel.ff', ggg);
    // console.log('sgdsg');
// }, 500);
    // $('#one').off('mousewheel.ff');
    // return false;
});
$('#two').mousewheel(function(event, delta, deltaX, deltaY) {
    // console.log(delta, deltaX, deltaY);
    // window.setTimeout(function(){
    if (delta === -1 ) {
     $('.pagination a[href="#three"]').trigger('click.rr');
    };
    // return false;
    // }, 100);
    return false;
});
$('#two').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    // window.setTimeout(function(){
    if (delta === 1 ) {
     $('.pagination a[href="#one"]').trigger('click.rr');
    };
    // return false;
    // }, 100);
    return false;
});
$('#three').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === 1 ) {
     $('.pagination a[href="#two"]').trigger('click.rr');
    };
    return false;
});
$('#three').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === -1 ) {
     $('.pagination a[href="#four"]').trigger('click.rr');
    };
    return false;
});
$('#four').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === 1 ) {
     $('.pagination a[href="#three"]').trigger('click.rr');
    };
    return false;
});
$('#four').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === -1 ) {
     $('.pagination a[href="#five"]').trigger('click.rr');
    };
    return false;
});
$('#five').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === 1 ) {
     $('.pagination a[href="#four"]').trigger('click.rr');
    };
    return false;
});
$('#five').mousewheel(function(event, delta, deltaX, deltaY) {
    console.log(delta, deltaX, deltaY);
    if (delta === -1 ) {
     $('.pagination a[href="#six"]').trigger('click.rr');
    };
    return false;
});


        // $('#one').on('scroll',function(){
        //     console.log('scroll');
        //     // $('.pagination a[href="#two"]').trigger('click.rr');
        // });
                // $('#two').on('scroll',function(){
            // console.log('scroll2');
            // $('.pagination a[href="#two"]').trigger('click.rr');
        // });
//         var ccc = $(this).scrollTop();
//         // var fff = aaa + ccc;
//         console.log(ccc);
//         // console.log(aaa);
//         if ( ccc === 100 ) {
//             $(window).off("scroll");
//             // return false;

//         // return false
//         }
//         // if ( window.location.hash === '#two' ) {
//         //     $('.pagination a[href="#one"]').trigger('click.rr');
//         //     // return false;

//         // // return false
//
//         aaa = ccc;
//         return false;
//     });
}());


// (function(){
// var ddd = function ddd (){
//         var fff = $(window).scrollTop();
//         console.log(fff);
//         if (fff = 100) {
//             $('.pagination a[href="#four"]').trigger('click.rr');
//         };
//         setTimeout(ddd, 1000);

// };
// ddd();

// }());
(function(){
    var aaa = $('#login');
    var bbb = $('.ttt');
    console.log(aaa);
    console.log(bbb);
    aaa.hide();
    bbb.on('click', function(){
        // aaa.show();
        aaa.css('display','block');
        return false;

    });
$('.login__close').on('click', function(){
   aaa.hide();
    return false;
});

}());

});
//=============================


//========mouse=========
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



// ================================
// ================================
// ================================
// ================================
}(jQuery));


