let prevBtn = '<i class="fa-solid fa-angle-right">'
let nextBtn = '<i class="fa-solid fa-angle-left">'

function backgroundImage() {
    // let bgElement = $('.bg-custom')
    // for (let i = 0; i < bgElement.length; i++) {
    //     let bgImg = $(bgElement[i]).attr("data-background")
    //     $(bgElement[i]).css("background-image", `url("${bgImg}")`)
    //     console.log(bgElement[i])
    // }
    let bgElements = $('.bg-custom')
    for (let bgElement of bgElements){
        let bgImg = $(bgElement).attr("data-background")
        $(bgElement).css("background-image", `url("${bgImg}")`)
        // console.log(bgElement)
    }

}

function graph() {
    // let graphStat = $('.stat-graph > span')
    // for (let i = 0; i < graphStat.length; i++) {
    //     let percent = $(graphStat[i]).attr("data-value")
    //     $(graphStat[i]).css("width", percent)
    // }

    let graphStats = $('.stat-graph > span')
    for (let graphStat of graphStats){
        let percent = $(graphStat).attr("data-value")
        $(graphStat).css("width", percent)
    }
}

function accordion() {
    let accTitle = $('.acc-title')
    let accFocused = $('.acc-title.acc-focused')
    let accContent = $('.acc-content')
    $(accTitle).click(function () {
        if ($(this).next(accContent).is(':hidden')) {
            $(accFocused).removeClass('acc-focused').children('.fa-solid').toggleClass('fa-minus fa-plus')
            $(accContent).slideUp()

            $(this).addClass('acc-focused')
                .children('.fa-solid').toggleClass('fa-minus fa-plus').end()
                .next(accContent).slideDown()
        } else {
            $(this).removeClass('acc-focused')
                .children('.fa-solid').toggleClass('fa-minus fa-plus').end()
                .next(accContent).slideUp()
        }

        accFocused = $('.acc-title.acc-focused')
    })
}


$(document).ready(function () {
    // loading scripts
    $('#loading').fadeOut()
    //functions
    backgroundImage()
    graph()
    accordion()
    $.scrollIt({
        activeClass: 'nav-link-active', scrollTime: 300, topOffset: -30
    })

    //top-nav scripts
    $('#show-menu').click(function (event) {
        event.preventDefault()
    })


    let home = $('#home')
    let topNav = $('#top-nav')

    $(home).waypoint(function (direction) {
        if (direction === 'down') {
            $(topNav).css('top', '-100%')
        } else {
            $(topNav).css('top', '0')
        }
    }, {
        offset: '-20%'
    })

    $(home).waypoint(function (direction) {
        if (direction === 'down') {
            $(topNav).addClass('top-nav-fixed')
        } else {
            $(topNav).removeClass('top-nav-fixed')
        }
    }, {
        offset: '-50%'
    })


    //home scripts
    let homeCarousel = $('#home-carousel')
    homeCarousel.owlCarousel({
        rtl: true,
        loop: true,
        items: 1,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 15000,
        dots:false,
        responsive : {
            992 : {
                dots:true
            }
        }
    })

    homeCarousel.on('change.owl.carousel', function (event) {
        let currentSlideIndex = event.item.index
        let currentSlide = $(event.target).find('.owl-item').eq(currentSlideIndex)

        currentSlide.find('h4').removeClass('animate__fadeInRight')
        currentSlide.find('h1').removeClass('animate__fadeInLeft')
        currentSlide.find('p').removeClass('animate__fadeInUp')
        currentSlide.find('.a-btn').removeClass('animate__zoomIn')

        currentSlide.find('.home-box :where(h1 ,h4 ,p ,.a-btn)').hide()
    })

    homeCarousel.on('changed.owl.carousel', function (event) {
        let currentSlideIndex = event.item.index
        let currentSlide = $(event.target).find('.owl-item').eq(currentSlideIndex)

        currentSlide.find('.home-box :where(h1 ,h4 ,p ,.a-btn)').addClass('animate__animated')

        currentSlide.find('h4').addClass('animate__fadeInRight')
        currentSlide.find('h1').addClass('animate__fadeInLeft')
        currentSlide.find('p').addClass('animate__fadeInUp')
        currentSlide.find('.a-btn').addClass('animate__zoomIn')
        currentSlide.find('.home-box :where(h1 ,h4 ,p ,.a-btn)').show()
    })

    //about-us scripts



    //data scripts

    // let data = $('#data')
    let dataCounterUp = $('#data .data-counter-up')

    dataCounterUp.counterUp()


    //filter scripts
    let category
    let sample = $('.row > div')
    $('#samples-filter-links a').click(function (event) {
        event.preventDefault()

        $('#samples-filter-links a').removeClass('filtered')
        $(this).addClass('filtered')

        category = $(this).attr("href")

        if (category === "all") {
            sample.show()
        } else {
            sample.hide()
            sample.filter(category).show()
        }
    })

    //sample scripts
    let showSample = $('.sample a.icon-basic-eye')
    showSample.magnificPopup({
        type : 'image'
    })

    //product scripts
    let product = $('.product')
    $(product).click(function () {
        if (!$(this).hasClass('product-focused')) {
            $(product)
                .removeClass('product-focused bg-custom').addClass(' bg-color')
                .find('.a-btn')
                .addClass('main-a-btn')
                .removeClass('secondary-a-btn')
            $(this)
                .addClass('product-focused bg-custom')
                .removeClass('bg-color')
                .find('.a-btn').toggleClass('main-a-btn secondary-a-btn')
            backgroundImage()
        }
    })

    //comment scripts
    let commentCarousel = $('#comments-carousel')
    $(commentCarousel).owlCarousel({
        rtl: true,
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        navText: [prevBtn, nextBtn]
    })


    //blog scripts
    let blogCarousel = $('#blog-carousel')
    $(blogCarousel).owlCarousel({
        rtl: true, items: 1, dots: false, nav: true, navText: [prevBtn, nextBtn], responsive: {
            768: {
                items: 2
            }, 992: {
                items: 3
            }
        }
    })

    $(blogCarousel).find('.owl-stage').addClass('row')
    $(blogCarousel).find('.owl-item').addClass('col-lg-4')

    //comment form scripts

    $('.cu-field[required]').blur(function () {
        if ($(this).is(':invalid')) {
            $(this).addClass('errored')
        } else {
            $(this).removeClass('errored')
        }
    })

})

