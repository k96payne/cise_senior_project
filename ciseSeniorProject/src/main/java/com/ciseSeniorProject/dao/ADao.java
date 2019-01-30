package com.ciseSeniorProject.dao;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

public abstract class ADao {
	  
	  public ADao() {}
	  
	  public DriverManagerDataSource getDataSource() {
	    DriverManagerDataSource dataSource = new DriverManagerDataSource();
	    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
	    dataSource.setUrl("jdbc:mysql://mystocksinstance.cplsnpgvjcmw.us-east-1.rds.amazonaws.com:3306/mystocks");
	    dataSource.setUsername("root");
	    dataSource.setPassword("AmazonSqlPassword");
	    return dataSource;
	  }
}