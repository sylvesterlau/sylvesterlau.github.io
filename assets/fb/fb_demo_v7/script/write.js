//读取 news.json
$.ajaxSettings.async = false;
var scene;
$.getJSON('./script/scene.json', function (data) {
    scene = data;
})

var click_history = [];

//write text h1,p
function writeText(a) {
    switch (a.tag) {
        case "h1": $('.text').append($('<h1/>').text(a.text));
            break;
        case "p": $('.text').append($('<p/>').append(a.text));
            break;
        case "spans": writeSpans(a);
            break;
        case "span": $('.text').append($('<span/>').addClass('tag ' + a.text.toLowerCase()).text(a.text));
            break;
        case "button": $('.text').append($('<button/>').attr('id', a.id).text(a.text));
            break;
        case "large": $('#display').append($('<img/>').attr('src', a.url).addClass('large'));
            break;
        default: console.log('Unknown text type'); break;
    }
    function writeSpans(a) {
        var aClass = a.class, aText = a.text;
        $('.text').append($('<p/>').addClass(aClass));
        var p = $('.text').children(':last');
        $.each(aText, function () {
            p.append($('<span/>').addClass(this.class)
                .attr('id', this.id)
                .append(this.text));
        })
    }
}

$('button.title').on('click', function () { start() })
$('#canvas').css('display', 'none')
function start() {
    console.log('GO!');
    $('.title').fadeOut(500)
    $('#particles').fadeOut(500, function () { startScene_1_1() })
}

function startScene_1_1() {
    $('#canvas').css('display', 'flex')
    startPhone();
    var sceneScript = scene.scene_1_1
    var textArea = $('#text-area').children('.text').children();
    textArea.remove();
    $.each(sceneScript, function () { writeText(this); });
    var textArea2 = $('#text-area').children('.text').children();
    //button#next
    $('button#next').addClass('disabled')
        .on('click', function () {
            startScene_1_2()
            // startScene_5_1()
        });

    textArea2.css('display', 'none').fadeIn(500);

    //reload 10 news
    addNewsNum(10);
}
function startScene_1_2() {
    clearAllNews();
    var sceneScript = scene.scene_1_2
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //#firstClick tag render
        $('#firstClick').addClass(click_history[0]).text(click_history[0]);
        //button#next
        $('button#next').on('click', function () { startScene_1_3() });
        //reload 6 news
        addNewsNum(6);
        //add first click news
        addNews(click_history[0]);
        //active first click news
        var firstClick = $('span.new').parent();
        activeNews(firstClick);
    });
}
function startScene_1_3() {
    var sceneScript = scene.scene_1_3
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });

        var rt = randomTypeOtherThan(click_history[0]);
        //#firstClick tag render
        $('#firstClick').addClass(rt).text(rt);
        //button#next
        $('button#next').on('click', function () { startScene_1_4() });
        simulateReduce($('.news:first'));
        setTimeout(function () {
            $('.' + rt + ':first').parent().removeClass('fade').addClass('active')
        }, 500)
    });
}
function startScene_1_4() {
    var sceneScript = scene.scene_1_4;
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //#firstClick tag render
        $('#firstClick').addClass(click_history[0]).text(click_history[0]);
        //simulate reduce
        simulateReduce($('.news.active'));
        setTimeout(function () {
            addNews(click_history[0]);
            setTimeout(function () {
                addNews(click_history[0]);
                $('span.new').parent().addClass('active')
                //button#next
                $('button#next').on('click', function () { startScene_1_5() });
            }, 300)
        }, 500)
    });
}
function startScene_1_5() {
    var sceneScript = scene.scene_1_5;
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        clearAllNews();
        addNewsNum(10);
        //button#next
        $('button#next').on('click', function () { startScene_2_1() });
    })
}
function startScene_2_1() {
    $('#text-area').children('.text').fadeOut(500)
    $('.phone').fadeOut(500)
    setTimeout(function () {
        $('#text-area').children('.text').remove();
        $('.phone').remove();
        startBubble();
        addScript('./script/d3.v3.min.js', 'd3v3');
        addScript('./script/bubble.js', 'bubble');
        removeScript('getNews')
        var sceneScript = scene.scene_2_1;
        $('#text-area').append($('<div/>').addClass('text'))
        var textArea = $('#text-area').children('.text');
        textArea.fadeOut(500, function () {
            textArea.remove();
            $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
            $.each(sceneScript, function () { writeText(this); });
            //button#next
            $('button#next').on('click', function () { startScene_2_2() });
        })
    }, 500)
}
function startScene_2_2() {
    mouseDownOpen = true;
    var sceneScript = scene.scene_2_2;
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        //add rules
        addScript('./script/rules.js', 'rules');
        showRules();
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { startScene_3_1() }).addClass('disabled');
    })
}

//preferences
function startScene_3_1() {
    var sceneScript = scene.scene_3_1;
    $('svg').fadeOut(500);
    setTimeout(function () {
        $('svg').remove();
        removeScript('d3v3');
        addScript('./script/d3.v5.min.js', 'd3v5');
        addScript('./script/preference.js', 'preferencs');
    }, 500)
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { startScene_4_1() });
    })
}

//auto click
function startScene_4_1() {
    var sceneScript = scene.scene_4_1;
    $('svg').fadeOut(500);
    $('.bubbleNum').fadeOut(500);
    setTimeout(function () {
        $('svg').remove();
        $('.bubbleNum').remove();
        removeScript('d3v5');
        removeScript('preferencs');
        removeScript('bubble');
        addScript('./script/d3.v3.min.js', 'd3v3');

        $('#display').append('<svg>');
        addScript('./script/bubble_2.js', 'bubble2');
    }, 500)
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#simulate').on('click', function () {
            simulate100times();
            startScene_4_2();
        });
    })
}

function startScene_4_2() {
    var sceneScript = scene.scene_4_2;
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
    })
}

function startScene_4_3() {
    var sceneScript = scene.scene_4_3;
    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //calculate
        calChange();
        //button#next
        $('button#next').on('click', function () { startScene_5_1() })
    })
}

function startScene_5_1() {
    $('.help').remove()
    var sceneScript = scene.scene_5_1;

    $('#display').fadeOut(500, function () {
        $(this).children().remove();
        $(this).fadeIn(500);
    })

    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { startScene_5_2() })
    })
}
function startScene_5_2() {
    var sceneScript = scene.scene_5_2;

    $('#display').fadeOut(500, function () {
        $(this).children().remove();
        $(this).fadeIn(500);
    })

    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { startScene_5_3() })
    })
}

function startScene_5_3() {
    var sceneScript = scene.scene_5_3;

    $('#display').fadeOut(500, function () {
        $(this).children().remove();
        $(this).fadeIn(500);
    })

    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { startScene_5_4() })
    })
}

function startScene_5_4() {
    var sceneScript = scene.scene_5_4;

    $('#display').fadeOut(500, function () {
        $(this).children().remove();
        $(this).fadeIn(500);
    })

    var textArea = $('#text-area').children('.text');
    textArea.fadeOut(500, function () {
        textArea.remove();
        $('#text-area').append($('<div/>').addClass('text').css("display", "none").fadeIn());
        $.each(sceneScript, function () { writeText(this); });
        //button#next
        $('button#next').on('click', function () { ending() })
    })
}
function ending(){
    $('#canvas').fadeOut(500,function(){
        window.location = './thankyou.html';
    })
}

function startPhone() {
    $('#display').append($('<div/>').addClass('phone')
        .append($('<div/>').addClass('navBar').text("Bubble News"))
        .append($('<div/>').attr('id', 'screen'))
    )
}
function startBubble() {
    $('#display').append("<svg/>")
}
function addScript(url, id) {
    $('body').append($('<script/>').attr('src', url).attr('id', id))
}
function removeScript(id) {
    $('#' + id).remove();
}
