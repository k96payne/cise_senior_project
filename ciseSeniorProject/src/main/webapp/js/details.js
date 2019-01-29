function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            callback(resultData);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
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
    console.log(JSON.stringify(requestObject));
    xmlHttp.send(JSON.stringify(requestObject));
}

var username = undefined;
var stockName = undefined;

if (!isLoggedIn()) 
    window.location.assign('/myStocks-2.0.3.RELEASE/views/signin.html');
else {
    document.getElementById("logged").innerHTML = "Log Out";
}

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}


//this function is used to fetch the ticker value of the requested stock
function getStockId() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].toLowerCase();
        var value = cookies[i].split('=')[1].toLowerCase();
        if (name.indexOf("stock") >= 0 && value != "" && value != " ") {
            console.log(value);
            return value.toUpperCase();
        }
    }
    console.log("Item not found");
    return null;
}

stockName = getStockId();

function generateStockQueries() {
	var queryString = "/myStocks-2.0.3.RELEASE/myStocks/stocks?datasetSize=99";
		queryString += "&tickerSymbol=" + stockName;
	return queryString;
}

function populateDOM(data, pts) {
        var start = document.getElementById("myparent");
        var tileStart = document.createElement("div");
        tileStart.classList.add("card-deck");
        tileStart.id = "tilestart";
        start.appendChild(tileStart);
            createTile(data,pts);
}

function clearGraph(){
    var x = document.getElementById("myparent");
    x.innerHTML = "";
}

function createTile(data, pts){
    data = data.slice(0, pts);
    var start = document.getElementById("tilestart");
    var cardStart = document.createElement("div");
    cardStart.id = "start";
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
        console.log(data);
        document.cookie = "stockId=" + stockName + ";path=/;";
        console.log(document.cookie);
            window.location.assign("/myStocks-2.0.3.RELEASE")
    }
    card5.classList.add("btn");
    card5.classList.add("btn-outline-primary");
    card5.classList.add("stock-buttons");
    card5.innerHTML = "Go back";
    card2.appendChild(card5);

    var card6 = document.createElement("a");
    card6.onclick = function () {
        var requestObject = {};
        requestObject.username = username;
	    requestObject.tickerSymbol = stockName;
        
        httpPostAsync("/myStocks-2.0.3.RELEASE/myStocks/favorite", requestObject, function(data) {
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

    var card7 = document.createElement("a");
    card7.onclick = function () {
        event.preventDefault();
        clearGraph();
        populateDOM(stockData, 5);
    }
    
    card7.classList.add("btn");
    card7.classList.add("btn-outline-primary");
    card7.id = "data-buttons";
    card7.innerHTML = "Last 5 Days";
    card2.appendChild(card7);

    var card8 = document.createElement("a");
    card8.onclick = function () {
        clearGraph();
        populateDOM(stockData, 50);
    }
    card8.classList.add("btn");
    card8.classList.add("btn-outline-primary");
    card8.id = "data-buttons";
    card8.innerHTML = "Last 50 Days";
    card2.appendChild(card8);

    var card9 = document.createElement("a");
    card9.onclick = function () {
        clearGraph();
        populateDOM(stockData, 100);
    }
    card9.classList.add("btn");
    card9.classList.add("btn-outline-primary");
    card9.id = "data-buttons";
    card9.innerHTML = "Last 100 Days";
    card2.appendChild(card9);

}

httpGetAsync(generateStockQueries(), function (data) {
    stockData=data[0];
    stockData.splice(0,1);
    console.log(stockData);
    populateDOM(stockData,50);
});




// httpGetAsync("/myStocks-2.0.3.RELEASE/store/items", function (data) {
//     var itemId = getItemId();
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].itemId == itemId) {
//             item = data[i];
//             console.log(item);
//             var start = document.getElementById("myparent");
//             var child1 = document.createElement("div");
//             child1.classList.add("text-center");
//             start.appendChild(child1);
//             var title = document.createElement("h1");
//             title.classList.add("bold");
//             title.classList.add("text-dark");
//             title.innerHTML = item.name;
//             child1.appendChild(title);
//             var desc = document.createElement("h3");
//             desc.classList.add("italic");
//             desc.innerHTML= item.shortDescription;
//             child1.appendChild(desc);
//             var details = document.createElement("p");
//             details.innerHTML= "Brand: " + item.brandName + "<br>Size: " + item.size + "<br>Color: " + item.color + "<br>Gender: " + item.gender;
//             child1.appendChild(details);
//             var price = document.createElement("p");
//             price.classList.add("italic");
//             price.innerHTML = "Price: <b><em>$ " + item.msrp + "</em></b>";
//             child1.appendChild(price);
//             var sale = document.createElement("h2");
//             sale.id = "sale";
//             sale.innerHTML = "SALE: $" + item.salePrice; 
//             child1.appendChild(sale);

//             var card5 = document.createElement("a");
//             card5.onclick = function () {
//                 if(isLoggedIn()){
//                     var url = '/myStocks-2.0.3.RELEASE/store/carts?productId='+ item.itemId +'&username=' + username;
//                     httpPostAsync(url, function(data){});


//                     window.location.assign("/myStocks-2.0.3.RELEASE/")
//                 }
//                 else window.location.assign("/myStocks-2.0.3.RELEASE/views/signin.html")
//             }
//             card5.classList.add("btn");
//             card5.classList.add("btn-primary");
//             card5.innerHTML = "<b>Add to cart</b>";
//             child1.appendChild(card5);

//             var card6 = document.createElement("a");
//             card6.onclick = function () {
//                     window.location.assign("/myStocks-2.0.3.RELEASE/#")
//             }
//             card6.classList.add("btn");
//             card6.classList.add("btn-primary");
//             card6.innerHTML = "<b>Go back</b>";
//             child1.appendChild(card6);

//         }
//     }
// });

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