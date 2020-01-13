//读取 news.json
$.ajaxSettings.async = false;
var news;
$.getJSON('./script/news.json', function (data) {
    news = data;
})

var politicsNum = 0,
    businessNum = 0,
    healthNum = 0,
    entertainmentNum = 0,
    lifestyleNum = 0,
    travelNum = 0,
    sportsNum = 0,
    techNum = 0;
var existingType = [];

//button sound
var audio = $("#buttonSound")[0];

//string 首字母大写
var firstLetterUpper = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

//add news
function addNews(type, index, where) {
    if (index == null) { index = randomNum(0, 9) }
    var target = news[type][index];
    $('#screen').prepend(
        $('<div/>').addClass('news')
            .on("click", clickNews).hide()
            .append($('<span/>').addClass('new').text('NEW'))
            .append($('<span/>').text(firstLetterUpper(target.tag)).addClass('tag ' + target.tag))
            .append($('<p/>').text(target.title))
    )
    $('.news').slideDown(300);
}

//reduce news
function reduceNews(type) {
    var target = $('.' + type + ':first').parent();
    target.slideUp(200, function () { $(this).remove() })
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//数每个type的数量
function countTypeNum() {
    $('span.tag').each(function () {
        var type = $(this).text().toLowerCase();
        switch (type) {
            case "politics": politicsNum++; break;
            case "business": businessNum++; break;
            case "health": healthNum++; break;
            case "entertainment": entertainmentNum++; break;
            case "lifestyle": lifestyleNum++; break;
            case "travel": travelNum++; break;
            case "sports": sportsNum++; break;
            case "tech": techNum++; break;
        }

    })
    console.log("P:" + politicsNum, "B:" + businessNum, "H:" + healthNum, "E:" + entertainmentNum, "L:" + lifestyleNum, "T:" + lifestyleNum, "S:" + sportsNum, "T:" + techNum)
}

//获取存在的type
function getExistingType() {
    existingType = [];
    if (!$('span.politics').length == 0) { existingType.push('politics') };
    if (!$('span.business').length == 0) { existingType.push('business') };
    if (!$('span.health').length == 0) { existingType.push('health') };
    if (!$('span.entertainment').length == 0) { existingType.push('entertainment') };
    if (!$('span.lifestyle').length == 0) { existingType.push('lifestyle') };
    if (!$('span.travel').length == 0) { existingType.push('travel') };
    if (!$('span.sports').length == 0) { existingType.push('sports') };
    if (!$('span.tech').length == 0) { existingType.push('tech') };
    return existingType;
}
//从现有中除去a，随机
function randomTypeOtherThan(a) {
    getExistingType();
    var aIndex = existingType.indexOf(a);
    existingType.splice(aIndex, 1);
    var maxNum = existingType.length;
    var ri = randomNum(1, maxNum) - 1;
    return existingType[ri];
}

function randomType() {
    var i = randomNum(1, 8);
    switch (i) {
        case 1: return "politics"; break;
        case 2: return "business"; break;
        case 3: return "health"; break;
        case 4: return "entertainment"; break;
        case 5: return "lifestyle"; break;
        case 6: return "travel"; break;
        case 7: return "sports"; break;
        case 8: return "tech"; break;
    }
}

//add certain amount of news
function addNewsNum(newsnum) {
    for (i = 0; i < newsnum; i++) {
        var t = randomType();
        addNews(t);
    }
    $('.new').remove();
}

getExistingType();
//点击
function clickNews() {
    $('.new').remove();
    var thisType = $(this).children(".tag").text().toLowerCase();
    var rt = randomTypeOtherThan(thisType);
    click_history.push(thisType);
    $('.news').addClass('disabled');
    $(this).slideUp(300,
        function () {
            $(this).remove();
            reduceNews(rt);
            setTimeout(function () {
                //scroll
                $("#screen").animate({ scrollTop: 0 }, 500);
                addNews(thisType);
                setTimeout(function () {
                    addNews(thisType);
                    $('.news').removeClass('disabled');
                }, 500)
            }, 500);
        })
    $('button#next').removeClass('disabled')
}

// 清除 news
function clearAllNews() {
    $('#screen').children().remove()
}

//高亮 news
function activeNews(news) {
    $('div.news').addClass('fade');
    news.removeClass('fade').addClass('active');
}

//模拟去除
function simulateReduce(target) {
    target.slideUp(300,function(){
        this.remove()
    })
};