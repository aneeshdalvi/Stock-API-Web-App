google.charts.load('current', {packages: ['corechart']});

var stock_list = new Array();

var google = new Array();
google.push(new Array('Element','Response', { role: 'style' }, { role: 'annotation' }));


//

function theLoad()
{
    console.log("im called");
    iterateOverStockData();
    setTimeout(function(){theLoad();},5000);
}

// function appendDataForList()
// {
//     var elem = document.getElementById("textbox");
//     if(elem.value){
//         var ul = document.getElementById("ul");
//         var li = document.createElement("li");
//         li.appendChild(document.createTextNode(elem.value));
//         ul.appendChild(li);

//     }

// }


function getToday()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }
    today = yyyy+''+mm+''+dd;
    return today;
}

// main Function
function myFunction()
{

    // appendDataForList();
      var elem = document.getElementById("textbox");
    if(elem.value){
        var ul = document.getElementById("ul");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(elem.value));
        ul.appendChild(li);

    }
    var stock_query = document.getElementById("textbox").value;
    stock_list.push(stock_query);
    iterateOverStockData();

}

function drawGraph()
{
    console.log(google);
    var data3 = google.visualization.arrayToDataTable(google);

    var options = {
        title: 'Stocks',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Price',
            minValue: 0
        },
        legend: 'none'
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

    chart.draw(data3, options);
}



function iterateOverStockData( )
{
    if(stock_list.length>=1)
    {
        today = getToday();
        while(google.length>0)
            google.pop();

        google.push(new Array('Element','', { role: 'style' }, { role: 'annotation' }));
        iteration(0);
    }
}




function iteration(i)
{
    today = getToday();
    console.log("for--"+i);
    url = 'https://api.iextrading.com/1.0/stock/'+stock_list[i]+'/chart/date/'+today;
    console.log(url);
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    request.onload  = function (e)
    {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400)
        {
            var lastdata = data[data.length-1];
            // console.log(lastdata.close);

            var arr = new Array();

            arr.push(stock_list[i] + "");
            arr.push(lastdata.close);
            arr.push('#b3ffe6');
            arr.push(lastdata.close);
            //     console.log(arr);
            var newarr = new Array();
            google.push(arr);

            console.log(i);
            console.log(stock_list.length);

            if(i==stock_list.length-1)
            {
                drawGraph();


                //setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
            }
            else
            {
                iteration(i+1);
            }

            //     console.log(google);

        }
        else
        {
            console.log('error');
        }
    }
    request.open('GET', url, true);
    request.send();

}
