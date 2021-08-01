$(document).ready(function () {
    renderNav();
    setTheme(localStorage.getItem('theme'));
    renderFooter();
})

function renderNav() {
    var path = $('html').attr('path');
    var nav = $('nav');
    var logoImg = $('<a/>').addClass('logo-img').attr('href', '../');
    var logoText = $('<div/>').addClass('logo-text').text('sylvester lau');
    var work = $('<a/>').attr('id', 'projects').append('projects'),
        about = $('<a/>').attr('id', 'about').append('about'),
        blog = $('<a/>').attr('id', 'blog').append('blog'),
        buyCoffee = $('<a/>').append('buy me a coffee'),
        theme_icon = themeIcon();

    work.attr('href', '../')
    about.attr('href', '../about.html')
    blog.attr('href', 'https://blog.sylvesterlau.com')
    buyCoffee.attr('href', 'https://www.buymeacoffee.com/sylvesterlau')


    var nav_links = $('<div/>').addClass('navWrap')
        .append(work)
        .append(blog)
        .append(about)
        .append(buyCoffee)
        .append(theme_icon);

    var nav_text_group = $('<div/>').addClass('navTextGroup').append(logoText).append(nav_links)

    nav.append(logoImg).append(nav_text_group);

    //highlight nav links
    switch (path) {
        case 'projects':
            $('a#projects').addClass('highlight');
            break;

        case 'about':
            $('a#about').addClass('highlight');
            break;

        case 'blog':
            $('a#blog').addClass('highlight');
            break;
    }
}

function themeIcon() {
    var themeIcon = $('<a/>').addClass('theme-switch');
    themeIcon.click(function () { switchTheme() })
    return themeIcon;
}

function switchTheme() {
    var theme = $('html').attr('data-theme');
    if (theme == 'light') {
        setTheme('dark');
    } else if (theme == 'dark') {
        setTheme('light')
    }
}

function setTheme(theme) {
    if (theme == null || theme == 'light') {
        $('html').attr('data-theme', 'light');
        $('.theme-switch').text('🌚').removeClass('dark');
        localStorage.setItem('theme', 'light')
    }
    else if (theme == 'dark') {
        $('html').attr('data-theme', 'dark');
        $('.theme-switch').text('☀️').addClass('dark');
        localStorage.setItem('theme', 'dark')
    }
}
//render footer
function renderFooter() {
    var footer = $('<footer/>').text('Hand made with 💛 by sylvester lau. All rights reserved ©2021');
    $('body').append(footer);
}