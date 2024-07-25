import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { People } from '../../people/people';
import { Person } from '../Person';

export function PeopleList({ selectedEvent }) {
  const { people, loading } = useTracker(() => {
    // applying filter on the server side
    const handle = Meteor.subscribe('people', selectedEvent);

    if (handle.ready()) {
      const p = People.find({}).fetch();
      return { people: p, loading: false };
    }

    return { people: [], loading: true };
  }, [selectedEvent]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto pt-2">
      {people && people.map((p) => <Person key={p._id} person={p} />)}
    </div>
  );
}
