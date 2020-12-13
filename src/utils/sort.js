import {SortType} from '../consts';
import {calcDuration} from './event';

const getSortedEvents = (events, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return events.slice().sort((a, b) => a.date - b.date);
    case SortType.TIME:
      return events.slice().sort((a, b) => calcDuration(a) - calcDuration(b));
    case SortType.PRICE:
      return events.slice().sort((a, b) => a.price - b.price);
    default:
      return events;
  }
};

export {
  getSortedEvents,
};

// This file will be deleted later
