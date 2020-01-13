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
        outline = $('<div>').addClass('outline'),
        posArry = [];
    all.each(function (index) {
        var id = $(this).attr('id'),
            position = $(this).offset().top,
            text = id.replace(/_/g, ' '),
            title = $('<p/>').append(text),
            dot = $('<div/>').addClass('dot'),
            item = $('<div/>').addClass('item').attr('id', index).append(title).append(dot);
        item.click(function () {
            smoothScrollTo('#' + id)
        })
        posArry.push(position);
        outline.append(item);
    })

    $('body').append(outline);
    detectOutline(posArry)
}

function detectOutline(posArry) {
    var lastIndex = posArry.length - 1,
        firstPos = posArry[0],
        lastPos = posArry[lastIndex];

    var outline = $('.outline')
    outline.addClass('hide')

    $(window).scroll(function () {
        var position = $(window).scrollTop() + 200;
        //show outline
        if (position < firstPos) { outline.addClass('hide') }
        else if (position >= firstPos) { outline.removeClass('hide'); }
        //update dots
        if (position >= lastPos) { activeDot(lastIndex) } //last pos
        else {
            posArry.forEach((item, index) => {
                if (position >= item && position < posArry[index + 1]) { activeDot(index) }
            })
        }
    });
}
function activeDot(index) {
    $('.item').removeClass('active');
    $('#' + index).addClass('active');
}