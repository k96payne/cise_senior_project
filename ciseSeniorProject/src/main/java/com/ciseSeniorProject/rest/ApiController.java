package com.ciseSeniorProject.rest;

import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


@Controller
@Path("/stocks")
public class ApiController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	private ApiService apiService = new ApiService();

	public void init(final ServletConfig config) {
		 try{
			super.init(config);
			SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
			  config.getServletContext());
		  } catch (ServletException e) { }
	 }

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("")
	public String getStockData(@QueryParam("tickerSymbol") final 
			List<String> tickerSymbols, @DefaultValue("50") @QueryParam("datasetSize") 
			final int datasetSize) {
		return apiService.getStockValues(tickerSymbols, datasetSize);
	}
}
