google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

var stock_list = new Array();
stock_list.push(['Stocks', 'Prices']);
var stocksMap = new Map();
var token = 'pk_ff87af90c5e84f27a041e5be8ba3ba15';
var prev_stock_symbol = "";

function drawBasic() {
    var iterator1 = stocksMap[Symbol.iterator]();

    for (let item of iterator1) {
        stock_list.push(item);
    }
    console.log(stock_list);

    var data = google.visualization.arrayToDataTable(stock_list);

    var options = {
        title: 'Stock Prices',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Prices',
            minValue: 0
        },
        vAxis: {
            title: 'Companies'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    // when first input is given then start plotting graph
    if (stock_list.length > 1){
        chart.draw(data, options);
    }
    stock_list = [];
    stock_list.push(['Stocks', 'Prices']);
}

function myFunction() {
    var elem = document.getElementById("textbox");
        if(!stocksMap.has(elem.value)){
            if (elem.value != ""){
                var ul = document.getElementById("ul");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(elem.value));
                ul.appendChild(li);
            }
        }
    var stock_symbol = document.getElementById("textbox").value;
    apiCall(stock_symbol);
}

function apiCall(stock_symbol){
    var request = new XMLHttpRequest();

    if (stock_symbol != "" && stock_symbol != undefined && stock_symbol != prev_stock_symbol){
        var resOpened = true;
        prev_stock_symbol = stock_symbol;
        request.open('GET', 'https://cloud.iexapis.com/stable/stock/'+stock_symbol+'/price?token='+ token, true);
    }else{
        // when no new calls
         drawBasic();
    }
    request.onload = function () {
        var price = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400){
                console.log(price);
                stocksMap.set(stock_symbol, price);
                if (resOpened){
                    drawBasic();
                }
            }else{
                console.log('error');
        }
    }
    if (resOpened){
        request.send();
    }
}
// call after every 5 secs
setInterval(apiCall, 5000);

