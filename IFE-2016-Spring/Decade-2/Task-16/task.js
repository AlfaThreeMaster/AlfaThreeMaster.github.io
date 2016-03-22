/**
 * Created by zhangyida on 16/3/22.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var value = document.getElementById("aqi-value-input").value;
    var regCity = /^[\u4e00-\u9fa5]|[a-zA-Z]$/;
    var regValue = /^-?[1-9]\d*$/;
    if (!city || !value) {
        alert("输入不允许为空!");
    } else if (!regCity.test(city)) {
        alert("输入的城市名称并不是中英文字符,请重新填写!")
    } else if (!regValue.test(value)) {
        alert("输入的空气质量并不是整数,请重新填写!")
    } else {

    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.getElementById('add-btn');
    btn.onclick = function () {
        addBtnHandle();
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();