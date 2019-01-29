var username = undefined;

if (!isLoggedIn()) 
    window.location.assign('/myStocks-2.0.3.RELEASE/views/signin.html');
else {
    document.getElementById("logged").innerHTML = "Log Out";
}

var favorites = document.getElementById("userFavorites");
favorites.style.display = "none";

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}

httpGetAsync("/myStocks-2.0.3.RELEASE/myStocks/users/" + username, function(data) {
    if(data.isAdmin != 1) {
        window.location.assign('/myStocks-2.0.3.RELEASE/index.html');
    }
});

document.getElementById("delete-account").onclick = function () {
    if(username != "root") {
        httpDeleteAsync("/myStocks-2.0.3.RELEASE/myStocks/users/" + username, function(data) {
            console.log(data);
                if (data >= 300) {
                    alert("Something went wrong, please try again");
                } else {
                    document.cookie="username=;path=/;"
                    window.location.assign("/myStocks-2.0.3.RELEASE/views/signin.html");
                }
        });
    }
    else {
        alert("Root admin cannot delete account");
    }
}

document.getElementById("delete").onclick = function () {
    var deletionUsername = document.getElementById("delete-username").value;
    httpDeleteAsync("/myStocks-2.0.3.RELEASE/myStocks/users/" + deletionUsername, function(data) {
        console.log(data);
            if (data >= 300) {
                alert("Something went wrong, please try again");
            } else {
                window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html")
            }
    });
}

document.getElementById("promote").onclick = function () {
    var promotionUsername = document.getElementById("promote-username").value;
    httpPutAsync("/myStocks-2.0.3.RELEASE/myStocks/users/promote/" + promotionUsername, function(data) {
        console.log(data);
            if (data >= 300) {
                alert("Something went wrong, please try again");
            } else {
                window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
            }
    });
}

document.getElementById("demote").onclick = function () {
    if(username == "root") {
        var demotionUsername = document.getElementById("demote-username").value;
        httpPutAsync("/myStocks-2.0.3.RELEASE/myStocks/users/demote/" + demotionUsername, function(data) {
            console.log(data);
                if (data >= 300) {
                    alert("Something went wrong, please try again");
                } else {
                    window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
                }
        });
    } 
    else {
        alert("Only the root admin can perform this operation");
        window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
    }
}

document.getElementById("favorites").onclick = function () {
    while (favorites.firstChild) {
        favorites.removeChild(favorites.firstChild);
    }

    var favoritesUsername = document.getElementById("get-favorites").value;
    httpGetAsync("/myStocks-2.0.3.RELEASE/myStocks/favorite/" + favoritesUsername, function(data) {
       for(var i = 0; i < data.length; i++) {
            var favorite = document.createElement("li");
            favorite.innerText = data[i];
            favorite.classList.add("list-group-item");
            favorites.appendChild(favorite);
       }
       if(data.length > 0) {
        favorites.style.display = "block";
       }
    });
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            let resultData = JSON.parse(xmlHttp.responseText);
            console.log(resultData, typeof (resultData));
            callback(resultData)
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPutAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
   // xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
}

function httpDeleteAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
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