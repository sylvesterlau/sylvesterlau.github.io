$(document).ready(function () {
    $('body').children('.intro').animate({ opacity: '1' }, 500)
    setTimeout(() => {
        $('body').children('.gallery').animate({ opacity: '1' }, 500)
    }, 200);

    //hover effect
    // $('.work-cover').mouseenter(function () {
    //     $(this).children('img').addClass('active')
    // }).mouseleave(function () {
    //     $(this).children('img').removeClass('active')
    // })

    //click cover
    $('div.work-cover').click(function () {
        var link = $(this).attr('href')
        $('body').children('.intro').animate({ opacity: '0' }, 300)
        $('body').children('.gallery').animate({ opacity: '0' }, 300)
        setTimeout(() => {
            window.location = link;
        }, 300);
        
    })
})