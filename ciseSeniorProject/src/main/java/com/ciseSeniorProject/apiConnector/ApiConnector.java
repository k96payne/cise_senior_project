package com.ciseSeniorProject.apiConnector;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import com.ciseSeniorProject.dao.StockDataPointDao;

import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

@NoArgsConstructor
public class ApiConnector {

	private static final String	API_KEY_A = "3K9AH47QPYKMQPV4";
	private static final String API_KEY_B = "LCUE6AMSCU3NUHP5";
	private static final String API_KEY_C = "44BC2H6LCQ9EWIXV";
	private static final String API_KEY_D = "R576DTPMC8PKAHK8";
	private static final String API_KEY_E = "LGXCP4YQWZ6BIONM"; 
	
	private static final int 	DATABASE_FILL_SIZE = 100;
	
	private int requestNumber = 1;
	private StockDataPointDao stockDataPointDao = StockDataPointDao.newStockDataPointDao();
	
	@SneakyThrows
	public List<String> getStockData(final String tickerSymbol, final int datasetSize) {
		
		boolean databaseIsPopulated = true;
		String currentDate = getCurrentDate();
		
		if(stockDataPointDao.getStockDataPoints(currentDate, tickerSymbol).isEmpty()) {
			stockDataPointDao.removeStockData(tickerSymbol);
			databaseIsPopulated = attemptAddStockDataToDatabase(currentDate, tickerSymbol);
		}
		
		if(databaseIsPopulated) {
			List<String> stockData = new ArrayList<>();
			int day = 1;
			while(stockData.size() < datasetSize) {
				String value = stockDataPointDao.getStockDataPoint(currentDate, tickerSymbol, 
						day).getClosingValue();
				if(!value.equals("0")) {
					stockData.add(value);
				}
				day++;
			}
			return stockData;
		} else {
			return new ArrayList<>();
		}
	}
	
	private boolean attemptAddStockDataToDatabase(final String currentDate, final String tickerSymbol) {
		int tryCount = 1;
		while(tryCount <= 5) {
			try {
				HttpResponse response = executeApiRequest(tickerSymbol);
				JSONObject jsonResponse = new JSONObject(EntityUtils.toString(response.getEntity()));
				JSONObject data = (JSONObject) jsonResponse.get("Time Series (Daily)");
				populateDatabaseStockData(data, currentDate, tickerSymbol);
				return true;
			} catch (Exception e) {
				adjustRequestNumber();
				continue;
			}
		}
		return false;
	}
	
	private void populateDatabaseStockData(final JSONObject data, final String currentDate, 
			final String tickerSymbol) {
		int size = 0;
		int tries = 0;
		List<String> stockData = new ArrayList<>();
		String queryDate = currentDate;
		while(size < DATABASE_FILL_SIZE || tries < DATABASE_FILL_SIZE*2) {
			tries++;
			String value = getCloseValue(data, queryDate);
			if(!value.equals("NA")) {
				size++;
				stockData.add(value);
			}
			queryDate = subtractOneDay(queryDate);
		}
		stockDataPointDao.addStockData(currentDate, tickerSymbol, stockData);
	}
	
	@SneakyThrows
	private HttpResponse executeApiRequest(final String tickerSymbol) {
		HttpClient client = HttpClientBuilder.create().build();
		String url = "https://www.alphavantage.co/query?function="
				+ "TIME_SERIES_DAILY&symbol=" + tickerSymbol;
		
		if(requestNumber == 1) {
			url += "&apikey=" + API_KEY_A;
		} else if(requestNumber == 2) {
			url += "&apikey=" + API_KEY_B;
		} else if(requestNumber == 3) {
			url += "apikey=" + API_KEY_C;
		} else if(requestNumber == 4) {
			url += "&apikey=" + API_KEY_D;
		} else {
			url += "&apikey=" + API_KEY_E;
		}
		
		HttpGet request = new HttpGet(url);
		return client.execute(request);
	}
	
	private void adjustRequestNumber() {
		requestNumber = requestNumber % 5 + 1;
	}
	
	private String getCurrentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		return dateFormat.format(date);
	}
	
	private String getCloseValue(JSONObject data, String date) {
		try {
			JSONObject dateData = (JSONObject) data.get(date);
			String value = dateData.get("4. close").toString();
			return value;
		} catch (Exception e) {
			return "NA";
		}
	}
	
	private String subtractOneDay(String date) {
	    return LocalDate
	      .parse(date)
	      .plusDays(-1)
	      .toString();
	}
	
}
