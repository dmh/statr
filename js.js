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
    // var ccc = window.location.hash;
    // console.log(ccc);
    $('.pagination a[href="#one"]').css('background-color', '#dd1036');
    // console.log($('.pagination a [href="#one"]'));
    $('.pagination a, .scrol-icon, .logo a').on('click', function(event){
        var aaa = $(this).attr('href');
        var bbb = $(aaa).offset().top;
        $('html,body').animate({ scrollTop: bbb },600,function() {
            window.location.hash = aaa;
        });
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
        return false;
    });

}());
// ;(function(){
    // $('.pagination__link').first().css('background-color', 'red');

// }());

;(function(){
        var aaa;
        // var ccc = $('#one').height();
        $(window).on('scroll',function(){
        var bbb = $(this).scrollTop();
        // var fff = aaa + ccc;
        // console.log(bbb);
        // console.log(ddd);
        if (bbb > aaa) {
            console.log('down')
            // var ccc = bbb + ddd;
            // console.log(ccc);
            // $(this).scrollTop(ccc);
            // $("html, body").animate({ scrollTop: fff });
        }
        else{
            // var ccc = bbb + $('#one').height();
            console.log('up')
        };
        aaa = bbb;
    });
}());



});
//=============================


//========modal plugin=========

// ===============================



// ================================
// ================================
// ================================
// ================================
}(jQuery));


