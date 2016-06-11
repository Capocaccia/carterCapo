let sections = ['Contact', 'About', 'Projects'];
let stylingClasses = ['section-first', 'section-second', 'section-third'];
let backgrounds = ['src/images/car.jpeg', 'src/images/cliffs.jpeg', 'src/images/wave.jpeg'];
let questions = ['Test Question 1', 'Test Question 2'];
let answers = ['Answer 1', 'Answer 2'];
let contentBlocks = $('.content');

let $header = $('.header');
$('.home').css('display', 'flex');

for(var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionClass = 'section ';
    var classes = sectionClass.concat(section);
    $('.header--h1').after('<div class=\''+ classes + ' ' + stylingClasses[i] + '\'><p class="title">' + sections[i] + '</p></div>');
}

for(var a = 0; a < backgrounds.length; a++){
    $( contentBlocks[a + 1] ).css('background-image', 'url(' + backgrounds[a] + ')');
}

for(var b = 0; b < questions.length; b++){
    if(b == 0){
        $('.content-items').html('<div class="content-item"><div class="content-item--question"> </div> <div class="content-item--answer"> </div></div>');
        $('.content-item--question').html(questions[b]);
        $('.content-item--answer').html(answers[b]);
    } else {
        $('.content-item').after('<div class="content-item"><div class="content-item--question"> </div> <div class="content-item--answer"> </div></div>');
        $('.content-items').children('.content-item:last').children('.content-item--question').html(questions[b]);
        $('.content-items').children('.content-item:last').children('.content-item--answer').html(answers[b]);
    }
};

$('.content-item').on('click', function(){
    $(this).children('.content-item--answer').slideToggle();
    $(this).children('.content-item--question').toggleClass('js_arrow_rotate');
});

let $section = $('.section');

$section.click(function(){
    let sectionTitle = $(this).children('p').html();
    let location = sectionTitle.replace(/\s/g, '');
    contentChange(location);
});

function contentChange(location){
    $('.' + location).removeClass('hidden').css('display', 'flex');
    $header.siblings().not(document.getElementsByClassName(location)).css('display', 'none');
};

