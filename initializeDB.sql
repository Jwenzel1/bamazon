DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(6) UNSIGNED AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price FLOAT(9, 2),
	stock_quantity int(3),
	PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Circle", "Shapes", 10.25, 83);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Triangle", "Shapes", 13.82, 126);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Square", "Shapes", 9.27, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Computer", "Technology", 200.65, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Camera", "Technology", 120.49, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Mouse", "Technology", 45.74, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Keyboard", "Technology", 98.61, 75);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Go-Kart", "Vehicles", 780.82, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Car", "Vehicles", 18256.10, 18);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("Batmobile", "Vehicles", 999999.95, 5);
