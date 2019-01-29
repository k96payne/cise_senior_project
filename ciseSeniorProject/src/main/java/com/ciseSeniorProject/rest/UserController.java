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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;


@Controller
@Path("/users")
public class UserController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	private UserService userService = new UserService();

	public void init(final ServletConfig config) {
		 try{
			super.init(config);
			SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
			  config.getServletContext());
		  } catch (ServletException e) { }
	 }

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{username}")
	public String lookupUserByUsername(@PathParam("username") final String username) {
		return userService.getUserByUsername(username);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void updateUser(final String jsonBody) {
		userService.updateUser(jsonBody);
	}
	
	@DELETE
	@Path("/{username}")
	public void deleteUser(@PathParam("username") final String username) {
		userService.deleteUser(username);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void createUser(final String jsonBody) {
		userService.createUser(jsonBody);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/validate")
	public String validateUser(@QueryParam("username") final String username, 
			@QueryParam("password") final String password) {
		return userService.validateUser(username, password);
	}
	
	@PUT
	@Path("/promote/{username}")
	public void promoteUser(@PathParam("username") final String username) {
		userService.promoteUser(username);
	}
	
	@PUT
	@Path("/demote/{username}")
	public void demoteUser(@PathParam("username") final String username) {
		userService.demoteUser(username);
	}
	
}	
