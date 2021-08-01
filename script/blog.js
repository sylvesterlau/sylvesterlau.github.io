$(document).ready(function () {
    $.getJSON('./content/blogIndex.json', function (data) {
        $.each(data.projects, function () { renderBlogCatalog(this) });
    })
})

function renderBlogCatalog(a) {
    var postTitle = $('<h3/>').text(a.title),
    postSubtitle = $('<p/>').text(a.subtitle),
    img = a.img;
    var post = $('<a/>').addClass('post')
        .attr('href', a.href)
        .append(postTitle)
        .append(postSubtitle)
    $('#blog-catalog').append(post);
}