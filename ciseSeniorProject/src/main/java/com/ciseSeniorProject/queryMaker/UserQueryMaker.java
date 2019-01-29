package com.ciseSeniorProject.queryMaker;

import com.ciseSeniorProject.model.User;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserQueryMaker {
	
	public String makeGetUserByIdQuery(final int id) {
		return new StringBuilder("SELECT * FROM users WHERE id = ").append(id)
				.append(";").toString();
	}
	
	public String makeGetUserByUsernameQuery(final String username) {
		return new StringBuilder("SELECT * FROM users WHERE username = \"").append(username)
				.append("\";").toString();
	}
	
	public String makeCreateUserQuery(final User user) {
		return new StringBuilder("INSERT INTO users (fname, lname, username, password, "
				+ "email) VALUES (\"").append(user.getFname()).append("\",\"")
				.append(user.getLname()).append("\",\"").append(user.getUsername())
				.append("\",\"").append(user.getPassword()).append("\",\"")
				.append(user.getEmail()).append("\");").toString();
	}
	
	public String makeUpdateUserQuery(final User user) {
		return new StringBuilder("UPDATE users SET fname = \"").append(user.getFname())
				.append("\", lname = \"").append(user.getLname()).append("\", email = \"")
				.append(user.getEmail()).append("\", password = \"").append(user.getPassword())
				.append("\" WHERE username = \"").append(user.getUsername())
				.append("\";").toString();
	}
	
	public String makeDeleteUserQuery(final String username) {
		return new StringBuilder("DELETE FROM users WHERE username = \"").append(username)
				.append("\";").toString();
	}
	
	public String makePromoteUserQuery(final String username) {
		return new StringBuilder("UPDATE users SET isAdmin = 1 WHERE username = \"")
				.append(username).append("\";").toString();
	}
	
	public String makeDemoteUserQuery(final String username) {
		return new StringBuilder("UPDATE users SET isAdmin = 0 WHERE username = \"")
				.append(username).append("\";").toString();
	}
	
}
