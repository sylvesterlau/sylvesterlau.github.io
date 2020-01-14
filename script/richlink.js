$('a.rich-link').each(function () {
    var a = $(this), target = a.attr('href')
    console.log(target)
    //get info
    $.ajax({
        url: "https://api.linkpreview.net",
        data: { q: target, key: '5e1d6bfc11396f43886c531b689e61b79974a4bed99b0' },
        success: function (result) {
            console.log(result)
            parseRichLink(a, result.image, result.title, result.description, result.url)
        }
    });
})

function parseRichLink(a, img, title, caption, url) {
    var image = $('<div/>').addClass('image').css('background-image', 'url(' + img + ')'),
        title = $('<p/>').text(title),
        caption = $('<p/>').addClass('caption').text(caption),
        url = $('<p/>').addClass('url').text(url);
    a.append(image).append(title).append(caption).append(url);
}