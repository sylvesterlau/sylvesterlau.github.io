$(document).ready(function () {
    renderNav();
    setTheme(localStorage.getItem('theme'));
    renderFooter();
    setSiteLang();
})

function renderNav() {
    var path = $('html').attr('path');
    var nav = $('nav');
    var logoImg = $('<a/>').addClass('logo-img').attr('href', '../');
    var logoText = $('<div/>').addClass('logo-text').text('sylvester lau');
    var projects = $('<a/>').attr('id', 'projects').text('projects'),
        about = $('<a/>').attr('id', 'about').text('about'),
        blog = $('<a/>').attr('id', 'blog').text('blog'),
        buyCoffee = $('<a/>').text('buy me a coffee'),
        lang_btn = langBtn(),
        theme_icon = themeIcon();
    
    //中文
    if (localStorage.getItem('lang') == 'zh') {
            projects.text('项目');
            about.text('关于');
            buyCoffee.text('请我喝咖啡');
        }
    
    projects.attr('href', '../')
    about.attr('href', '../about.html')
    blog.attr('href', 'https://blog.sylvesterlau.com')
    buyCoffee.attr('href', 'https://www.buymeacoffee.com/sylvesterlau')


    var nav_links = $('<div/>').addClass('navWrap')
        .append(projects)
        .append(blog)
        .append(about)
        .append(buyCoffee)
        .append(lang_btn)
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

function setSiteLang(){
    // localStorage.setItem('lang', 'en')
    var lang = localStorage.getItem('lang');
    if (lang == null) {localStorage.setItem('lang', 'en')}
    $('html').attr('lang', lang);
    console.log(lang);
    if (lang == 'zh') {
        $('[lang=en]').remove();
    } else  {$('[lang=zh]').remove();}
}

function langBtn() {
    var btn = $('<a/>');
    if (localStorage.getItem('lang') == 'zh') {
        btn.text('English')
    } else {
        btn.text('中文')
    }
    btn.click(function () {switchLang()})
    return btn;
}

function switchLang() {
    if (localStorage.getItem('lang') == 'zh') {
        localStorage.setItem('lang', 'en')
    } else {
        localStorage.setItem('lang', 'zh')
    }
    location.reload();
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
    var footer = $('<footer/>').text('Hand made with 💛 by sylvester lau. All rights reserved ©2022');
    $('body').append(footer);
}