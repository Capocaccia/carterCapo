$(document).ready( function() {
    $('.gallery-item').hover( function() {
        $(this).find('.img-title').stop(true, true).fadeIn(300);
    }, function() {
        $(this).find('.img-title').stop(true, true).fadeOut(100);
    });
});
