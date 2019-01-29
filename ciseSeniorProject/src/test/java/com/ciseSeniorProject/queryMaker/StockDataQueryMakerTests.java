package com.ciseSeniorProject.queryMaker;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.ciseSeniorProject.queryMaker.StockDataQueryMaker;
import com.google.common.collect.Lists;


public class StockDataQueryMakerTests {
	
	private StockDataQueryMaker queryMaker;
	
	@Before
	public void init() {
		queryMaker = new StockDataQueryMaker();
	}

	@Test
	public void testAddStockDataQuery() {
		assertEquals("INSERT INTO stockData (additionDate, tickerSymbol, day, closingValue) VALUES ("
				+ "\"1-1-1\",\"TICK\",1,\"1\"), (\"1-1-1\",\"TICK\",2,\"2\");", queryMaker
				.makeAddStockDataQuery("1-1-1", "TICK", Lists.newArrayList("1", "2")));
		
	}
	
	@Test
	public void testGetStockDataQuery() {
		assertEquals("SELECT * FROM stockData WHERE additionDate = \"1-1-1\" AND tickerSymbol = \""
				+ "TICKER\";", queryMaker.makeGetStockDataQuery("1-1-1", "TICKER"));
	}
	
	@Test
	public void testDeleteTickerDataQuery() {
		assertEquals("DELETE FROM stockData WHERE tickerSymbol = \"TICKER\";", queryMaker
				.makeDeleteTickerDataQuery("TICKER"));
	}
	
	@Test
	public void testGetStockDataQueryWithAdditionDate() {
		assertEquals("SELECT * FROM stockData WHERE additionDate = \"1-1-1\" AND tickerSymbol = "
				+ "\"TICKER\" AND day = 1;", queryMaker
				.makeGetStockDataQuery("1-1-1", "TICKER", 1));
		
	}
	
}
