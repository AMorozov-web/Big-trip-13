import {SortType} from '../consts';

const getSortedEvents = (events, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return events.slice().sort((a, b) => a.date - b.date);
    case SortType.TIME:
      return events.slice().sort((a, b) => a.startTime - b.startTime);
    case SortType.PRICE:
      return events.slice().sort((a, b) => a.price - b.price);
    default:
      return events;
  }
};

export {
  getSortedEvents,
};
