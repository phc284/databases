DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int primary key auto_increment,
  USERS_ID int references users(id),
  message varchar(140),
  ROOM_ID int references rooms(id)

);

CREATE TABLE users (
  id int primary key auto_increment,
  username varchar(50)
);

CREATE TABLE rooms (
  id int primary key auto_increment,
  roomname varchar(50)
);
/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
