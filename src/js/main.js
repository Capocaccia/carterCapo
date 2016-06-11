let contentBlocks = $('.content');
let $header = $('.header');
let $home = $('.header--h1');
let sections = ['Contact', 'About', 'Projects'];
let stylingClasses = ['section-first', 'section-second', 'section-third'];
let backgrounds = ['src/images/car.jpeg', 'src/images/cliffs.jpeg', 'src/images/wave.jpeg'];
let questions = ['Who am I?', 'You make websites?  What languages do you use?', 'How did you start writing code?', 'How do you pronounce your last name?', 'What are your hobbies?'];
let answers = ['I am a web developer, Memphian, Ole Miss Rebel, and avid cyclist.',
    'Yes I do!  I use PHP, Twig, JavaScript, jQuery, HTML5, SASS, Mongo, Node, GitHub, Grunt, NPM, Bower and more!',
    'From hobby to job.  I graduated from Nashville Software School then dove into a career with a web agency in Memphis.',
    'cap-O-coch-E.  You can ask me again later. its ok.',
    'Lots. Writing code, cycling with the Memphis Hightailers, CounterStrike, Cooking, Firearms, My dog Doug, Fishing'];

let projects = {
    project: {
        title: 'CloudRunner',
        description: 'A Phaser.JS Game',
        link: 'http://capocaccia.github.io/CloudRunner/',
        image: 'src/css/images/crun.png'
    },
    project_1: {
        title: 'Carterpedia',
        description: 'A Wikipedia Mockup using the Skeleton CSS Framework',
        link: 'http://capocaccia.github.io/Carterpedia/',
        image: 'src/css/images/carterpedia.png'
    },
    project_2: {
        title: 'Bike Nash',
        description: 'A Cycling Blog for Nashville Cyclists (No longer live)',
        link: 'https://github.com/Capocaccia/bikeNash',
        image: 'src/css/images/bikeNash.png'
    }
};

for(var project in projects){
    if (!projects.hasOwnProperty(project)) continue;
    var obj = projects[project];
    $('<div class="project--item"><h3 class="project--item__title"></h3><p class="project--item__description"></p><a class="project--item__link"><img src="" alt=""></a></div>').appendTo('.project');
    $('.project--item__title:last').html(obj.title);
    $('.project--item__description:last').html(obj.description);
    $('.project--item__link:last').attr('href', obj.link).attr('target', '_blank');
    $('.project--item__link:last').children('img').attr('src', obj.image);
}


$('.home').css('display', 'flex');

for(var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionClass = 'section ';
    var classes = sectionClass.concat(section);
    $('.header--h1').after('<div class=\''+ classes + ' ' + stylingClasses[i] + '\'><p class="title">' + sections[i] + '</p></div>');
}

for(var i = 0; i < backgrounds.length; i++){
    $( contentBlocks[i + 1] ).css('background-image', 'url(' + backgrounds[i] + ')');
}


for(var i = 0; i < questions.length; i++){
    $('<div class="content-item"><div class="content-item--question"></div><div class="content-item--answer"></div></div>').appendTo('.content-items');
    $('.content-item--question:last').html(questions[i]);
    $('.content-item--answer:last').html(answers[i]);
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

