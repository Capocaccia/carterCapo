$('.navicon').on('click', function(){
    $(this).parent().siblings('.header').slideToggle();
    $('.navicon').toggleClass('active');
});