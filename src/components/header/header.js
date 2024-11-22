import { LOGINURLBASE, BASEURL } from '../../api/api.js'
import '@/components/search-input/index.js'

var type = 0;
$(function () {
    var url = $('body').attr('pageType');
    var registerButton = $('.home-header-right > button:last-child'); //注册的按钮
    var loginButton = $('.home-header-right > button:first-child');  //获取登陆的按钮
    var MenuCount = $('.home-header-center');

    function skipPage() {
        if (url === 'index') {
            MenuCount.find(' > div:nth-child(1)').addClass('header-center-active')
        } else if (url === 'information') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(2)').addClass('header-center-active')
        } else if (url === 'analyse') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(3)').addClass('header-center-active')
        } else if (url === 'case') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(4)').addClass('header-center-active')
        } else if (url === 'menu') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(5)').addClass('header-center-active')
        } else if (url === 'work') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(6)').addClass('header-center-active')
        } else if (url === 'about') {
            $('.header-center-active').removeClass('header-center-active')
            MenuCount.find(' > div:nth-child(7)').addClass('header-center-active')
        }
    }
    skipPage();

    $('.classify-product-title').mouseenter(function () {
        $('.classify-product-active').removeClass('classify-product-active')
        $(this).addClass('classify-product-active');
    })


    registerButton.click(function () {
        window.open('register.html', "_blank");
    })

    loginButton.click(function () {
        window.open(`${LOGINURLBASE}`, "_blank");
    })

    function fadeIn() {
        $("#category").css("display", "block");
        // $("#category").css("opacity","0");
        $(".category").removeClass("fadeout").addClass("fadein");
    }

    function fadeOut() {
        $(".category").removeClass("fadein").addClass("fadeout");
        setInterval(function () {
            if ($('.fadeout').css("opacity") == 0) {
                $("#category").css("display", "none");
            }
        }, 100);
    }

    $(".product-menu").mouseenter(function () {
        fadeIn()
        $("body").css("overflow", "hidden")
        $(".product-menu > span:nth-child(2)").css("display", "none");
        $(".product-menu > span:nth-child(3)").css("display", "block");
    })

    $(".product-menu").mouseleave(function () {
        fadeOut()
        $("body").css("overflow", "auto")
        $(".product-menu > span:nth-child(2)").css("display", "block");
        $(".product-menu > span:nth-child(3)").css("display", "none");
    })

    $(".jump-login").on("click", function () {
        window.open(`${BASEURL}`, "_blank");
    })
})