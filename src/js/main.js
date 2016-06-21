let contentBlocks = $('.content');
let $header = $('.header');
$('.home').css('display', 'flex');

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

//build sections and content mount points
for(var section in sections){
    var obj = sections[section];
    var sectionClass = 'section ';
    var classes = sectionClass.concat(obj.title);
    $('<div class=\''+ classes + ' ' + obj.stylingClasses + '\'><p class="title">' + obj.title + '</p></div>').appendTo('.header');
    $('<div class="content"><h2>' + obj.title + '</h2><p class="tagline">' + obj.tagline + '</p></div>').addClass(obj.title).css('background-image', obj.background).appendTo('body');
    $('.content:last').css('background-image', 'url(' + obj.background + ')');
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

//builds singular qa item
//todo: need to fine tune building of new questions and styling
let userQa = {};
function buildQaItem(question, answer){
    let qaItemName = 'item_' + i;
    userQa[qaItemName] = {
        question: question,
        answer: answer
    };
    console.log(userQa);
    i++;
    $('.build_your_own').after('<div class="content-item"><div class="qa"><div class="content-item--question"></div><div class="content-item--answer"></div></div></div>');
    $('.content-item--question').html(userQa[qaItemName].question);
    $('.content-item--answer').html(userQa[qaItemName].answer);
}


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

//injects build inputs for QA items and handles animations on page
$('.qa').after('<button class="build_button">Build Your Own!</button><div class="build_your_own"><input class="question" type="text" placeholder="Question"><input class="answer" type="text" placeholder="Answer"><button class="submitItem">Build</button></div>');
$('.build_button').on('click', function(){
    $(this).fadeOut();

    $(this).siblings('.qa').fadeOut(600, function(){
        $(this).siblings('.build_your_own').fadeIn(500).css('display', 'flex');
    });
});

//handles building qa object for singular qa item
var i = 0;
$('.build_your_own').children('button').on('click', function(){
    if($(this).siblings('.question').val() !== '' && $(this).siblings('.answer').val() !== ''){
        var questionItem = $(this).siblings('.question').val();
        var answerItem = $(this).siblings('.answer').val();
        buildQaItem(questionItem, answerItem);
    } else {
        alert('Please fill out both fields.');
    }

});