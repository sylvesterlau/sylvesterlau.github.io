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
        if (position > 100) {
            topBtn.removeClass('hide')
        }
        if (position < 100) {
            topBtn.addClass('hide')
        }
    });
}

function activeDot(index) {
    $('.item').removeClass('active');
    $('#' + index).addClass('active');
}

$(window).on('scroll',function(){
    var wTop = $(window).scrollTop(),
        card1Top = $('#card_1').offset().top - wTop;
        card2Top = ($('#card_2').offset().top - $('#card_1').offset().top-0.1)/$('#card_1').outerHeight();
        card3Top = ($('#card_3').offset().top - $('#card_2').offset().top-0.1)/$('#card_2').outerHeight();
        $('#card_1').css('opacity',card2Top);
        $('#card_2').css('opacity',card3Top);
})