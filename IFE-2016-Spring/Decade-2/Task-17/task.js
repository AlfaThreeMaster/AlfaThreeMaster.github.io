/**
 * Created by zhangyida on 16/3/23.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
var colorArray = ['#810081', '#0000FE', '#FD0000', '#008000', '#000000'];

//先获取随机颜色
function getRandomColor() {
    var randNum = Math.floor(Math.random() * 5);
    return colorArray[randNum];
}

//渲染数据
function renderChart() {
    initAqiChartData();
    console.log(chartData);
    //拼接dom
    var chartWrap = document.getElementsByClassName('aqi-chart-wrap');
    var chartContent = '';
    var chartClass = '';
    var innerData = chartData.data;
    switch (chartData.nowGraTime) {
        case 'day':
            chartClass = 'aqi-chart-day';
            break;
        case 'week':
            chartClass = 'aqi-chart-week';
            break;
        case 'month':
            chartClass = 'aqi-chart-month';
            break;
        default:
            return;
    }

    for(var item in innerData){
        chartContent += "<div class='" + chartClass + "' style='height:" + innerData[item] + "px;background: "+getRandomColor()+"'></div>";
    }
    console.log(chartContent);
    chartWrap[0].innerHTML = chartContent;
    console.log(chartWrap)
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    // 确定是否选项发生了变化 
    if (pageState.nowGraTime == time) {
        console.log("未变化!")
    } else {
        console.log("变化!");
        // 设置对应数据
        pageState.nowGraTime = time;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(selectedCity) {
    // 确定是否选项发生了变化 
    if (selectedCity == pageState.nowSelectCity) {
        console.log("未变化!")
    } else {
        console.log("变化了!");
        // 设置对应数据
        pageState.nowSelectCity = selectedCity;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementsByName("gra-time");
    for (var i = 0; i < radio.length; i++) {
        radio[i].addEventListener("click", function (event) {
            graTimeChange(event.target.value);
        })
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select");
    var cityContent = "";
    var i = 0;
    for (item in aqiSourceData) {
        cityContent += "<option value='" + i + "'>" + item + "</option>";
        i++;
    }
    //console.log(cityContent);
    citySelect.innerHTML = cityContent;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener("change", function (event) {
        citySelectChange(event.target.value)
    })
}


/*获取某年某月天数*/
function getDaysInOneMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}


/*处理月的数据*/
function dealMonth(initdata) {
    console.log(initdata)
    initDataArray = Object.getOwnPropertyNames(initdata);
    //默认年份2016,先获取每个月天数
    var daySum = [];
    var dayNum = [];
    var monthTotal = {}; //每个月总数
    var sum = 0;         //用于叠加每个月日子数
    for (var i = 1; i < 13; i++) {
        sum += getDaysInOneMonth(2016, i);
        dayNum.push(getDaysInOneMonth(2016, i));
        daySum.push(sum);
    }
    daySum.unshift(0);
    console.log(dayNum)
    console.log(daySum)
    //拆分initdata数据
    for (var k = 1; k < daySum.length && !isNaN(daySum[k]); k++) {
        var currTotal = 0;
        for (var j = 0; j < daySum[k]; j++) {
            currTotal += initdata[initDataArray[j]];
        }
        if (!isNaN(currTotal)) {
            console.log(currTotal);
            console.log(dayNum[k-1]);
            var title = initDataArray[daySum[k - 1]] + '到' + initDataArray[daySum[k] - 1];
            monthTotal[title] = Math.round(currTotal / dayNum[k-1]);
        }

    }

    return monthTotal;
}


/*处理周的数据*/
function dealWeek(initdata) {
    console.log(initdata);
    initDataArray = Object.getOwnPropertyNames(initdata);
    //每周7天进行轮换
    var weekTotal = {};
    var curTotal = 0;
    var curWeek = 1;
    var curDay = 1;
    initDataArray.forEach(function (item, i) {
        var curWeekDay = new Date(item).getDay();
        console.log(curWeekDay)
        curTotal += initdata[item];
        curDay++;
        if (curWeekDay == 6) {
            var title = '第' + curWeek + '周';
            weekTotal[title] = Math.round(curTotal/curDay);
            curTotal = 0;
            curWeek++;
            curDay=1;
        }
        if (i == initDataArray.length - 1) {
            var title = '第' + curWeek + '周';
            console.log(curDay);
            weekTotal[title] = Math.round(curTotal/curDay);
            curTotal = 0;
        }
    });
    return weekTotal;
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var nowCity = Object.getOwnPropertyNames(aqiSourceData)[pageState.nowSelectCity];
    switch (pageState.nowGraTime) {
        case 'day':
            chartData.data = aqiSourceData[nowCity];
            break;
        case 'week':
            chartData.data = dealWeek(aqiSourceData[nowCity]);
            break;
        case 'month':
            chartData.data = dealMonth(aqiSourceData[nowCity]);
            break;
        default:
            return;
    }
    chartData.nowGraTime = pageState.nowGraTime;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();