package com.ciseSeniorProject.queryMaker;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FavoriteStockQueryMaker {
	
	public String makeAddFavoriteStockQuery(final String username, final String tickerSymbol) {
		return new StringBuilder("INSERT INTO favoriteStocks (username, tickerSymbol) VALUES (\"")
				.append(username).append("\",\"").append(tickerSymbol).append("\");").toString();
	}
	
	public String makeGetFavoriteStocksByUsernameQuery(final String username) {
		return new StringBuilder("SELECT * FROM favoriteStocks WHERE username = \"")
				.append(username).append("\";").toString();
	}
	
	public String makeRemoveFavoriteStockQuery(final String username, final String tickerSymbol) {
		return new StringBuilder("DELETE FROM favoriteStocks WHERE username = \"").append(username)
				.append("\" AND tickerSymbol = \"").append(tickerSymbol).append("\";")
				.toString();
	}
	
	public String makeRemoveAllUserFavoriteStocksQuery(final String username) {
		return new StringBuilder("DELETE FROM favoriteStocks WHERE username = \"").append(username)
				.append("\";").toString();
	}
	
}
