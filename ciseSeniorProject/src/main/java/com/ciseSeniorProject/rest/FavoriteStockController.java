package com.ciseSeniorProject.rest;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@Controller
@Path("/favorite")
public class FavoriteStockController extends HttpServlet {
	
private static final long serialVersionUID = 1L;
	
	private FavoriteStockService favoriteStockService = new FavoriteStockService();

	public void init(final ServletConfig config) {
		 try{
			super.init(config);
			SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
			  config.getServletContext());
		  } catch (ServletException e) { }
	 }
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void addFavoriteStock(final String jsonBody) {
		favoriteStockService.addFavoriteStock(jsonBody);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{username}")
	public String getFavoriteStocks(@PathParam("username") final String username) {
		return favoriteStockService.getFavoriteStocks(username);
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void removeFromFavoriteStocks(final String jsonBody) {
		favoriteStockService.removeFavoriteStock(jsonBody);
	}
}
