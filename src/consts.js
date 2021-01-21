import {
  setEventID,
} from './utils/event';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const HOURS_IN_DAY = 24;

const TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

const SortType = {
  DAY: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const Mode = {
  DEFAULT: `DEFAULT`,
  EDIT: `EDIT`,
  NEW: `NEW`,
};

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const EVENT_BLANC = {
  id: setEventID(),
  type: `taxi`,
  destination: ``,
  description: ``,
  photos: [],
  startTime: Date.now(),
  endTime: Date.now() + 30000,
  isFavorite: false,
};

export {
  RenderPosition,
  SortType,
  FilterType,
  Mode,
  MINUTES_IN_HOUR,
  MINUTES_IN_DAY,
  HOURS_IN_DAY,
  TYPES,
  UserAction,
  UpdateType,
  EVENT_BLANC,
};
