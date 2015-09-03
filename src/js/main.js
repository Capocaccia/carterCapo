$(document).ready( function() {
    $(".img-title").hide();
    $('.gallery-item').hover( function() {
        $(this).find('.img-title').fadeIn(300);
    }, function() {
        $(this).find('.img-title').fadeOut(300);
    });
});
