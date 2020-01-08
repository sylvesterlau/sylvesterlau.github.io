const topBtn = $('<div>').addClass('topBtn').append('↑')
topBtn.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
})

$().ready(function () {
    $('body').append(topBtn);
    topBtnShow();

    makeOutline();
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

function makeOutline() {
    var all = $('section[id]'),
        outline = $('<div>').addClass('outline');
    all.each(function () {
        var id = $(this).attr('id'),
            text = id.replace(/_/g, ' '),
            title = $('<p/>').append(text),
            dot = $('<div/>').addClass('dot'),
            item = $('<div/>').addClass('item').append(title).append(dot);
        item.click(function () {
            smoothScrollTo('#' + id)
        })
        outline.append(item);
    })
    $('body').append(outline);
}