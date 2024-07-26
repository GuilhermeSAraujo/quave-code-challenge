import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { People } from '../../people/people';
import { useSelectEvent } from '../hooks/useSelectEventHook';

export function EventSummary() {
  const { selectedEvent } = useSelectEvent();

  const { checkedIn, notCheckedIn, peopleByCompany, loading } =
    useTracker(() => {
      const handle = Meteor.subscribe('people', selectedEvent);

      if (!handle.ready()) {
        return {
          checkedIn: 0,
          notCheckedIn: 0,
          peopleByCompany: {},
          loading: true,
        };
      }

      const people = People.find({}).fetch();

      const checkedInNumber = people.filter(
        (p) => p.checkInDate && !p.checkOutDate
      ).length;

      const notCheckedInNumber = people.filter((p) => !p.checkInDate).length;

      const peopleByCompanyChecked = people.reduce((accumulator, person) => {
        const { companyName, checkInDate, checkOutDate } = person;

        if (!companyName) {
          return accumulator;
        }

        const isPersonCheckedIn = checkInDate && !checkOutDate;

        if (isPersonCheckedIn) {
          accumulator[companyName] = (accumulator[companyName] || 0) + 1;
        }

        return accumulator;
      }, {});

      return {
        checkedIn: checkedInNumber,
        notCheckedIn: notCheckedInNumber,
        peopleByCompany: peopleByCompanyChecked,
        loading: false,
      };
    }, [selectedEvent]);

  if (!selectedEvent) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  function renderPeopleByCompany() {
    const numberOfCompanies = Object.keys(peopleByCompany).length;
    if (numberOfCompanies === 0) {
      return <span>No one is checked in</span>;
    }

    return Object.entries(peopleByCompany).map(([company, count], i) => {
      if (count > 0) {
        return (
          <span key={company}>
            {company} ({count}){i < numberOfCompanies - 1 ? ', ' : ''}
          </span>
        );
      }
      return null;
    });
  }

  return (
    <div className="mt-4">
      <p>
        <span className="font-semibold">People in the event right now: </span>
        {checkedIn}
      </p>
      <p>
        <span className="font-semibold">
          People by company in the event right now:{' '}
        </span>
        {renderPeopleByCompany()}
      </p>
      <p>
        <span className="font-semibold">People not checked in: </span>
        {notCheckedIn}
      </p>
    </div>
  );
}
