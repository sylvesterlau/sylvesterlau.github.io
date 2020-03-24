$(document).ready(function () {
    $.getJSON('./content/home.json', function (data) {
        $.each(data.projects, function () { renderWork(this) });
    })
    //scroll hint
    $('.scroll-hint').click(function(){
        smoothScrollTo('#work')
    })
    //avatar click
    $('.avatar').click(function(){
        smoothScrollTo('#about')
    })
})

function renderWork(a) {
    var img = $('<img/>').attr('src', a.img),
        wrap = $('<div/>').addClass('img-wrap')
            .append(img)
            
        arrow = '<span> →</span>',
        title = $('<h3/>').append(a.title + arrow),
        caption = $('<p/>').text(a.caption);
    var workCover = $('<a/>').addClass('work')
        .attr('href', a.href)
        .append(wrap)
        .append(title)
        .append(caption)
    $('.gallery').append(workCover);
}

function play(a) {
    var video = $(a).children('.img-wrap').children('video').get(0);
    video.play();
}
function stop(a) {
    var video = $(a).children('.img-wrap').children('video').get(0);
    video.pause();
    video.currentTime = 0;
}

