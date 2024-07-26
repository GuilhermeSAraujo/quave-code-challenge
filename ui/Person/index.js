import { Meteor } from 'meteor/meteor';
import React, { useCallback, useMemo } from 'react';

export function Person({ person }) {
  const handleStateChange = useCallback(async () => {
    if (!person.checkInDate) {
      await Meteor.callAsync('people.checkIn', person._id);
      return;
    }

    if (person.checkInDate && !person.checkOutDate) {
      await Meteor.call('people.checkOut', person._id);
    }
  }, [person._id, person.checkInDate, person.checkOutDate]);

  const isPersonOut = useMemo(
    () => Boolean(person.checkInDate) && Boolean(person.checkOutDate),
    [person.checkInDate, person.checkOutDate]
  );

  return (
    <div
      key={person._id}
      className="mb-5 flex flex-col gap-2 rounded-lg border border-gray-200 p-3 pt-3 shadow hover:bg-gray-100"
    >
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div>
          <div className="tracking-tighter text-gray-500 dark:text-gray-400">
            Name:
          </div>
          <div>
            {person.firstName} {person.lastName}
          </div>
        </div>
        {/* TODO: Format date removing seconds* */}
        <div>
          <div className="tracking-tighter text-gray-500 dark:text-gray-400">
            Check-in
          </div>
          <div>
            {person.checkInDate ? person.checkInDate.toLocaleString() : 'N/A'}
          </div>
        </div>
        <div>
          <div className="tracking-tighter text-gray-500 dark:text-gray-400">
            Check-out
          </div>
          <div>
            {person.checkOutDate ? person.checkOutDate.toLocaleString() : 'N/A'}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-8">
        {person.companyName && (
          <div>
            <div className="tracking-tighter text-gray-500 dark:text-gray-400">
              Company name
            </div>
            <div>{person.companyName}</div>
          </div>
        )}
        {person.title && (
          <div>
            <div className="tracking-tighter text-gray-500 dark:text-gray-400">
              Title
            </div>
            <div>{person.title}</div>
          </div>
        )}
        {isPersonOut ? (
          <button
            disabled
            className="ml-auto w-full rounded-lg bg-blue-200 px-2 py-1 text-xs font-bold text-white md:w-48"
          >
            Checked-out {`${person.firstName} ${person.lastName}`}
          </button>
        ) : (
          <button
            className="ml-auto w-full rounded-lg bg-blue-500 px-2 py-1 text-xs font-bold text-white hover:bg-blue-800 md:w-48"
            onClick={handleStateChange}
          >
            {!person.checkInDate ? 'Check-in' : 'Check-out'}{' '}
            {`${person.firstName} ${person.lastName}`}
          </button>
        )}
      </div>
    </div>
  );
}
