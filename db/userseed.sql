INSERT INTO
  users
VALUES
  (default, 'josh@josh.com', 'password'),
  (default, 'frank@frank.com', 'password'),
  (default, 'mike@mike.com', 'password'),
  (default, 'tim@tim.com', 'password'),
  (default, 'sam@sam.com', 'password'),
  (default, 'chloe@chloe.com', 'password'),
  (default, 'tara@tara.com', 'password');

INSERT INTO
  meetups
VALUES
  (default, 'Star Wars Superfans', '1234 Pearl Street', 'Boulder, CO', '2016-01-25', '7:00pm MST', 'Come talk the new movie or the older series.  Welcoming Star Wars fans of all ages.', 'http://bonnier.imgix.net/6810783-star-wars-logo-lqCJw2lYA-tuyHrcFQvPGQ.jpg'),
  (default, 'Code 4 Kids', '54321 Broadway', 'Boulder, CO','2016-01-23', '2:00pm MST', 'Charity Event: all proceeds go to childrens foundations.', 'https://code.org/images/apple-touch-icon-precomposed.png'),
  (default, 'Music Lovers', '1254 Main Street', 'Denver, CO', '2016-01-27', '5:00pm MST', 'Whatever your preference, come talk music with our group.', 'http://data.whicdn.com/images/41226032/original.jpg');

INSERT INTO
  attendees
VALUES
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'mike@mike.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'mike@mike.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'tim@tim.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'tim@tim.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'sam@sam.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'sam@sam.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'chloe@chloe.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'chloe@chloe.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'tara@tara.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'tara@tara.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'tara@tara.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers'));