var width = $('#display').width(),
    height = $('#display').height();

var svg = d3.select("#display")
    .append("svg")
    .attr("width", width)
    .attr("height", height)


//use click history to build data
var data = [
    { tag: "politics", percent: 0, click: 0 },
    { tag: "business", percent: 0, click: 0 },
    { tag: "health", percent: 0, click: 0 },
    { tag: "entertainment", percent: 0, click: 0 },
    { tag: "lifestyle", percent: 0, click: 0 },
    { tag: "travel", percent: 0, click: 0 },
    { tag: "sports", percent: 0, click: 0 },
    { tag: "tech", percent: 0, click: 0 }];

var totalClick = click_history.length;
$.each(click_history, function () {
    if (this == "politics") { data[0].click++ }
    if (this == "business") { data[1].click++ }
    if (this == "health") { data[2].click++ }
    if (this == "entertainment") { data[3].click++ }
    if (this == "lifestyle") { data[4].click++ }
    if (this == "travel") { data[5].click++ }
    if (this == "sports") { data[6].click++ }
    if (this == "tech") { data[7].click++ }
})

$.each(data, function () {
    // this.percent = (Number(this.click / totalClick).toFixed(2)) * 100;
    this.percent = Math.round((this.click / totalClick) * 100)
})



$.each(data, function (i) {
    data[i].radius = 25 + 4 * data[i].percent;
    createBubbleNum(data[i].tag);
})

//获取 0 persent 的类型
var zeroNode = [];

$.each(data, function () {
    if (this.percent == 0) { zeroNode.push(this.tag) }
})

//力场
var forceCollide = d3.forceCollide(d => d.radius + 5)
    .strength(0.8);

var s = 0.02;

var forceX = d3.forceX(width / 2).strength(s);
var forceY = d3.forceY(height / 2).strength(s);

var force = d3.forceSimulation(data)
    .force('x', forceX)
    .force('y', forceY)
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', forceCollide)
    .on('tick', tick)

svg.selectAll('.node')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', d => 'node ' + d.tag)
    .on("mousedown", (d, i) => setPreference(d, i))
    .attr('r', d => d.radius);

force.nodes(data)
    .alpha(0.5)
    .restart()

function tick() {
    svg.selectAll('.node')
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
    setBubbleNum('politics');
    setBubbleNum('business');
    setBubbleNum('health');
    setBubbleNum('entertainment');
    setBubbleNum('lifestyle');
    setBubbleNum('travel');
    setBubbleNum('sports');
    setBubbleNum('tech');
}

//创建 div.bubbleNum 
function createBubbleNum(type) {
    var id = type + 'Num';
    var typeUpper = firstLetterUpper(type);
    $('div#display').append($('<div/>').addClass('bubbleNum').attr('id', id)
        .append($('<p/>').text(typeUpper))
        .append($('<p/>').attr('id', 'percent')))
    $('#' + id).on('click', function () { fakeClick(type) });
}

//绑定事件
$('#politicsNum').on('click', () => fakeClick("politics"))


//设定 bubbleNum
function setBubbleNum(type) {
    var circle = 'circle.' + type;
    var id = '#' + type + 'Num';
    var testX = $(circle).attr('cx')
    var testY = $(circle).attr('cy')

    var textI = data.findIndex((data) => data.tag == type);
    var text = data[textI].percent + '%';

    $(id).css('left', function () { return testX + 'px' })
        .css('top', function () { return testY + 'px' });

    $(id).children('#percent').text(text)
}


//根据 percent 设置样式
function setZeroNodeStyle() {
    svg.selectAll('.node').filter(d => d.percent == 0)
        .attr('opacity', 0.5);
}

function setExistingNodeStyle() {
    svg.selectAll('.node').filter(d => d.percent > 0)
        .attr('opacity', 1);
}


setZeroNodeStyle();
setExistingNodeStyle();

function setPreference(d, index) {
    var addType = d.tag;//增加的类型
    var addIndex = data.findIndex((data) => data.tag == addType);//增加的类型索引
    console.log('tag:' + addType);

    var reduceType = randomTypeOtherThan(addType);//减少的类型
    var reduceIndex = data.findIndex((data) => data.tag == reduceType)//减少的类型索引

    if (reduceType == addType) { console.log(reduceType, addType) }
    else {
        //calculate persent
        d.percent += 1;//percent+1
        data[reduceIndex].percent -= 1;//percent-1
        //caculate radius
        var addRadius = 25 + 4 * data[addIndex].percent;
        var reduceRadius = 25 + 4 * data[reduceIndex].percent;

        //add preference radius
        d3.selectAll('.node')
            .filter(function (d, i) { return i === addIndex; })
            .transition().duration(300)
            .tween('radius', function (d) {
                var that = d3.select(this);
                var i = d3.interpolate(d.radius, addRadius);
                return function (t) {
                    d.radius = i(t);
                    that.attr('r', function (d) { return d.radius; });
                    force.nodes(data)
                }
            });

        //reduce preference radius
        d3.selectAll('.node')
            .filter(function (d, i) { return i === reduceIndex; })
            .transition().duration(300)
            .tween('radius', function (d) {
                var that = d3.select(this);
                var i = d3.interpolate(d.radius, reduceRadius);
                return function (t) {
                    d.radius = i(t);
                    that.attr('r', function (d) { return d.radius; });
                    force.nodes(data)
                }
            });
        setExistingNodeStyle();
        setZeroNodeStyle();
        force.alpha(0.5).restart();
    }
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
//获取指定type的index
function getIndex(type, array) {
    function find(element) { return element.tag === type }
    var getIndex = array.findIndex(find);
    return getIndex;
}
//获取存在的type
function getExistingType() {
    existingType = [];
    $.each(data, function () {
        if (!this.percent == 0) { existingType.push(this.tag) }
    })
    return existingType;
}
//从现有中除去a，随机
function randomTypeOtherThan(a) {
    getExistingType();
    if (existingType.length == 1) { return existingType[0] }
    else {
        var aIndex = existingType.indexOf(a);
        existingType.splice(aIndex, 1);
        var maxNum = existingType.length;
        var ri = randomNum(1, maxNum) - 1;
        return existingType[ri];
    }
}

//模拟点击 type
function fakeClick(type) {
    var target = d3.selectAll('.node')
        .filter(function (d, i) { return d.tag === type; })
        .dispatch("mousedown");
    target.call("mousedown");
}

//string 首字母大写
function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

//获取最多的偏好
function mostTypeOtherThan(a) {
    var arr1 = getExistingType();
    var aIndex = arr1.indexOf(a);
    arr1.splice(aIndex, 1);

    var mostType = arr1.sort(function (a, b) { return a.percent < b.percent })[0].type
    return mostType;
}