$('.navicon').on('click', function(){
    $(this).parent().siblings('.header').stop().slideToggle();
    $('.navicon').toggleClass('active');
});