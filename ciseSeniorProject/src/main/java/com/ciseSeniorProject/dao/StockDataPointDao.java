package com.ciseSeniorProject.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

import com.ciseSeniorProject.model.StockDataPoint;
import com.ciseSeniorProject.model.mapper.StockDataPointMapper;
import com.ciseSeniorProject.queryMaker.StockDataQueryMaker;

public class StockDataPointDao extends ADao {
	
	private static final StockDataQueryMaker QUERY_MAKER = new StockDataQueryMaker();
	
	private JdbcTemplate template;
	
	private StockDataPointDao() { 
		this.template = new JdbcTemplate(getDataSource());
	}
	
	public static StockDataPointDao newStockDataPointDao() {
		return new StockDataPointDao();
	}
	
	public void addStockData(final String additionDate, final String tickerSymbol,
			final List<String> stockData) {
		template.execute(QUERY_MAKER.makeAddStockDataQuery(additionDate, tickerSymbol,
				stockData));
	}
	
	public Collection<StockDataPoint> getStockDataPoints(final String additionDate, 
				final String tickerSymbol) {
		return template.query(QUERY_MAKER.makeGetStockDataQuery(additionDate, tickerSymbol), 
				new StockDataPointMapper());
	}
	
	public StockDataPoint getStockDataPoint(final String additionDate, final String tickerSymbol,
			final int day) {
		List<StockDataPoint> stockData = template.query(QUERY_MAKER.makeGetStockDataQuery(additionDate, 
				tickerSymbol, day), new StockDataPointMapper());
		if(!stockData.isEmpty()) {
			return stockData.get(0);
		} else {
			return new StockDataPoint(additionDate, tickerSymbol, day, "0");
		}
	}

	public void removeStockData(final String tickerSymbol) {
		template.execute(QUERY_MAKER.makeDeleteTickerDataQuery(tickerSymbol));
	}
	
}
