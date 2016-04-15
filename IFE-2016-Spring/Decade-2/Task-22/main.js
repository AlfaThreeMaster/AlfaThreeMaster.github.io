/**
 * Created by zhangyida on 16/3/28.
 */
(function () {
    //获取dom节点构成树
    var tree = document.getElementById("main");
    var treeList = [];
    //先序遍历
    function preOrder(node) {
        treeList.push(node);
        if (nodeOperate.returnLeftChild(node)) {
            arguments.callee(nodeOperate.returnLeftChild(node));
        }
        if (nodeOperate.returnRightChild(node)) {
            arguments.callee(nodeOperate.returnRightChild(node));
        }
    }


    //中序遍历
    function midOrder(node) {
        if (nodeOperate.returnLeftChild(node)) {
            arguments.callee(nodeOperate.returnLeftChild(node));
        }

        treeList.push(node);

        if (nodeOperate.returnRightChild(node)) {
            arguments.callee(nodeOperate.returnRightChild(node));
        }
    }


    //后序遍历
    function postOrder(node) {
        if (nodeOperate.returnLeftChild(node)) {
            arguments.callee(nodeOperate.returnLeftChild(node));
        }
        if (nodeOperate.returnRightChild(node)) {
            arguments.callee(nodeOperate.returnRightChild(node));
        }
        treeList.push(node);
    }

    //dom节点操作公用函数
    var nodeOperate = {

        //返回节点左孩子
        returnLeftChild: function (node) {
            return node.firstElementChild;

        },

        //返回节点右孩子
        returnRightChild: function (node) {
            return node.lastElementChild;
        },


        //为节点添加样式
        addClass: function (obj, cls) {
            if (typeof (obj) != "undefined") {
                obj.setAttribute("class", cls)
            }
        },

        //为节点删除样式
        removeClass: function (obj) {
            if (typeof (obj) != "undefined") {
                obj.setAttribute("class", "")
            }
        },


        //动画
        animate: function () {
            console.log(treeList);
            var i = 0;
            nodeOperate.addClass(treeList[i], "curr");
            timer = setInterval(function () {
                i++;
                if (i < treeList.length) {
                    nodeOperate.removeClass(treeList[i - 1]);
                    nodeOperate.addClass(treeList[i], "curr");
                } else {
                    nodeOperate.removeClass(treeList[i - 1]);
                    clearInterval(timer)
                }
            }, 1000)
        }

    };

    //监听页面中的按钮
    var btns = document.getElementById("buttons");
    btns.addEventListener("click", function (e) {
        //console.log(e)
        switch (e.target.innerText) {
            case "先序遍历":
                preOrder(tree);
                nodeOperate.animate();
                break;
            case "中序遍历":
                midOrder(tree);
                nodeOperate.animate();
                break;
            case "后序遍历":
                postOrder(tree);
                nodeOperate.animate();
                break;
            default:
                return;
        }
    })


})();