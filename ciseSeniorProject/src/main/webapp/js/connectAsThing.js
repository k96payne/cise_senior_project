var connected = undefined;


AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
});
getAWSCredentials();

// Initialize the Amazon Cognito credentials provider
function getAWSCredentials() {
    AWS.config.credentials.refresh(function(err) {
        if (err) console.log(err, err.stack); 
        else {                               
            onCredentialsAvailable(AWS.config.credentials);
        }
    });
}

function onCredentialsAvailable(creds) {
    var cid = clientId();
    console.log('ClientID = ' + cid);

    // create connection to IoT Broker
    mqttClient = createMQTTClient({
        regionName: REGION,
        accessKey: creds.accessKeyId,
        secretKey: creds.secretAccessKey,
        sessionToken: creds.sessionToken,
        endpoint: mqttEndpoint,
        clientId: cid
    });

    connect(mqttClient);

}

function connect(client) {
    // connect mqtt client
    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        timeout: 30,
        mqttVersion: 4
    });

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
}

function onConnect() {

    console.log("onConnect");
    mqttClient.subscribe(SubscribeTopic);
    document.getElementById("MQTTstatus").innerText = 'CONNECTED';
    document.getElementById("MQTTstatus").className = 'connected';
    //console.log(messageDataJSON);
    connected = true;
    if(retry == true) {
        message = new Paho.MQTT.Message(messageDataJSON);
        message.destinationName = '$aws/things/senior_thing/shadow/update';
        mqttClient.send(message);
    }
}

function sendData(){

}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        document.getElementById("MQTTstatus").innerText = 'CONNECTION LOST';
        document.getElementById("MQTTstatus").className = 'disconnected';
    }
}

// called when a message arrives
function onMessageArrived(message) {
    //console.log("onMessageArrived");
    console.log("onMessageArrived:" + message.payloadString);

    payload = JSON.parse(message.payloadString);
    console.log(payload);

    handleMessage(  // in updateDom.js
        JSON.stringify(
            payload.state.desired
        )
    );


} // close onMessageArrive

// generate a random UUID v4
function clientId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

