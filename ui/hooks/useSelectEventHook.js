import React, { createContext, useContext, useMemo, useState } from 'react';

const SelectEvent = createContext(null);

export function SelectEventProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  function updateSelectedEvent(e) {
    setSelectedEvent(e.target.value);
  }

  const contextValue = useMemo(
    () => ({
      selectedEvent,
      updateSelectedEvent,
    }),
    [selectedEvent]
  );

  return (
    <SelectEvent.Provider value={contextValue}>{children}</SelectEvent.Provider>
  );
}

export function useSelectEvent() {
  const ctx = useContext(SelectEvent);

  if (!ctx) {
    throw new Error('useSelectEvent must be used within a SelectEventProvider');
  }

  return ctx;
}
