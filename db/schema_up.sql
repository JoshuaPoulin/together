DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS meetups;
DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
  id serial primary key,
  display varchar(16),
  email varchar(50),
  password varchar(100)
);

CREATE TABLE meetups (
  id serial primary key,
  name varchar(50),
  streetadress varchar(50),
  cityState varchar(35),
  event numeric,
  time varchar(15),
  description text,
  image varchar(255)
);

CREATE TABLE attendees (
  id serial primary key,
  users_id numeric,
  meetups_id numeric
);

CREATE TABLE messages (
  id serial primary key,
  users_display varchar(16),
  meetups_id numeric,
  content text,
  posted numeric,
  url varchar(15)
);