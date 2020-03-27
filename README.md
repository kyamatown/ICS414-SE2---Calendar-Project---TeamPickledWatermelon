# TeamPickledWatermelon

### Installation
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

### Other Dependencies:

semantic-ui-calendar-react

```
npm i semantic-ui-calendar-react
```

