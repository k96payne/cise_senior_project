var username = undefined;
var stocks = undefined;
var serverData = undefined;
var stockData = undefined;

if (!isLoggedIn())
    window.location.assign('/views/signin.html');

httpGetAsync("/ciseSeniorProject/favorite/" + username, function(data) {
    stocks = data;
    httpGetAsync(generateStockQueries(), function (data) {
        stockData = data;
        clearDOM();
        populateDOM(data, 0);
    });
});

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            console.log(resultData, typeof (resultData));
            console.log(resultData.length);
            callback(resultData);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function generateStockQueries() {
	var queryString = "/ciseSeniorProject/stocks?datasetSize=50";
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

document.getElementById("option1").onchange = function () {
    clearDOM();
    populateDOM(serverData, 0);
};

document.getElementById("option2").onchange = function () {
    clearDOM();
    populateDOM(serverData, 1);
};

if(isLoggedIn()){
    document.getElementById("logged").innerHTML = "Log Out";
}

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}

function clearDOM() {
    var start = document.getElementById("myparent");
    start.innerHTML = "";
}


function createList(data) {

    var start = document.getElementById("myparent");
    var cardStart = document.createElement("div");
    cardStart.classList.add("card");
    start.appendChild(cardStart);

    var card2 = document.createElement("div");
    card2.classList.add("card-body");
    cardStart.appendChild(card2);

    var card3 = document.createElement("h5");
    card3.classList.add("card-title");
    card3.innerHTML = data.name;
    card2.appendChild(card3);

    var card4 = document.createElement("p");
    card4.classList.add("card-text");
    card4.innerHTML = data.shortDescription;
    card2.appendChild(card4);


    var card5 = document.createElement("a");
    card5.classList.add("text-right");
    card5.classList.add("btn");
    card5.classList.add("btn-outline-primary");
    card5.onclick = function () {
        var x = document.cookie;
        document.cookie = "itemId=" + data.itemId + ";path=/;"
        console.log(x);
        if(isLoggedIn()){
            window.location.assign("/views/details.html")
        }
        else window.location.assign("/views/signin.html")
    }
    card5.innerHTML = "View Details";
    card2.appendChild(card5);

}

function createTile(data) {
    var stockName = data[0];
    data.splice(0,1);
    var start = document.getElementById("tilestart");
    var cardStart = document.createElement("div");
    cardStart.classList.add("card");
    cardStart.classList.add("text-center");
    cardStart.classList.add("shadow", "p-3", "mb-5", "bg-white", "rounded");
    start.appendChild(cardStart);

    var insert = document.createElement("canvas");
    insert.id = "chart";
    cardStart.appendChild(insert);
    console.log(insert);
    //var ctx = $("#myChart");
    var label = [];
    for(var i = 0; i < data.length; i++){
        label.push("");
    }
    var bgc = "";
    if(data[0]<data[data.length-1]){
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
                data: data,
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
        var x = document.cookie;
        document.cookie = "itemId=" + data.itemId + ";path=/;"
        console.log(x);
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
        httpDeleteAsync("/ciseSeniorProject/favorite/", requestObject, function(data) {
            if(data < 300) {
                alert("Stock " + stockName + " removed from favorites");
                window.location.assign("/views/favorites.html")
            } else {
                alert("Something went wrong");
            }
        });
    }
    card6.classList.add("btn");
    card6.classList.add("btn-outline-primary");
    card6.classList.add("stock-buttons");
    card6.innerHTML = "Remove";
    card2.appendChild(card6);

}

function isLoggedIn() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].toLowerCase();
        var value = cookies[i].split('=')[1].toLowerCase();
        if (name.indexOf("username") >=0 && value!="" && value!=" ") {
            username = value;
            console.log("Logged in");
            return true;
        }
    }
    console.log("Not logged in");
    return false;
}

function httpDeleteAsync(theUrl, requestObject, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        }
        else if(xmlHttp.readyState==4)
            callback(xmlHttp.status);
        
    }
    xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(requestObject));
}

