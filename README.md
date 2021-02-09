# Food Tracker
Food Tracker is a JavaScript application to save your food from waisting.

## Before You Start
This app requires a connection to a MySQL service. Follow the instructions on MySQL's official documentation specific to your system to install MySQL locally.  
After successfully installed MySQL, create database tables as follow

 - Create required tables, run MySQL statements below
   - CREATE DATABASE food_tracker;
   - CREATE TABLE food_tracker.users (
       email VARCHAR(50),
       password VARCHAR(200),
       PRIMARY KEY (email)
   );
   - CREATE TABLE food_tracker.items (
       id INT NOT NULL AUTO_INCREMENT,
       name VARCHAR(30), 
       quantity INT, 
       purchased_date VARCHAR(10), 
       expiry_date VARCHAR(10), 
       category VARCHAR(30),
       PRIMARY KEY (id)
   );


## Installation (Locally)
- Frontend

  `cd client`  
  `npm install`  
  to run  
  `npm start`

- Backend

  `cd server`  
  `npm install`  
  to run  
  `npm start`



## Usage