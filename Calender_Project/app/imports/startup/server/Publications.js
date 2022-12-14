import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { CalEvent } from '../../api/stuff/CalEvents';
import { Stuffs } from '../../api/stuff/Stuff';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

Meteor.publish('CalEvents', function publish() {
    if (this.userId) {
        const username = Meteor.users.findOne(this.userId).username;
        return CalEvent.find({ owner: username });
    }
    return this.ready();
});

Meteor.publish('AllEvents', function publish() {
    return CalEvent.find()
});
