//读取 json
$.getJSON('./timelapse-content.json', function (jsonObj) {
    var header = jsonObj.header;
    var article = jsonObj.article;
    renderHeader(header);
    renderArticle(article);
})

//渲染 header
function renderHeader(header) {
    $('body').append($('<div/>').addClass('header'))
    $(".header").append($('<h1/>').text(header.title));
    $(".header").append($('<p/>').text(header.caption));
    $(".header").append($('<img class="header-img" alt="">').attr('src', header.url));
    $(".header").append('<div class="header-meta"></div>');
    var metaItems = header.metaItems;
    $.each(metaItems, function (i) {
        $(".header-meta").append($('<div class="meta-item"></div>')
            .append($('<p>').text(i))
            .append($('<p>').text(metaItems[i])
            )
        );
    });
}

function renderArticle(article) {
    $('body').append($('<div/>').addClass('article'))
    $.each(article,function(i){
        console.log(article[i].class);
        console.log(article[i].content);
    })
}

// 获取 class 转化成 tag
function getClassName(item, index) {
    var ci = index;
    var type = item.class;
    var tag;
    switch (type) {
        case "p":
            tag = "<p></p>";
            break;
        case "h1":
            tag = "<h1></h1>";
            break;
        case "h2": tag = "<h2></h2>";
            break;
        case "h3": tag = "<h3></h3>";
            break;
    }
    return tag;
}

//通用增加元素
function addElementTo(item,index,where) {
    var type = item.class;
    if (!where) { where = "#article"}
    switch (type) {
        case "two-col": addTwoCol(item, index, where); break;
        case "ul": addUl(item, index, where); break;
        case "l-img": addLimg(item, index, where); break;
        default: var tag = getClassName(item, index);
        $(where).append($(tag).text(item.content)); break;
    }
}


//渲染列表
function addUl(item, index, where) {
    var ulid;

    if (!where) { where = "#article"} 
    else {ulid = where.slice(1) + "-ul"}
    delete item.class; //delete class
    
    $(where).append($('<ul/>').attr('id', ulid));

    $.each(item, function (i) {
        $('#'+ulid).append($('<li/>').text(item[i]))
    });
}

//渲染 l-img
function addLimg(item, index, where) {
    if (!where) { where = "#article"} 
    $(where).append($('<img class="l-img" alt="">').attr('src', item.url).attr('id',index));
    var preClass = $('img#'+index).prev().attr('class');
    if (preClass == 'l-img'){$('img#'+index).addClass('tops')}
}

//渲两列
function addTwoCol(item, ci) {
    var col1 = item.col1;
    var col2 = item.col2;
    var id1 = ci + '-1';
    var id2 = ci + '-2';
    $("#article").append(
        $("<div></div>").addClass('col-two')
            .append($("<div></div>").attr('id', id1))
            .append($("<div></div>").attr('id', id2))
    )

    function addToCol1(item, index) {
        var tag = getClassName(item, index);
        $("#" + id1).append($(tag).text(item.content));
    }

    function addToCol2(item, index) {
        if (item.class == "phone") {
            $("#" + id2).addClass('phone');
            renderPhone("#" + id2, item.url);
        } else if (item.class == "ul"){ return }
        else {
            var tag = getClassName(item, index);
            $("#" + id2).append($(tag).text(item.content));
        }
    }

    col1.forEach(function(item, index){
        addElementTo(item,index,"#" + id1);
    });
    col2.forEach(addToCol2);
}

//渲染手机
function renderPhone(where, url,) {
    $(where).append('<div class="frame"></div>')
        .append($('<video class="screen" autoplay loop>')
            .append($('<source/>').attr('src', url).attr('type', 'video/mp4'))
        );
}


