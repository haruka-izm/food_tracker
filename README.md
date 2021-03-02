# Food Tracker
Food Tracker is an application to save your food from waisting.


# Features
 - Create, modify, and delete items
 - Get notifications by email when items are expiring

# Contents
 - [Before You Start](#BeforeYouStart)  
 - [Installation (Locally)](#Installation(Locally))
 - [Usage](#Usage)
   - [Sign Up](##Signup)
   - [Add Items](##Add-items)
   - [Modify Items](##Modify-items)



# Before You Start
This app requires a connection to a MySQL service. Follow the instructions on MySQL's official documentation specific to your system to install MySQL locally.  
After successfully installed MySQL, follow the instruction below.

 - Create required tables, run MySQL statements below
   - CREATE DATABASE food_tracker;
   - CREATE TABLE food_tracker.users (
     id INT NOT NULL AUTO_INCREMENT,
       email VARCHAR(50),
       username VARCHAR(50),
       password VARCHAR(200),
       PRIMARY KEY (id)
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
  - If you want to send e-mail notifications, set up the requirements below
    - open .env file in the sever folder
    - replace the instructions with actual e-mail addresses and password
    - replace the MAIL_SERVICE to the one that your MAIL_SENDER's service such as 'gmail'. The default is 'outlook'.
      

# Installation (Locally)
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



# Usage
## Signup
![`signup demo`](./img/signup.gif)
## Add items
![`add an item demo`](./img/add_item.gif)

## Modify items
![`modify items`](./img/modify_item.gif)