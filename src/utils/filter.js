import {
  FilterType
} from '../consts';

const isDateInPast = (event) => Date.parse(event.endTime) - Date.now() < 0;
const isDateInFuture = (event) => Date.parse(event.startTime) - Date.now() >= 0;

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isDateInFuture(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isDateInPast(event)),
};

export {
  filter,
};
