DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS optimal;
DROP TABLE IF EXISTS manualWater;
DROP TABLE IF EXISTS plant;

/* Table of all website users */
CREATE TABLE user (
	username VARCHAR(50) PRIMARY KEY,
	password VARCHAR(50),
	name VARCHAR(50)
);

/* Table of all plants a user owns */
CREATE TABLE owner (
	plantID INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES plant(plantID),
	username VARCHAR(50) REFERENCES user(username)
);

/* Table of all plant types */
CREATE TABLE plant (
	plantID INTEGER PRIMARY KEY,
	plantType VARCHAR(50),
	plantName VARCHAR(50)
);

/* Table of the history of each plant */
CREATE TABLE history (
	plantID INTEGER,
	recordDate DATE,
	moisture INT,
	humidity INT,
	temp INT,
	PRIMARY KEY(plantID, recordDate)
);

/* Table of all the target values of a plants levels */
CREATE TABLE optimal (
	plantType VARCHAR(50) PRIMARY KEY,
	optMoisture INT,
	optHumidity INT,
	optTemp INT

);

/* Table that signals manual watering */
CREATE TABLE manualWater (
	plantID INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES plant(plantID),
	doWater BOOLEAN
);

-- INSERT Values for DEMO

INSERT INTO user(username, password, name) VALUES ("a", "a", "a");

INSERT INTO owner(plantID, username) VALUES (1, "a");
INSERT INTO owner(plantID, username) VALUES (2, "a");
INSERT INTO owner(plantID, username) VALUES (3, "a");
INSERT INTO owner(plantID, username) VALUES (4, "a");

INSERT INTO plant(plantID, plantType, plantName) VALUES (1, "Succulent", "Hedgehog Aloe");
INSERT INTO plant(plantID, plantType, plantName) VALUES (2, "Succulent", "Snake Plant");
INSERT INTO plant(plantID, plantType, plantName) VALUES (3, "Rose", "Red Rose");
INSERT INTO plant(plantID, plantType, plantName) VALUES (4, "Fern", "Ostrich Fern");
