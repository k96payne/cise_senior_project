//console.log("hello");

var stocks = ["AAPL", "MSFT", "TSLA", "FB", "AMZN", "NFLX", "TWTR", "NVDA", "GOOGL"];
var username = undefined;
var serverData = undefined;
var stockData = undefined;

if (!isLoggedIn()) 
    window.location.assign('/views/signin.html');
else {
    document.getElementById("logged").innerHTML = "Log Out";
}

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            //console.log(resultData.length);
            callback(resultData);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

document.getElementById("option1").onchange = function () {
    clearDOM();
    populateDOM(stockData, 0);
};

document.getElementById("option2").onchange = function () {
    clearDOM();
    populateDOM(stockData, 1);
};


httpGetAsync(generateStockQueries(), function (data) {
    stockData = [...data];
    console.log(stockData);
    clearDOM();
    populateDOM(data, 0);
});

function generateStockQueries() {
	var queryString = "ciseSeniorProject/stocks?datasetSize=50";
	for(var i = 0; i < stocks.length; i++) {
		queryString += "&tickerSymbol=" + stocks[i];
	}
	return queryString;
}

function populateDOM(data, option) {
    if (option == 0) {
        var start = document.getElementById("myparent");
        var tileStart = document.createElement("div");
        tileStart.classList.add("card-deck");
        tileStart.id = "tilestart";
        start.appendChild(tileStart);
    }

    for (let i = 0; i < 15 && i < data.length; i++) {
        if (option == 0) {
            createTile(data[i]);
            continue;
        }
        createList(data[i]);
    }

}

function clearDOM() {
    var start = document.getElementById("myparent");
    start.innerHTML = "";
}


function createList(data) {
    //console.log("here:" + data[0]);

    var start = document.getElementById("myparent");
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("border-secondary", "mb-1");
    start.appendChild(card);

    var cardStart = document.createElement("div");
    cardStart.classList.add("row");
    card.appendChild(cardStart);

    var col1 = document.createElement("div");
    col1.classList.add("col");
    cardStart.appendChild(col1);
    
    var stockTitle = document.createElement("h2");
    stockTitle.id = "list-title";
    stockTitle.innerHTML = data[0];
    col1.appendChild(stockTitle);

    var col2 = document.createElement("div");
    col2.classList.add("col");
    col2.id = "list-stock-buttons";
    cardStart.appendChild(col2);

    var card5 = document.createElement("a");
    card5.onclick = function () {
        document.cookie = "stockId=" + data[0] + ";path=/;";
        console.log(document.cookie);
            window.location.assign("/views/details.html")
    }
    card5.classList.add("btn");
    card5.classList.add("btn-outline-primary");
    card5.classList.add("stock-buttons");
    card5.innerHTML = "Details";
    col2.appendChild(card5);

    var card6 = document.createElement("a");
    card6.onclick = function () {
        var requestObject = {};
	    requestObject.tickerSymbol = data[0];
        requestObject.username = username;
        httpPostAsync("ciseSeniorProject/favorite", requestObject, function(data) {
            if(data < 300) {
                alert("Stock " + data[0] + " added to favorites");
            } else {
                alert("Something went wrong");
            }
        });
    }
    card6.classList.add("btn");
    card6.classList.add("btn-outline-primary");
    card6.classList.add("stock-buttons");
    card6.innerHTML = "Favorite Stock";
    col2.appendChild(card6);
}

function createTile(data) {
    //console.log(data);
    var stockName = data[0];
    var cdata = data.slice();
    cdata.splice(0,1);
    var start = document.getElementById("tilestart");
    var cardStart = document.createElement("div");
    cardStart.classList.add("card");
    cardStart.classList.add("text-center");
    cardStart.classList.add("shadow", "p-3", "mb-5", "bg-white", "rounded");
    start.appendChild(cardStart);

    var insert = document.createElement("canvas");
    insert.id = "chart";
    cardStart.appendChild(insert);
    //console.log(insert);
    //var ctx = $("#myChart");
    var label = [];
    for(var i = 0; i < cdata.length; i++){
        label.push("");
    }
    var bgc = "";
    if(cdata[0]<cdata[cdata.length-1]){
        bgc = 'rgba(2, 200, 167, 0.4)';
    }
    else {
        bgc = 'rgba(245, 52, 32, 0.4)';
    }

    var myChart = new Chart(insert, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Closing value',
                data: cdata,
                borderWidth: 1,
                backgroundColor: bgc,
            }],
        },
        options: {
            elements: {
                line: {
                    tension: 0,
                }
            }
        }
    });

    var card2 = document.createElement("div");
    card2.classList.add("card-body");
    cardStart.appendChild(card2);

    var card3 = document.createElement("h5");
    card3.classList.add("card-title");
    card3.classList.add("stock-titles");
    card3.innerHTML = stockName;
    card2.appendChild(card3);


    var card5 = document.createElement("a");
    card5.onclick = function () {
        console.log(data);
        document.cookie = "stockId=" + stockName + ";path=/;";
        console.log(document.cookie);
            window.location.assign("/views/details.html")
    }
    card5.classList.add("btn");
    card5.classList.add("btn-outline-primary");
    card5.classList.add("stock-buttons");
    card5.innerHTML = "Details";
    card2.appendChild(card5);

    var card6 = document.createElement("a");
    card6.onclick = function () {
        var requestObject = {};
	    requestObject.tickerSymbol = stockName;
        requestObject.username = username;
        httpPostAsync("ciseSeniorProject/favorite", requestObject, function(data) {
            if(data < 300) {
                alert("Stock " + stockName + " added to favorites");
            } else {
                alert("Something went wrong");
            }
        });
    }
    card6.classList.add("btn");
    card6.classList.add("btn-outline-primary");
    card6.classList.add("stock-buttons");
    card6.innerHTML = "Favorite Stock";
    card2.appendChild(card6);

}

function isLoggedIn() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = undefined;
        var value = undefined;
        try {
            name = cookies[i].split('=')[0].toLowerCase();
            value = cookies[i].split('=')[1].toLowerCase();
        } catch(err) {
            return false;
        }
        
        if (name.indexOf("username") >=0 && value!="" && value!=" ") {
            username = value;
            console.log("Logged in");
            return true;
        }
    }
    console.log("Not logged in");
    return false;
}

function httpPostAsync(theUrl, requestObject, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        }
        else if(xmlHttp.readyState==4)
            callback(xmlHttp.status);
        
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(requestObject));
}
