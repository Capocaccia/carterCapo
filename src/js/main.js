let $header = $('.header');
let $section = $('.section');

$('.header--h1').on('click', function(){
    window.location = '/'
});

$section.click(function(){
    let sectionTitle = $(this).children('p').html();
    let location = sectionTitle.replace(/\s/g, '');
    contentChange(location);
});





function contentChange(location){
    $('.' + location).removeClass('hidden');
    $header.siblings().not(document.getElementsByClassName(location)).addClass('hidden');
};

