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