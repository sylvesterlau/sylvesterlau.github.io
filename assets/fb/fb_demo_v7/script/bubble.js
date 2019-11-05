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

buildData(8);

//log node click times
var nodeClicks = 0;

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
        .transition().duration(500)
        .attr("r", 20)
        .style('opacity', 0)
        .remove();

    node.transition()
        .duration(500)
        .attr("r", 11.5);

    force.start();
    svg.selectAll(".node")
        .attr("class", function (d) { return "node " + d.type })
}

restart();

//mousedown
function mousedownNode(d, i) {
    nodeClicks++;
    updateButton();
    
    add(d, i);
    add(d, i);
    click_history.push(d.type);

    reduce(d, i);
    restart();
    setTimeout(function () {
        var reduceType = randomTypeOtherThan(d.type);
        var reduceI = getIndex(reduceType);
        reduce("", reduceI);
        restart();
    }, 550);
}

//add
function add(d, i) {
    var ni = randomNum(0, 9);
    console.log(ni);
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

//获取存在的type
function getExistingType() {
    existingType = [];
    if (!$('circle.politics').length == 0) { existingType.push('politics') };
    if (!$('circle.business').length == 0) { existingType.push('business') };
    if (!$('circle.health').length == 0) { existingType.push('health') };
    if (!$('circle.entertainment').length == 0) { existingType.push('entertainment') };
    if (!$('circle.lifestyle').length == 0) { existingType.push('lifestyle') };
    if (!$('circle.travel').length == 0) { existingType.push('travel') };
    if (!$('circle.sports').length == 0) { existingType.push('sports') };
    if (!$('circle.tech').length == 0) { existingType.push('tech') };
    return existingType;
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
    getExistingType();
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
var fistLetterUpper = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
//mouse over
function mouseoverNode(d, i) {
    var text = d.text, type = d.type, typeUpper = fistLetterUpper(type);

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

//update button
function updateButton() {
    console.log('clicks: ' + nodeClicks)
    if (nodeClicks > 0) {
        $('button#next').removeClass('disabled')
    }
}