//读取 scene.json
$.ajaxSettings.async = false;
var rules;
$.getJSON('./script/scene.json', function (data) {
    rules = data.rules;
})

addRulesWindow();

//overlay, close invisible
$('.overlay').css('display', 'none');
$('.close').css('display', 'none');

$('.help').on('click', function () { showRules() })
$('.close').on('click', function () { closeRules() })

function showRules() {
    console.log('show')
    $('.overlay').fadeIn(300);
    $('.help').css('display', 'none');
    $('.close').css('display', 'block')
}

function closeRules() {
    console.log('close')
    $('.overlay').fadeOut(300);
    $('.close').css('display', 'none')
    $('.help').css('display', 'block');
}



function addRulesWindow() {
    $('body').prepend($('<div/>').addClass('help'))
        .prepend($('<div/>').addClass('close'));

    $('body').prepend($('<div/>').addClass('overlay')
        .append($('<div/>').addClass('dialog')))

    var dialog = $('.dialog');

    $.each(rules, function () {
        switch (this.tag) {
            case "h1": dialog.append($('<h1/>').append(this.text));
                break;
            case "p": dialog.append($('<p/>').append(this.text));
                break;
            case "img": dialog.append($('<img/>').attr('src',this.url));
                break;
        }
    })
}