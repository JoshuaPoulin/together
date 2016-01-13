INSERT INTO
  users
VALUES
  (default, 'Josh', 'josh@josh.com', 'password'),
  (default, 'Frank', 'frank@frank.com', 'password'),
  (default, 'Mike', 'mike@mike.com', 'password'),
  (default, 'Tim', 'tim@tim.com', 'password'),
  (default, 'Sam', 'sam@sam.com', 'password'),
  (default, 'Chloe', 'chloe@chloe.com', 'password'),
  (default, 'Tara', 'tara@tara.com', 'password');

INSERT INTO
  meetups
VALUES
  (default, 'Star Wars Superfans', '1234 Pearl Street', 'Boulder, CO', '1452722199946', '7:00pm MST', 'Come talk the new movie or the older series.  Welcoming Star Wars fans of all ages.', 'http://bonnier.imgix.net/6810783-star-wars-logo-lqCJw2lYA-tuyHrcFQvPGQ.jpg'),
  (default, 'Code 4 Kids', '54321 Broadway', 'Boulder, CO','1452722199946', '2:00pm MST', 'Charity Event: all proceeds go to childrens foundations.', 'https://code.org/images/apple-touch-icon-precomposed.png'),
  (default, 'Music Lovers', '1254 Main Street', 'Denver, CO', '1452722199946', '5:00pm MST', 'Whatever your preference, come talk music with our group.', 'http://data.whicdn.com/images/41226032/original.jpg');

INSERT INTO
  attendees
VALUES
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'josh@josh.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com'), (SELECT id FROM meetups WHERE name = 'Star Wars Superfans')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com'), (SELECT id FROM meetups WHERE name = 'Code 4 Kids')),
  (default, (SELECT id FROM users WHERE email = 'frank@frank.com'), (SELECT id FROM meetups WHERE name = 'Music Lovers')),
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
