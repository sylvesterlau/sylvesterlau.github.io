$(document).ready(function () {
    $.getJSON('./content/projects.json', function (data) {
        $.each(data.projects, function () { renderWork(this) });
    })
})

function renderWork(a) {
    var img = $('<img/>').attr('src', a.img),
        videoSource = $('<source/>').attr('src', a.video),
        video = $('<video autoplay mute playsinline loop/>').append(videoSource),
        wrap = $('<div/>').addClass('img-wrap')
            .append(img).append(video),
        arrow = '<span class="arrow"> →</span>',
        title = $('<h3/>').append(a.title + arrow),
        caption = $('<p/>').append(a.year + "<span> / </span>" + a.tag + "<span> / </span>" + a.keyword);
    var workCover = $('<a/>').addClass('work')
        .attr('href', a.href)
        .append(wrap)
        .append(title)
        .append(caption);
    workCover.hover(
        function () { play($(this)) }, function () { stop($(this)) }
    )
    $('.gallery').append(workCover);
}

function play(a) {
    var video = $(a).children('.img-wrap').children('video').get(0);
    video.muted = true;
    video.play();
}
function stop(a) {
    var video = $(a).children('.img-wrap').children('video').get(0);
    video.pause();
    video.currentTime = 0;
}

