import React, { useState } from 'react';
import { EventSelector } from './EventSelector';
import { PeopleList } from './PeopleList';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleEventChange(event) {
    setSelectedEvent(event.target.value);
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-lg font-bold">Event Check-in</h1>
      <EventSelector
        // maybe create a context
        selectedEvent={selectedEvent}
        handleEventChange={handleEventChange}
      />
      <PeopleList selectedEvent={selectedEvent} />
    </div>
  );
};
