import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities';
import { loadInitialData } from '../infra/initial-data';
import { People } from '../people/people';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  Meteor.publish('communities', () => Communities.find({}));

  Meteor.publish('people', (communityId) => People.find({ communityId }));

  Meteor.methods({
    async 'people.checkIn'(personId) {
      await People.updateAsync(
        {
          _id: personId,
        },
        {
          $set: {
            checkInDate: new Date(),
            checkOutDate: null,
          },
        }
      );
    },
    async 'people.checkOut'(personId) {
      await People.updateAsync(
        {
          _id: personId,
        },
        {
          $set: {
            checkOutDate: new Date(),
          },
        }
      );
    },
  });
});
