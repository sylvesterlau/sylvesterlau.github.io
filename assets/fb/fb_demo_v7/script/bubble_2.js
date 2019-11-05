//读取 news.json
$.ajaxSettings.async = false;
var news;
$.getJSON('./script/news.json', function (data) {
    news = data;
})

//构建nodes_data
var nodes_data = [];
function buildData(num) {
    for (i = 0; i < num; i++) {
        var n1 = randomNum(0, 9),
            n2 = randomNum(0, 9),
            n3 = randomNum(0, 9),
            n4 = randomNum(0, 9),
            n5 = randomNum(0, 9),
            n6 = randomNum(0, 9),
            n7 = randomNum(0, 9),
            n8 = randomNum(0, 9);
        nodes_data.push({ type: "politics", text: news.politics[n1].title });
        nodes_data.push({ type: "business", text: news.business[n2].title });
        nodes_data.push({ type: "health", text: news.health[n3].title });
        nodes_data.push({ type: "entertainment", text: news.entertainment[n4].title });
        nodes_data.push({ type: "lifestyle", text: news.lifestyle[n5].title });
        nodes_data.push({ type: "travel", text: news.travel[n6].title });
        nodes_data.push({ type: "sports", text: news.sports[n7].title });
        nodes_data.push({ type: "tech", text: news.tech[n8].title });
    }
}

buildData(10);

var preferences_data = []
var old_preference = []
buildPreferencesData();


//构建 preferences bar
$('#display').append($('<div/>').addClass('preference')
    .append($('<p/>').text("Preferences"))
    .append($('<div>').addClass('bar')))

$.each(preferences_data, function () {
    $('.bar').append($('<div/>')
        .addClass('innerbar')
        .addClass(this.type)
        .css('width', this.percent * 4)
        .hover(barMouseOver, barMouseLeave)
    )
})

//bar hover
function barMouseOver() {
    var X = $(this).offset().top;
    var Y = $(this).offset().left;

    var type = $(this).attr('class').slice(9);
    var typeUpper = firstLetterUpper(type);
    var i = preferences_data.findIndex((e) => e.type === type);
    var percentNum = preferences_data[i].percent + "%"

    $('#display').append($('<div/>')
        .addClass('tooltip')
        .attr('id', 'bar')
        .css("left", Y + "px")
        .css("top", X + "px"))

    $('#bar').append($('<span/>').addClass('tag ' + type).text(typeUpper))
        .append($('<span/>').attr('id', 'percent').text(percentNum))

}
function barMouseLeave() {
    $('.tooltip').remove();
}

var width = $('#display').width(),
    height = $('#display').height();


var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes_data) // initialize with data
    .charge(-80)
    .friction(0.85)
    .on("tick", tick);

var svg = d3.select("#display").select("svg") //画布
    .attr("width", width)
    .attr("height", height);

svg.append('circle')
    .attr('class', 'bubble')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 250)

var nodes = force.nodes(),
    node = svg.selectAll(".node").data(nodes_data);

function tick() {
    node.attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
}

function restart() {
    node = node.data(nodes_data);

    node.enter().append("circle")
        .attr("class", function (d) { return "node " + d.type })
        .attr("r", 0)
        .on("mousedown", function (d, i) {
            if (mouseDownOpen) { mousedownNode(d, i) }
            else { console.log('mousedown disabled') }
        })
        .on("mouseover", mouseoverNode)
        .on("mouseout", mouseoutNode);

    node.exit()
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .on("mousedown", null)
        .on("mouseover", null)
        .attr("r", 0)
        .transition().duration(300)
        .attr("r", 20)
        .style('opacity', 0)
        .remove();

    node.transition()
        .duration(300)
        .attr("r", 11.5);

    force.start();
    svg.selectAll(".node")
        .attr("class", function (d) { return "node " + d.type })
}

restart();

//mousedown
function mousedownNode(d, i) {
    add(d, i);
    add(d, i);
    reduce(d, i);
    // addClickData(d.type);
    restart();
    setTimeout(function () {
        var reduceType = randomTypeOtherThan(d.type);
        var reduceI = getIndex(reduceType);
        reduce("", reduceI);
        restart();
    }, 200);
}

//add
function add(d, i) {
    var ni = randomNum(0, 9);
    var newNode = { type: d.type, text: news[d.type][ni].title };
    nodes.push(newNode);
}

//reduce
function reduce(d, i) {
    var target = nodes_data[i];
    nodes.splice(i, 1);
    nodes.push(target);//移到最后
    restart();
    nodes.pop();
    //exit=target, nodes_data will auto-update
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
//从现有中除去a，随机
function randomTypeOtherThan(a) {
    var existingType = getBubbleType();
    if (existingType.length == 1) { return a }
    else {
        var aIndex = existingType.indexOf(a);
        existingType.splice(aIndex, 1);
        var maxNum = existingType.length;
        var ri = randomNum(1, maxNum) - 1;
        return existingType[ri];
    }
}
//获取指定type的index
function getIndex(type) {
    function find(element) { return element.type === type }
    var getIndex = nodes_data.findIndex(find);
    return getIndex;
}
//string 首字母大写
function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
//mouse over
function mouseoverNode(d, i) {
    var text = d.text, type = d.type, typeUpper = firstLetterUpper(type);

    var tooltip = d3.select('#display').append('div')
        .attr('class', 'tooltip')
        .style("left", (d.x) + "px")
        .style("top", (d.y) + "px")
        .style("display", "none")


    tooltip.append('span')
        .attr('class', "tag " + type)
        .text(typeUpper);

    tooltip.append('p').text(text);

    $('.tooltip').fadeIn(200);
}

//mouse out
function mouseoutNode(d, i) {
    $('.tooltip').fadeOut(200, function () { $(this).remove() });
}


var mouseDownOpen = false;

//模拟点击 type
function fakeClick(type) {
    var typeIndex = getIndex(type);
    var target = nodes_data[typeIndex];
    mousedownNode(target, typeIndex);
}
//"Run 100 times"
var old_bubble = [];
function simulate100times() {
    old_bubble = getBubbleTypeNum();

    console.log(old_bubble);
    console.log(old_preference);

    mouseDownOpen = true;
    var clickTime = 0;
    var log = setInterval(function () {
        randomClick();
        clickTime++;
        if (clickTime == 100) {
            clearInterval(log);
            startScene_4_3();
        }
    }, 330)
}

function randomClick() {
    var clickType = probability();
    fakeClick(clickType);
}

//getExsitingType from nodes_data
function getBubbleType() {
    var bubbleType = [];
    if (getIndex("politics") !== -1) { bubbleType.push("politics") }
    if (getIndex("business") !== -1) { bubbleType.push("business") }
    if (getIndex("health") !== -1) { bubbleType.push("health") }
    if (getIndex("entertainment") !== -1) { bubbleType.push("entertainment") }
    if (getIndex("lifestyle") !== -1) { bubbleType.push("lifestyle") }
    if (getIndex("travel") !== -1) { bubbleType.push("travel") }
    if (getIndex("sports") !== -1) { bubbleType.push("sports") }
    if (getIndex("tech") !== -1) { bubbleType.push("tech") }
    return bubbleType;
}

function getBubbleTypeNum() {
    var bubbleTypeNum = [
        { type: "politics", num: 0 },
        { type: "business", num: 0 },
        { type: "health", num: 0 },
        { type: "entertainment", num: 0 },
        { type: "lifestyle", num: 0 },
        { type: "travel", num: 0 },
        { type: "sports", num: 0 },
        { type: "tech", num: 0 },
    ]
    $.each(nodes_data, function (i, element) {
        var i = bubbleTypeNum.findIndex((e) => e.type === element.type);
        bubbleTypeNum[i].num++;
    })
    return bubbleTypeNum;
}

function getMostBubble() {
    var bubbleNum = getBubbleTypeNum();
    var mostType = bubbleNum.sort(function (a, b) { return a.num < b.num })[0].type
    return mostType;
}

function probability() {
    updatePreferencesData();
    updateBars();
    var arr1 = [], arr2 = [];
    $.each(preferences_data, function () { arr1.push(this.type) });
    $.each(preferences_data, function () { arr2.push(this.percent) });
    var sum = 0,
        factor = 0,
        random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
        sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = arr2.length - 1; i >= 0; i--) {
        factor += arr2[i];
        if (random <= factor)
            return arr1[i];
    };
    return null;

};

function updateBars() {
    $('.innerbar').css('width', 0);//clear all innerbar's width
    $.each(preferences_data, function () {
        var t = "." + this.type, w = this.percent * 400;
        $('.bar').children(t).css("width", w);
    })
}

function buildPreferencesData() {
    $.each(data, function () {
        preferences_data.push({ type: this.tag, percent: this.percent });
        old_preference.push({ type: this.tag, percent: this.percent });
    })
}

function updatePreferencesData() {
    var mostType = getMostBubble();
    var i = preferences_data.findIndex((e) => e.type === mostType);
    preferences_data[i].percent += 2;

    var totalPre = 0, new_data = preferences_data.slice();

    //total Pre
    $.each(new_data, function () { totalPre = totalPre + this.percent })

    //calculate per
    $.each(new_data, function () {
        this.percent = Math.round((this.percent / totalPre) * 100)
    })

    preferences_data = new_data.slice();
}

function calChange() {
    var new_bubble = getBubbleTypeNum(), new_preference = preferences_data.slice();
    console.log(new_bubble);
    console.log(new_preference);

    const t1 = getMostIndex();
    var type = new_bubble[t1].type;
    var numUp = Math.round((new_bubble[t1].num - old_bubble[t1].num) / old_bubble[t1].num * 100);

    var t2 = new_preference.findIndex((e) => e.type === type);
    var percentUp = new_preference[t2].percent - old_preference[t2].percent;

    $('span#mostType').addClass('tag ' + type).text(type);
    $('span#numUp').addClass('bold ' + type).text(numUp+'%');
    $('span#preferenceUp').addClass('bold ' + type).text(percentUp + '%');
    console.log(old_preference[t2])
    function getMostIndex() {
        var mostType = new_bubble.sort(function (a, b) { return a.num < b.num })[0].type
        var i = new_bubble.findIndex((e) => e.type === mostType);
        return i;
    }
}


