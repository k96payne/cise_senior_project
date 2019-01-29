package com.ciseSeniorProject.dao;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

public abstract class ADao {
	
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_USERNAME = "springuser";
	private static final String DB_PASSWORD = "ThePassword";
	private static final String URL = "jdbc:mysql://localhost:3306/ciseSeniorProject?useSSL="
			+ "false&allowPublicKeyRetrieval=true";
	
	public DriverManagerDataSource getDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(DRIVER_CLASS_NAME);
		dataSource.setUrl(URL);
		dataSource.setUsername(DB_USERNAME);
		dataSource.setPassword(DB_PASSWORD);
		return dataSource;
//		DriverManagerDataSource dataSource = new DriverManagerDataSource();
//		dataSource.setDriverClassName(DRIVER_CLASS_NAME);
//		dataSource.setUrl(System.getenv("JDBC_DATABASE_URL"));
//		dataSource.setUsername(System.getenv("JDBC_DATABASE_USERNAME"));
//		dataSource.setPassword(System.getenv("JDBC_DATABASE_PASSWORD"));
//		return dataSource;
	}

}
