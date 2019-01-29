SHOW TABLES;
DROP TABLE IF EXISTS users, favoriteStocks, stockData;
SHOW TABLES;
CREATE TABLE users(id SERIAL PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), isAdmin BIT NOT NULL DEFAULT 0, UNIQUE(id, username));
CREATE TABLE favoriteStocks(username VARCHAR(255), tickerSymbol VARCHAR(255));
CREATE TABLE stockData(additionDate VARCHAR(255), tickerSymbol VARCHAR(255), day INT, closingValue VARCHAR(255));
SHOW TABLES;