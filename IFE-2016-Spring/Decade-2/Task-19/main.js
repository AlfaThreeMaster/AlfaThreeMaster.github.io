/**
 * Created by zhangyida on 16/3/26.
 */
(function () {
    var data = [];
    /*对页面中的元素的监听事件并调用相应的函数*/
    var container = document.getElementById('buttons');
    var isNum = /^[0-9]*$/;
    var blocks = document.getElementById("blocks");


    container.addEventListener("click", function (e) {
        dealEvent(e.target.id);
    });


    //获取输入框数据
    function getValue() {
        var newValue = document.getElementById("bar-value").value;
        if (!newValue) {
            alert("请输入!");
        } else if (newValue > 100 || newValue < 10) {
            alert("请输入一个大于10小于100的数字");
        } else if (data.length > 60) {
            alert("队列元素最多60个！")
        } else if (isNum.test(newValue)) {
            return newValue;
        } else {
            alert("请输入一个数字！");
        }
    }


    //监听队列中元素的点击事件
    blocks.addEventListener("click", function (e) {
        var node = e.target;
        var nodeIndex = [].indexOf.call(node.parentNode.children, node);
        data.splice(nodeIndex, 1);
        render()
    });

    function dealEvent(eventNam, newValue) {
        switch (eventNam) {
            case 'left-in':
                if (getValue()) {
                    data.unshift(getValue());
                }
                break;
            case 'right-in':
                if (getValue()) {
                    data.push(getValue());
                }
                break;
            case 'left-out':
                if (data) {
                    alert(data.shift());
                }
                break;
            case 'right-out':
                if (data) {
                    alert(data.pop());
                }
                break;
            default:
                return;
        }
        console.log(data);
        render();
    }


    /*实现简单的快速排序*/
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        var pivotIndex = Math.floor(arr.length / 2);
        var pivot = arr.splice(pivotIndex, 1)[0];
        var left = [];
        var right = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([pivot], quickSort(right));
    }

    /*绑定到排序按钮上*/
    document.getElementById("rank").onclick = function () {
        data = quickSort(data);
        render();
    };

    /*随机生成一组数据*/
    document.getElementById("random-data").onclick = function () {
        for (var i = 0; i <= 20; i++) {
            data[i] = Math.floor(Math.random() * 91 + 9);
        }
        render()
    };


    /*根据数据渲染页面*/
    function render() {
        var content = '';
        data.forEach(function (item, i) {
            content += '<div class="block" style="height: ' + item + 'px;line-height: ' + item + 'px;">' + item + '</div>';
        });
        document.getElementById("blocks").innerHTML = content;
    }

})();
