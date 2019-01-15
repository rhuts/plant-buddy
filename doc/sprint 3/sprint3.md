## Sprint 3 Meeting:

Date: Friday, March 16

Participants:

  - Andersen Chan
  - Eugene Au Yeung
  - Dean Wedgbury
  - Daniel Wang
  - Roman Huts
  - Dominik Loncar

## Overview:

We discussed what we wanted to accomplish during this sprint, broke down those things into tasks, and assigned each member to them.

## User stories chosen for Sprint 3:

We want to the product to be able to log values in the database, and have the web read this data and display it in a graph. We also want the user to be able to press a button on the website which will water the plant.

In particular, we plan to implement the following user stories (from PB.md):

- As a researcher, I want to store and retrieve relevant data on my plants so that I can keep track of growth of local flora and analyze their growth. [1/13]
- As a beginner, I want to see a history of the plants data over time, so that I have a better understanding of my plant's progress. [1/21]
- As a hobbyist, I want to be able to water my plant manually, with the press of a button on the web, so that i can control exactly when i water my plant. [1/8]

## Task breakdown of User Stories:

We broke the user stories into separate tasks and assigned them to each member:

1. As a researcher, I want to store and retrieve relevant data on my plants so that I can keep track of growth of local flora and analyze their growth. [1/13]

- Have the raspberryPi automatically connect to wifi wirelessly (Dominik)
- Have the Pi be able to interact with the Arduino (Dominik)
- Write a python script that will continuously get values from the Arduino and make requests to our web server (to store these values in the database) (Andy)
- Write endpoints in node.js to handle the Pi requests and update the history table in the database (Roman/Dean)

2. As a beginner, I want to see a history of the plants data over time, so that I have a better understanding of my plant's progress. [1/21]

- Make an endpoint in node.js that returns the table 'history' in the database (Eugene)
- Use a graphing library to graph the history table (Daniel) 


3. As a hobbyist, I want to be able to water my plant manually, with the press of a button on the web, so that i can control exactly when i water my plant. [1/8]

- Create buttons in html (which will be used to toggle the watering on and off) that, once clicked, make requests to node.js to set the database attribute 'doWater' to True or False (Eugene)
- Create an endpoint in node.js to retrieve the value of doWater (Roman/Dean)
- In the pi's python script, continually make requests to node.js to read the value of doWater. If true, send a signal to Arduino to water the plant. (Andy)

## Goals before Presentation:
Complete the extra hardware features such as Tracking Nutrition, Animal Deterrent, Indoor Light. Additionally, add in water reservoir and sunlight sensors. 
