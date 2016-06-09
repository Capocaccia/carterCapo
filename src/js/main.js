let sections = ['Contact', 'About', 'Projects'];
let stylingClasses = ['section-first', 'section-second', 'section-third'];
let backgrounds = ['src/images/car.jpeg', 'src/images/cliffs.jpeg', 'src/images/wave.jpeg'];
let contentBlocks = $('.content');
console.log(contentBlocks);

let $header = $('.header');
$('.home').css('display', 'flex');

for(var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionClass = 'section ';
    var classes = sectionClass.concat(section);
    $('.header--h1').after('<div class=\''+ classes + ' ' + stylingClasses[i] + '\'><p class="title">' + sections[i] + '</p></div>');
}

for(var i = 0; i < backgrounds.length; i++){
    console.log(backgrounds[i]);
    $( contentBlocks[i + 1] ).css('background-image', 'url(' + backgrounds[i] + ')');
}

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

