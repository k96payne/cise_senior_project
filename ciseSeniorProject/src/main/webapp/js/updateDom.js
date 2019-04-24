function handleMessage(msg) {

    var result = JSON.parse(msg).stock;
    console.log("handleMessage:"  + result);

    switch(result) {
        case'Tesla': 
            goToDetails('TSLA');
            break;
        case 'Microsoft': 
            goToDetails('MSFT');
            break;
        case 'apple': 
            goToDetails('AAPL');
            break;
        case 'facebook': 
            goToDetails('FB');
            break;
        case 'amazon': 
            goToDetails('AMZN');
            break;
        case 'Netflix': 
            goToDetails('NFLX');
            break;
        case 'twitter': 
            goToDetails('TWTR');
            break;
        case 'Nvidia': 
            goToDetails('TSLA');
            break;
        case 'google': 
            goToDetails('GOOGL');
            break;
    }

}

function goToDetails(ticker) {
    console.log('goToDetails');
    document.cookie = "stockId=" + ticker +";path=/;"
    window.location.href = 'http://localhost:8080/ciseSeniorProject-2.0.3.RELEASE/views/details.html';

}
