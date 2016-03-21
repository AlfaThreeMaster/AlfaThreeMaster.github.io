/**
 * Created by zhangyida on 16/3/18.
 */
$(function () {
    /*全局变量定义*/
    var i = 0;
    var clone = $('.banner .img li').first().clone();
    $('.banner .img').append(clone);
    var size = $('.img li').size();
    $('.banner .num li').first().addClass('on');

    /*向左的操作函数*/
    function moveLeft() {
        i++;
        if (i == size) {
            $('.banner .img').css({left: 0})
            i = 1;
        }
        if(i==size-1){
            $('.banner .num li').eq(0).addClass("on").siblings().removeClass()
            i=size-2
        }else{
            $('.banner .num li').eq(i).addClass("on").siblings().removeClass()
        }

        $('.banner .img').stop().animate(
            {left: -550 * i}, 500
        )
    }

    /*向右的操作函数*/
    function moveRight() {
        i--;
        if (i == -1) {
            $('.banner .img').css({left: -(size - 1) * 550})
            i = size - 2;
        }
        if(i==size-1){
            $('.banner .num li').eq(0).addClass("on").siblings().removeClass()
            i=size-2
        }else{
            $('.banner .num li').eq(i).addClass("on").siblings().removeClass()
        }
        $('.banner .img').stop().animate(
            {left: -550 * i}, 500
        )
    }


    /*向左的按钮*/
    $('.banner .btn_l').click(function () {
        moveLeft()
    });

    /*向右的按钮*/
    $('.banner .btn_r').click(function () {
        moveRight()
    });

    /*鼠标滑入圆点*/
    $('.banner .num li').hover(function () {
        var index = $(this).index();
        $('.banner .img').stop().animate({left: -index * 550}, 500);
        $(this).addClass('on').siblings().removeClass('on');
    });

    /*对banner定时器的操作*/
    $('.banner').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(moveLeft, 2000)
    });


    /*添加定时器自动轮播*/
    var timer = setInterval(function () {
        moveLeft();
    }, 2000)
});