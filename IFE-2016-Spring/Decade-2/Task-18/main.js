/**
 * Created by zhangyida on 16/3/26.
 */
(function () {
    var data = [];
    /*对页面中的元素的监听事件并调用相应的函数*/
    document.getElementById("left-in").onclick = leftInClick;

    var rightIn = document.getElementById("right-in");
    var leftOut = document.getElementById("left-out");
    var rightOut = document.getElementById("right-out");
    var isNum = /^[0-9]*$/;

    /*获取input框中的值并插入队列*/
    function getValue() {
        var newValue = document.getElementById("bar-value").value;
        if(isNum.test(newValue)){
            console.log(newValue);
        }else{
            alert("请输入一个数字!")
        }
    }

    /*渲染id为bars的div中的元素*/
    function renderBars() {
        
    }

    /*点击元素触发的事件删除该元素*/
    function clickDelete() {
        getValue();
    }

    /*点击左侧入的处理*/
    function leftInClick() {
        getValue();
    }

    /*点击右侧入的处理*/
    function rightInClick() {
        getValue();
    }


    /*点击左侧出的处理*/
    function leftOutClick() {
        getValue();
    }

    /*点击右侧出的处理*/
    function rightOutClick() {
        getValue();
    }
    rightIn.onclick=rightInClick;
    rightOut.onclick=leftOutClick;
    leftOut.onclick=rightOutClick;
})();
