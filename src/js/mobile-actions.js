$('.navicon').on('click', function(){
    $(this).parent().siblings('.header').stop().slideToggle();
    $('.navicon').toggleClass('active');
});

$('.section').on('click', function(){
    if($('.navicon').hasClass('active')){
        $('.header').slideUp();
        $('.navicon').removeClass('active');
    }
});
