import { Meteor } from 'meteor/meteor';
import React from 'react';

export function Person({ person }) {
  async function handleStateChange() {
    if (!person.checkInDate) {
      await Meteor.callAsync('people.checkIn', person._id);
      return;
    }

    if (person.checkInDate && !person.checkOutDate) {
      await Meteor.call('people.checkOut', person._id);
    }
  }

  return (
    <div key={person._id} className="flex items-center space-x-5 pt-3">
      <div>
        {person.firstName} {person.lastName}
      </div>
      {person.companyName && <div>{person.companyName}</div>}
      {person.title && <div>{person.title}</div>}
      {/* TODO: Format date removing seconds* */}
      <div>
        {person.checkInDate ? person.checkInDate.toLocaleString() : 'N/A'}
      </div>
      <div>
        {person.checkOutDate ? person.checkOutDate.toLocaleString() : 'N/A'}
      </div>
      {/* TODO: Add the verification for >5 seconds */}
      <button
        className="rounded-lg bg-gray-500 px-2 py-2 text-xs font-bold text-white"
        onClick={handleStateChange}
      >
        {!person.checkInDate ? 'Check-in' : 'Check-out'}{' '}
        {`${person.firstName} ${person.lastName}`}
      </button>
    </div>
  );
}
