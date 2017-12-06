let contentBlocks = $('.content');
let $header = $('.header');
$('.home').css('display', 'flex');



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

$('.content').append('<div class="navicon"></div>');


let $section = $('.section');

$('.Carter').css('display', 'flex');

//gets section data for hiding and showing page contents
$section.click(function(){
    let sectionTitle = $(this).children('p').html();
    //checks if item is homepage and has spaces.
    if(sectionTitle.indexOf(sections.section_1.title) > -1){
        let location = sections.section_1.title;
        let locationItems = location.split(' ');
        let homepage = locationItems[0];
        contentChange(homepage);
    } else {
        contentChange(sectionTitle);
    }
});

//hides and shows page contents
function contentChange(location){
    $('.' + location).removeClass('hidden').css('display', 'flex');
    $header.siblings().not(document.getElementsByClassName(location)).css('display', 'none');
};


var database = firebase.database().ref('cartercapo-a6615');
console.log(database);