# TeamPickledWatermelon

## Table of Contents

* [Overview](#Overview)
* [User Guide](#User-Guide)
* [Developer Guide](#Developer-Guide)
* [Contributors](#Contributors)

#### Repository link:

* [TeamPickledWatermelon](https://github.com/johnbigornia/TeamPickledWatermelon)

## Milestone Links

* [Week7](https://github.com/johnbigornia/TeamPickledWatermelon/projects/1)
* [Week9](https://github.com/johnbigornia/TeamPickledWatermelon/projects/3)
* [Week13](https://github.com/johnbigornia/TeamPickledWatermelon/projects/4)
* [Final Delivery](https://github.com/johnbigornia/TeamPickledWatermelon/projects/5)

## Overview

This is a team assignment in ICS414 to create an application variation of calendaring. The requirements will require RFC 5545 and 7986 format. The project also entails the export feature using the same RFC Format to a .ics file.

## Functionality checklist:
- [x] Version (section 3.7.4 of RFC 5545)
- [x] Classification (3.8.1.3). Note this is a way of users designating events as
- [x] public (default), private, or confidential.
- [x] Geographic Position (3.8.1.6)
- [x] Location (3.8.1.7) Note the difference between geo position and location
- [x] Priority (3.8.1.9)
- [x] Summary (3.8.1.12)
- [x] DTSTART (3.8.2.4)
- [x] DTEND (3.8.2.2)
- [ ] Time zone identifier (3.8.3.1)
- [x] RSVP (3.2.17)
- [x] Sent-by (3.2.18)
- [x] Resources (3.8.1.10)

With all the functionality we have so far, file successfully imports to google calendar. 

## User Guide

#### Current UI

Calendar directs user on what day it is. The idea was to highlight days of events but we did not get to that feature yet as there were other priorities. We are able to export multiple events.

![UI](images/UI)

#### Creating Events

Here is an example of two successful submissions of events after going through a few test cases. We will use these as examples for the export and import features.

![test1](images/test1)

![test2](images/test2)

#### Export

The .ics file from the collection of events.

![icsfile](images/icsfile)

#### Import

Importing the .ics file into google calendar.

![import](images/import)

The import is now displayed in the calendar.

![calendar](images/CalendarExample)

## Developers Guide

#### Installation
The first thing you will need to is install <a href="https://www.meteor.com/install">Meteor</a>. 

Clone or download the project to your local system to any desired directory. 

CD in the app directory within Calender_Project, run the following line in the command line to install meteor dependencies:
```
meteor npm install
```
Side note, to update your meteor dependencies us this: 
```
meteor npm update
```
To check if there are any outdated dependencies: 
```
meteor npm outdated
```
Run the following command to start the app:
```
meteor npm run start
```
It will look like or somewhat like this:

```
> meteor-application-template-react@ start /home/john/Desktop/ICS414/Calender_Project/app
> meteor --no-release-check --settings ../config/settings.development.json

[[[[[ ~/Desktop/ICS414/Calender_Project/app ]]]]]                               

=> Started proxy.                             
=> Started MongoDB.                                                             
   Building for web.browser                  -                                  
W20200304-16:16:22.691(-10)? (STDERR) Note: you are using a pure-JavaScript implementation of bcrypt.
W20200304-16:16:22.723(-10)? (STDERR) While this implementation will work correctly, it is known to be
W20200304-16:16:22.723(-10)? (STDERR) approximately three times slower than the native implementation.
W20200304-16:16:22.724(-10)? (STDERR) In order to use the native implementation instead, run
W20200304-16:16:22.724(-10)? (STDERR) 
W20200304-16:16:22.724(-10)? (STDERR)   meteor npm install --save bcrypt
W20200304-16:16:22.725(-10)? (STDERR) 
W20200304-16:16:22.725(-10)? (STDERR) in the root directory of your application.
I20200304-16:16:22.932(-10)? Creating the default user(s)
I20200304-16:16:22.933(-10)?   Creating user admin@foo.com.
I20200304-16:16:23.206(-10)?   Creating user john@foo.com.
I20200304-16:16:23.431(-10)? Creating default data.
I20200304-16:16:23.432(-10)?   Adding: Basket (john@foo.com)
I20200304-16:16:23.447(-10)?   Adding: Bicycle (john@foo.com)
I20200304-16:16:23.450(-10)?   Adding: Banana (admin@foo.com)
I20200304-16:16:23.452(-10)?   Adding: Boogie Board (admin@foo.com)
=> Started your app.

=> App running at: http://localhost:3000/
```

You will see the website running at <a href="localhost:3000">localhost:3000</a> 

#### Other Dependencies:

react-calendar
```
npm install react-calendar
```
Google Maps Places API
```
npm install --save react-google-places-autocomplete
```

## Contributors

* [Kenneth Yamaguchi](https://kyamagucuhm.github.io/)
* [John Bigornia](https://johnbigornia.github.io/)

