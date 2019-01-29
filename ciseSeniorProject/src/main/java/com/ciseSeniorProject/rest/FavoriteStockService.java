package com.ciseSeniorProject.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ciseSeniorProject.dao.FavoriteStockDao;
import com.ciseSeniorProject.model.FavoriteStock;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;

@Service
public class FavoriteStockService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	private FavoriteStockDao favoriteStockDao = FavoriteStockDao.newFavoriteStockDao();
	
	@SneakyThrows
	public void addFavoriteStock(final String jsonBody) {
		FavoriteStock favoriteStock = mapper.readValue(jsonBody, FavoriteStock.class);
		favoriteStockDao.addFavoriteStock(favoriteStock.getUsername(), 
				favoriteStock.getTickerSymbol());
	}
	
	@SneakyThrows
	public void removeFavoriteStock(final String jsonBody) {
		FavoriteStock favoriteStock = mapper.readValue(jsonBody, FavoriteStock.class);
		favoriteStockDao.removeFavoriteStock(favoriteStock.getUsername(), 
				favoriteStock.getTickerSymbol());
	}

	@SneakyThrows
	public String getFavoriteStocks(final String username) {
		List<String> userStocks = new ArrayList<>();
		Collection<FavoriteStock> favoriteStocks = favoriteStockDao
				.getFavoriteStocksByUsername(username);
		for(FavoriteStock stock : favoriteStocks) {
			userStocks.add(stock.getTickerSymbol());
		}
		return mapper.writeValueAsString(userStocks);
	}

}
