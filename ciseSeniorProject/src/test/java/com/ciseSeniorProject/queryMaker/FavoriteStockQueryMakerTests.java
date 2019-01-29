package com.ciseSeniorProject.queryMaker;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.ciseSeniorProject.queryMaker.FavoriteStockQueryMaker;
import com.google.common.collect.Lists;


public class FavoriteStockQueryMakerTests {
	
	private FavoriteStockQueryMaker queryMaker;
	
	@Before
	public void init() {
		queryMaker = new FavoriteStockQueryMaker();
	}

	@Test
	public void testAddFavoriteStockQUery() {
		assertEquals("INSERT INTO favoriteStocks (username, tickerSymbol) VALUES "
				+ "(\"user\",\"TICKER\");", queryMaker.makeAddFavoriteStockQuery
				("user", "TICKER"));
		
	}
	
	@Test
	public void testGetFavoriteStockQuery() {
		assertEquals("SELECT * FROM favoriteStocks WHERE username = \"user\";", queryMaker
				.makeGetFavoriteStocksByUsernameQuery("user"));
	}
	
	@Test
	public void testDeleteTickerDataQuery() {
		assertEquals("DELETE FROM favoriteStocks WHERE username = \"user\" AND "
				+ "tickerSymbol = \"TICKER\";", queryMaker.makeRemoveFavoriteStockQuery
				("user", "TICKER"));
	}

	
}
