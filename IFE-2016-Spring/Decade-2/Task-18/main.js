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
        var newValue = document.getElementById("bar-value").value;

        if (!newValue) {
            alert("请输入!")
        } else if (isNum.test(newValue)) {
            dealEvent(e.target.id, newValue);
        } else {
            alert("请输入一个数字!")
        }
    });

    //监听队列中元素的点击事件
    blocks.addEventListener("click",function (e) {
        var node = e.target;
        var nodeIndex = [].indexOf.call(node.parentNode.children, node);
        data.splice(nodeIndex,1);
        render()
    });

    function dealEvent(eventNam, newValue) {
        switch (eventNam) {
            case 'left-in':
                data.unshift(newValue);
                break;
            case 'right-in':
                data.push(newValue);
                break;
            case 'left-out':
                alert(data.shift());
                break;
            case 'right-out':
                alert(data.pop());
                break;
            default:
                return;
        }
        console.log(data);
        render();
    }

    /*根据数据渲染页面*/
    function render() {
        var content = '';
        data.forEach(function (item, i) {
            content += '<div class="block" >' + item + '</div>';
        });
        document.getElementById("blocks").innerHTML = content;
    }

})();
