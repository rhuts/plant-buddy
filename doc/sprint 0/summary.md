Project Objective: 

Our goal will be to create an Arduino-based automatic plant maintanence system.

In essence, we will be creating a device which will measure the moisture levels in the soil of a small indoor potted plant and releases a valve to water it based on the observed moisture level. Our device will connect to the database and compare its moisture level to the desired moisture level, and make a decision about whether to water the plant or not. If it cannot connect to WiFi, it will simply water the plant based at a certain time interval. This value will be stored locally.

On top of this, our device will also measure data such as temperature, sunlight levels, and humidity over time. It will keep track of this data about the plants as well as its own data (see below) in a database. This data will be used to determine when to water the plant as well as make suggestions to the user (for example, suggest the user to move the plant to an area with more sunlight if the detected sunlight levels are lower than the ideal sunlight levels needed for this specific plant type). We will also be able to present the data back to the User, and make graphs to help visualize the data. These graphs will be available on a website that the user can log into. 



Key Users:
- Beginners:
  These people want to start learning about plants and how to grow their own.
  
- Busy People:
  These people want to have plants within their household, but aren't always available to maintain them due to being busy or having to travel a lot.

- Elderly/Handicapped people:
  These people want to have plants within their household, but aren't always able to maintain them due to physical or mental limitations.
  
- Lazy People:
  These people want plants but don't want the hassle of having to care for them.
  
- Small Local Businesses (for decoration as an alternative to fake plants):
  These people want to make their business look better and more environmentally friendly, so instead of using fake plants, they use real plants, using this system to maintain them.
  
- Researchers or Educational Purposes:
  These people need particular data regarding the environment of the plant analyzed and graphed for evaluation. The plant buddy, will 
  complete these rudimentary steps, so that information can be evaluated immediately and is persistently updated. 
  

 
Principles: 
  - Plant health and data collection over power consumption and bandwidth usage.
  - Minimal users interaction over a highly customizable product (i.e. Our product should be plug-and-play).
  - Generalizability and stability over extra features for specific plants.
  - Availability and accesability over aesthetics.


Materials Needed:
- valve
- sunlight sensor
- humidity sensor
- moisture sensor
- temperature sensor
- arduino chip
- breadboard
- fertilized plants, ready to sprout. (Fertilized Soybeans)
- water tank
- casing
- LEDs (to signal different states such as on, off, and watering)

Extra Materials:
- Water level sensor
- WiFi module
- Light source (to be able to control how much light the plant is getting)

Technologies To be Used:
- SQL
- C (for arduino)
- PHP
- HTML/CSS
- Android (if extra feature is implemented)


Databases:
- Plants(plantid, plantType)
- OptimalValues(plantType, humidity, temperature, moisture, sunlight, wateringInterval, wateringAmount)
- ObservedValues(plantid, timeObserved, humidity, temperature, moisture, sunlight, timeSinceLastWater, age)
- Users(username, password)


Extra features (if time permits):
- Create a software component where users can view the same data as the website, but can also control the watering system remotely (i.e. manual watering).
- Play a sound to scare off animals such as birds or squirrels whenever they come near the plant.
- If we cannot connect to WiFi, continue storing observed values locally until it can connect and upload the data to the database.
- Measure plant nutrition. For example, measure nitrogen, phosphorus, and potassium levels in the plant.
- Add a light bulb to have control over how much light the plant is getting.





