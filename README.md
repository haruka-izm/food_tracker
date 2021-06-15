# Food Tracker
Food Tracker is an application to save your food from going to waste.


# Features
 - Create, modify, and delete items
 - Get notifications by email when items are close to expiring

# Contents
 - [Before You Start](#BeforeYouStart)  
 - [Installation (Locally)](#Installation(Locally))
 - [Usage](#Usage)
   - [Sign Up](##Signup)
   - [Add Items](##Add-items)
   - [Modify Items](##Modify-items)



# Before You Start
This app requires a connection to a MySQL service. Follow the instructions on MySQL's official documentation specific to your system to install MySQL locally.  
After successfully installing MySQL, follow the instructions below.

 - For creating the required tables, run MySQL statements below
   - CREATE DATABASE food_tracker;
   - CREATE TABLE food_tracker.users (
     id INT NOT NULL AUTO_INCREMENT,
       email VARCHAR(50),
       username VARCHAR(50),
       password VARCHAR(200),
       household_id INT,
       email_notification VARCHAR(5) DEFAULT 'false',
       PRIMARY KEY (id)
   );
   - CREATE TABLE food_tracker.items (
       id INT NOT NULL AUTO_INCREMENT,
       name VARCHAR(30), 
       quantity INT, 
       purchased_date VARCHAR(10), 
       expiry_date VARCHAR(10), 
       category VARCHAR(30),
       user_id INT,
       household_id INT,
       PRIMARY KEY (id)
   );
  - CREATE TABLE food_tracker.households (
      id INT NOT NULL AUTO_INCREMENT,
      household_name VARCHAR(30),
      household_code VARCHAR(40),
      PRIMARY KEY (id)
  );

  - If you want e-mail notifications to be sent:
    - open .env file in the server folder
    - set MAIL_SENDER's value to a valid email account name
    - set MAIL_SENDER_PASSWORD's value to the password for the account above
    - set MAIL_SERVICE to the type of service for the provided account (e.g. "gmail", "outlook")
      

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