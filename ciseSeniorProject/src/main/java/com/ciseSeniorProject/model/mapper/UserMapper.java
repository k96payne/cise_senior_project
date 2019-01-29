package com.ciseSeniorProject.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ciseSeniorProject.model.User;

public class UserMapper implements RowMapper<User> {

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new User(rs.getInt("id"), rs.getInt("isAdmin"), rs.getString("password"), 
				rs.getString("fname"),rs.getString("lname"),rs.getString("username"),
				rs.getString("email"));
	}
	
}