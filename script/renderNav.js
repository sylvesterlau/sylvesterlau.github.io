$(document).ready(function () {
    var path = $('html').attr('path');
    var workLink, aboutLink, resumeLink;
    getPathLinks();
    renderNav();
    defaultTheme();

    $('#nav-wrap').children('#switch').on('click', function () { switchTheme() });
    $('#nav-icon3').click(function () {
        $(this).toggleClass('open');
        $('#nav-wrap').toggleClass('open');
    });

    // $(window).scroll(function () {
    //     var y1 = $(window).scrollTop(), y2;
    //     $(window).scroll(function () {
    //         y2 = $(window).scrollTop();
    //         if (y1 - y2 < 0 && y1 > 0) {
    //             //up
    //             $('.nav').css('transform','translateY(-100%)');
    //             y1 = y2;
    //         } else if (y1 - y2 > 0) {
    //             //down
    //             $('.nav').css('transform','translateY(0)');
    //             y1 = y2;
    //         }
    //     });
    // });

    function defaultTheme() {
        var localTheme = window.localStorage.theme;
        if (localTheme == 'dark') { goDark() }
        else (goLight())
    }

    function renderNav() {
        // $('.nav').append($('<a/>').addClass('logo').attr('href', workLink));
        $('.nav').append($('<div/>').attr('id', 'nav-icon3'))
            .append($('<div/>').attr('id', 'nav-wrap'));

        $('#nav-icon3').append('<span/>')
            .append('<span/>')
            .append('<span/>')
            .append('<span/>');

        $('#nav-wrap').append($('<a/>')
            .addClass('nav-item').text('home')
            .attr('id', 'work')
            .attr('href', workLink))

            .append($('<a/>')
                .addClass('nav-item').text('about')
                .attr('id', 'about')
                .attr('href', aboutLink))

            .append($('<a/>')
                .addClass('nav-item').text('resume')
                .attr('id', 'resume')
                .attr('target','_blank')
                .attr('href', resumeLink))

            .append($('<div/>')
                // .addClass('nav-item')
                .attr('id', 'switch')
                // .mouseenter(function () { switchExpand(this) })
                // .mouseleave(function () { switchCollapse(this) })
                .append('<div/>')
                .append($('<span/>')
                // .css('display', 'none').css('width', 0)
                ))

        switch (path) {
            case 'work':
                $('a#work').addClass('current')
                break;
            case 'about':
                $('a#about').addClass('current')
                break;
        }
    }

    function switchTheme() {
        var currentTheme = $('html').attr('data-theme');
        switch (currentTheme) {
            case "light": goDark(); break;
            case "dark": goLight(); break;
        }
    }

    function goDark() {
        $('html').attr('data-theme', 'dark');
        window.localStorage.theme = 'dark';
        $('#switch').children().attr('class', 'light');
        $('#switch').children('span').text('Light');
    }

    function goLight() {
        $('html').attr('data-theme', 'light');
        window.localStorage.theme = 'light';
        $('#switch').children().attr('class', 'dark');
        $('#switch').children('span').text('Dark');
    }

    function switchExpand(a) {
        $(a).children('span').css('display', 'inline')
            .animate({ width: '40px' }, 300);
    }

    function switchCollapse(a) {
        $(a).children('span')
            .animate({ width: '0px' }, 300, function () {
                $(this).css('display', 'none')
            });
    }

    function getPathLinks() {
        switch (path) {
            default:
                workLink = './index.html';
                aboutLink = './about.html';
                resumeLink = './assets/CV-JinsongLIU.pdf';
                break;
            case 'project':
                workLink = '../index.html';
                aboutLink = '../about.html';
                resumeLink = '../assets/CV-JinsongLIU.pdf';
                break;
        }
    }
})

