const dataBefore = [6768, 4757, 3284, 3138, 3135, 2886, 2740],
    dataAfter = [15131, 12227, 9744, 9437, 9417, 8612, 8418];

const orange = 'rgb(255, 187, 4)',
    green = 'rgb(29, 225, 96)';

function getDataPercent(data) {
    var max = Math.max(...data);
    var output = [];
    data.forEach(function (item, index) {
        var number = item / max;
        var newPercent = Math.round(number * 10000) / 100;
        output.push(newPercent);
    })
    return output;
}

const percentBefore = getDataPercent(dataBefore),
    percentAfter = getDataPercent(dataAfter);

var ctx1 = document.getElementById('uba1').getContext('2d'),
    ctx2 = document.getElementById('uba2').getContext('2d');
var ubaChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Enter', 'Menu', 'Browse Cart', 'Bill', 'Creat Order', 'Purchase', 'Complete'],
        datasets: [
            {
                //line Chart before
                label: 'June',
                backgroundColor: 'rgba(255, 221, 4, 0.3)',
                borderColor: orange,
                borderWidth: 4,
                lineTension: .2,
                //point style
                pointBackgroundColor: orange,
                pointHoverBackgroundColor: orange,
                pointRadius: 3,
                pointHoverRadius: 6,
                //data
                data: percentBefore,
            }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        title: {
            display: true,
            text: 'User Retention (Jun. 18-30, 2018)',
            fontSize: 18,
        },
        tooltips: {
            callbacks: {
                titleFontSize: 16,
                bodyFontSize: 16,
                label: function (tooltipItems, data) {
                    var label = data.datasets[tooltipItems.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItems.yLabel + '%';
                    return label;
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    }
});

var ubaChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Enter', 'Menu', 'Browse Cart', 'Bill', 'Creat Order', 'Purchase', 'Complete'],
        datasets: [
            {
                //line Chart before
                label: 'June',
                backgroundColor: 'rgba(255, 221, 4, 0.3)',
                borderColor: 'rgb(255, 187, 4)',
                borderWidth: 4,
                lineTension: .2,
                //point style
                pointBackgroundColor: orange,
                pointHoverBackgroundColor: orange,
                pointRadius: 3,
                pointHoverRadius: 6,
                //data
                data: percentBefore,
            }, {
                //line Chart after
                label: 'August',
                backgroundColor: 'rgba(29, 225, 96, 0.3)',
                borderColor: green,
                borderWidth: 4,
                lineTension: .2,
                //point style
                pointBackgroundColor: green,
                pointHoverBackgroundColor: green,
                pointRadius: 3,
                pointHoverRadius: 6,
                //data
                data: percentAfter,
                fill: '-1'
            },]
    },
    options: {
        responsive: true, maintainAspectRatio: false,

        title: {
            display: true,
            text: 'User Retention (Jul. 30-August. 15, 2018)',
            fontSize: 18,
        },
        tooltips: {
            mode: 'index',
            callbacks: {
                titleFontSize: 16,
                bodyFontSize: 16,
                label: function (tooltipItems, data) {
                    var label = data.datasets[tooltipItems.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItems.yLabel + '%';
                    return label;
                }
            }
        },
        plugins: {
            filler: {
                propagate: true
            }
        },
        scales: {
            xAxes: [{
                barPercentage: 0.7
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    }
});