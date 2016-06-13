let contentBlocks = $('.content');
let $header = $('.header');
let sections = {
    section_1: {
        title :'Carter Capocaccia',
        tagline: 'Welcome!  I am Carter Capocaccia. I\'m a passionate web developer learning more every day. Technology gives me inspirations to improve the world around me.',
        stylingClasses: 'section-home'
    },

    section_2: {
        title: 'About',
        tagline: 'Allow me to re-introduce myself.',
        stylingClasses: 'section-second',
        background: 'src/images/cliffs.jpeg',
        contentMount: '<div></div>',
        contentClass: 'qa'
    },
    section_3: {
        title: 'Projects',
        tagline: 'Here is some of my work:',
        stylingClasses: 'section-third',
        background: 'src/images/wave.jpeg',
        contentMount: '<div></div>',
        contentClass: 'project'
    },
    section_4: {
        title :'Connect',
        tagline: 'I can tell that we are gonna be friends.',
        stylingClasses: 'section-first',
        background: 'src/images/car.jpeg',
        contentMount: '<div></div>',
        contentClass: 'contact'

    }
};

let qa = {
    item_1: {
        question: 'Who am I?',
        answer: 'I am a web developer, Memphian, Ole Miss Rebel, and avid cyclist.'
    },
    item_2: {
        question: 'You make websites?  What languages do you use?',
        answer: 'Yes I do!  I use PHP, Twig, JavaScript, jQuery, HTML5, SASS, Mongo, Node, GitHub, Grunt, NPM, Bower and more!'
    },
    item_3: {
        question: 'How did you start writing code?',
        answer: 'From hobby to job.  I graduated from Nashville Software School and dove into a career with a web agency in Memphis.'
    },
    item_4: {
        question: 'How do you pronounce your last name?',
        answer: 'cap-O-coch-E.  You can ask me again later. its ok.'
    },
    item_5: {
        question: 'What are your hobbies?',
        answer: 'Lots. Writing code, cycling with the Memphis Hightailers, CounterStrike, Cooking, Firearms, My dog Doug, Fishing'
    }
};


let projects = {
    project: {
        title: 'CloudRunner',
        description: 'A browser game made with the Phaser.JS framework',
        link: 'http://capocaccia.github.io/CloudRunner/',
        image: 'src/images/crun.png'
    },
    project_1: {
        title: 'Carterpedia',
        description: 'A Wikipedia Mockup using the Skeleton CSS Framework',
        link: 'http://capocaccia.github.io/Carterpedia/',
        image: 'src/images/carterpedia.png'
    },
    project_2: {
        title: 'Bike Nash',
        description: 'A Cycling Blog for Nashville Cyclists (No longer live)',
        link: 'https://github.com/Capocaccia/bikeNash',
        image: 'src/images/bikeNash.png'
    },
    project_3: {
        title: 'Cartercapo.com',
        description: 'This website is dynamically built using JSON Objects, JavaScript, and jQuery.',
        link: 'https://github.com/Capocaccia/carterCapo',
        image: 'src/images/github.svg'
    }
};

let contactItems = {
    item_1: {
        title: 'Email',
        link: 'carter.capocaccia@gmail.com',
        icon: 'src/images/email.svg'
    },
    item_2: {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/capocaccia',
        icon: 'src/images/linkedin.svg'
    },
    item_3: {
        title: 'GitHub',
        link: 'https://github.com/Capocaccia',
        icon: 'src/images/github.svg'
    },
    item_4: {
        title: 'Strava',
        link: 'https://www.strava.com/athletes/1624324',
        icon: 'src/images/strava.svg'
    }
};

$('.home').css('display', 'flex');


//build sections and content mount points
for(var section in sections){
    var obj = sections[section];
    var sectionClass = 'section ';
    var classes = sectionClass.concat(obj.title);
    $('<div class=\''+ classes + ' ' + obj.stylingClasses + '\'><p class="title">' + obj.title + '</p></div>').appendTo('.header');
    $( contentBlocks ).css('background-image', 'url(' + obj.background + ')');
    //todo: get background images working;
    $('<div class="content"><h2>' + obj.title + '</h2><p class="tagline">' + obj.tagline + '</p></div>').addClass(obj.title).css('background-image', obj.background).appendTo('body');
    if(obj.contentMount){
        $(obj.contentMount).addClass(obj.contentClass).appendTo('.content:last');
    }
}

//builds projects
for(var project in projects){
    if (!projects.hasOwnProperty(project)) continue;
    var obj = projects[project];
    $('<div class="project--item"><h3 class="project--item__title"></h3><p class="project--item__description"></p><a class="project--item__link"><img src="" alt=""></a></div>').appendTo('.project');
    $('.project--item__title:last').html(obj.title);
    $('.project--item__description:last').html(obj.description);
    $('.project--item__link:last').attr('href', obj.link).attr('target', '_blank');
    $('.project--item__link:last').children('img').attr('src', obj.image);
}

//builds qa items
for(var qaItem in qa){
    var obj = qa[qaItem];
    $('<div class="content-item"><div class="content-item--question"></div><div class="content-item--answer"></div></div>').appendTo('.qa');
    $('.content-item--question:last').html(obj.question);
    $('.content-item--answer:last').html(obj.answer);
};

//handles animations of qa items
$('.content-item').on('click', function(){
    $(this).children('.content-item--answer').slideToggle();
    $(this).children('.content-item--question').toggleClass('js_arrow_rotate');
});

//builds contact items
for(var contactItem in contactItems){
    var obj = contactItems[contactItem];
    var re = /\S+@\S+\.\S+/;
    var email = re.test(obj.link);
    if(email){
        let linkhref = 'mailto:';
        $('<div class="contactItem"><p class="title">'+ obj.title +'</p><a class="project--item__link" href="' + linkhref + obj.link +'"><img src="' + obj.icon + '" alt="' + obj.title + '"></a></div>').appendTo('.contact');
    } else {
        $('<div class="contactItem"><p class="title">'+ obj.title +'</p><a class="project--item__link" target=_blank href="' + obj.link +'"><img src="' + obj.icon + '" alt="' + obj.title + '"></a></div>').appendTo('.contact');
    }
}

let $section = $('.section');

//gets section data for hiding and showing page contents
$section.click(function(){
    let sectionTitle = $(this).children('p').html();
    let location = sectionTitle.replace(/\s/g, '');
    contentChange(location);
});

//hides and shows page contents
function contentChange(location){
    $('.' + location).removeClass('hidden').css('display', 'flex');
    $header.siblings().not(document.getElementsByClassName(location)).css('display', 'none');
};

