function disclaimer_min_height() {
    $('.disclaimer').css('min-height',`calc(100vh - ${$('.navbar').outerHeight(true)}px - ${$('.footer').outerHeight(true)}px - ${$('.copyright').outerHeight(true)}px)`)
}

$( document ).ready(() => {
    disclaimer_min_height()
    $(window).resize(() => { 
        disclaimer_min_height()
    });
})