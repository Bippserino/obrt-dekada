$( document ).ready(() => {
    $('.disclaimer').css('min-height',`calc(100vh - ${$('.navbar').outerHeight(true)}px - ${$('.footer').outerHeight(true)}px - ${$('.copyright').outerHeight(true)}px)`)
})