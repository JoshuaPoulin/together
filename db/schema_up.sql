DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS meetups;
DROP TABLE IF EXISTS attendees;

CREATE TABLE users (
  id serial primary key,
  email varchar(50),
  password varchar(100)
);

CREATE TABLE meetups (
  id serial primary key,
  name varchar(50),
  streetAdress varchar(50),
  cityState varchar(35),
  event date,
  time varchar(15),
  description text,
  image varchar(255)
);

CREATE TABLE attendees (
  id serial primary key,
  users_id numeric,
  meetups_id numeric
);