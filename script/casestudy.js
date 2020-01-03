const topBtn = $('<div>').addClass('topBtn').append('↑')
topBtn.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
})

$().ready(function () {
    $('body').append(topBtn);
    topBtnShow();
})

function topBtnShow() {
    topBtn.addClass('hide')
    $(window).scroll(function () {
        var position = $(window).scrollTop();
        if (position>100){
            topBtn.removeClass('hide')
        }
        if (position<100){
            topBtn.addClass('hide')
        }
    });
}