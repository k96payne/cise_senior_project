function httpGetAsync(theUrl, requestObject, callback) {
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


document.getElementById("sign-up").onclick = function () {
    console.log("tile clicked");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var url = "/myStocks-2.0.3.RELEASE/myStocks/users";
    var encrypted = CryptoJS.AES.encrypt(password, 'web-apps').toString();
    console.log(encrypted);

    var requestObject = {};
	requestObject.fname = fname;
	requestObject.lname = lname;
    requestObject.username = username;
    requestObject.password = encrypted;
	requestObject.email = email;

    httpGetAsync(url, requestObject,function(data){
        if(data >= 300){
            alert("Error occured, try again....");
        }
        else{
            document.cookie = "username=" + username + ";path=/;"
            window.location.assign("/myStocks-2.0.3.RELEASE/index.html")
        }
    });
}