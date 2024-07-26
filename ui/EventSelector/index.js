import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Communities } from '../../communities/communities';
import { useSelectEvent } from '../hooks/useSelectEventHook';

export function EventSelector() {
  const { selectedEvent, updateSelectedEvent } = useSelectEvent();

  const { communities, loading } = useTracker(() => {
    const data = { communities: [], loading: true };

    const handle = Meteor.subscribe('communities');

    if (handle.ready()) {
      data.communities = Communities.find({}).fetch();
      data.loading = false;
      return data;
    }

    return data;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <select
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        defaultValue={selectedEvent}
        onChange={updateSelectedEvent}
      >
        <option value={null}>Select an event</option>
        {communities.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
