$(document).ready(function () {
    renderNav();
    setTheme(localStorage.getItem('theme'));
    scrollDetect();
    // navShadow();
})

function renderNav() {
    var path = $('html').attr('path');
    var nav = $('nav');
    var logoImg = $('<div/>').addClass('logo-img');
    var logo = $('<a/>').addClass('logo');
    var work = $('<a/>').append('work'),
        about = $('<a/>').append('About'),
        cv = $('<a/>').append('View CV'),
        theme_icon = themeIcon(),
        menu_icon = menuIcon();

    if (path == 'home') {
        logo.append('Syl L').click(function () { closeMenu(); smoothScrollTo('#intro') });
        work.click(function(){closeMenu(); smoothScrollTo('#work')});
        about.click(function(){closeMenu(); smoothScrollTo('#about')});
        cv.attr('href','./assets/CV-JinsongLIU.pdf')
    } else {
        logo.append(logoImg).attr('href','../index.html')
        work.attr('href','../index.html#work')
        about.attr('href','../index.html#about')
        cv.attr('href','../assets/CV-JinsongLIU.pdf')
    }

    var nav_wrap = $('<div/>').addClass('navWrap')
        .append(work)
        .append(about)
        .append(cv)
        .append(theme_icon);

    nav.append(logo).append(nav_wrap).append(menu_icon);
}

function menuIcon() {
    var menu_icon = $('<div/>').addClass('menu'),
        rect1 = $('<div/>').addClass('rect').attr('i', 1),
        rect2 = $('<div/>').addClass('rect').attr('i', 2),
        rect3 = $('<div/>').addClass('rect').attr('i', 3),
        rect4 = $('<div/>').addClass('rect').attr('i', 4);
    menu_icon.append(rect1).append(rect2).append(rect3).append(rect4);
    menu_icon.click(function () {
        menu_icon.toggleClass('open')
        $('.navWrap').toggleClass('open');
    })
    return menu_icon;
}

function themeIcon() {
    var themeIcon = $('<div/>').addClass('theme-switch');
    themeIcon.click(function () { closeMenu();switchTheme() })
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
        $('.theme-switch').removeClass('dark');
        localStorage.setItem('theme', 'light')
    }
    else if (theme == 'dark') {
        $('html').attr('data-theme', 'dark');
        $('.theme-switch').addClass('dark');
        localStorage.setItem('theme', 'dark')
    }
}

function closeMenu() {
    $('.menu').removeClass('open')
    $('.navWrap').removeClass('open');
}

function scrollDetect() {
    var nav = $('nav');
    $(window).scroll(function () {
        var before = $(window).scrollTop();
        $(window).scroll(function () {
            var after = $(window).scrollTop();
            if (before <= 0) {
                nav.removeClass('hide')
                // before = after;
            }
            else if (before < after) {
                nav.addClass('hide')
                // console.log('上');
                before = after;
            }
            else if (before > after) {
                nav.removeClass('hide')
                // console.log('下');
                before = after;
            };
        });
    });
}
// smooth scroll
function smoothScrollTo(id) {
    $('html, body').animate({
        scrollTop: ($(id).offset().top)
    }, 800);
}