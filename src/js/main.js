$(document).ready( function() {
    $(".img-title").hide();
    $('.gallery-item').hover( function() {
        $(this).find('.img-title').fadeIn(300);
    }, function() {
        $(this).find('.img-title').fadeOut(300);
    });
    var underscore = document.getElementById('underscore');

    setInterval(function() {
        var uStyle = underscore.style;
        uStyle.visibility = (uStyle.visibility == 'visible') ? 'hidden' : 'visible';
    }, 750);
});
