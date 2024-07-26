import React from 'react';
import { EventSelector } from './EventSelector';
import { EventSummary } from './EventSummary';
import { PeopleList } from './PeopleList';
import { SelectEventProvider } from './hooks/useSelectEventHook';

export const App = () => (
  <SelectEventProvider>
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-lg font-bold">Event Check-in</h1>
      <EventSelector />
      <EventSummary />
      <PeopleList />
    </div>
  </SelectEventProvider>
);
