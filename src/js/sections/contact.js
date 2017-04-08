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