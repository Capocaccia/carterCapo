//builds projects
for(var project in projects){
    if (!projects.hasOwnProperty(project)) continue;
    var obj = projects[project];
    $('<a class="project--item__link"><div class="project--item"><h3 class="project--item__title"></h3><p class="project--item__description"></p><div class="background"></div></div></a>').appendTo('.project');
    $('.project--item__title:last').html(obj.title);
    $('.project--item__description:last').html(obj.description);
    $('.project--item__link:last').attr('href', obj.link).attr('target', '_blank');
    $('.project--item:last').children('.background').css('background-image', 'url(' + obj.image+ ')');
}
