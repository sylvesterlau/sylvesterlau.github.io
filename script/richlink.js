$('a.rich-link').each(function () {
    var a = $(this), target = a.attr('href')
    console.log(target)
    //get info
    $.ajax({
        url: "https://api.linkpreview.net",
        data: { q: target, key: '5e155ea4f1ff72502a221af43f6234db8d4da4b0bd21d' },
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