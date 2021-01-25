const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const HOURS_IN_DAY = 24;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic um8WmpRDxYd3aPX70L`;

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
  AFTER_END: `afterend`,
  BEFORE_BEGIN: `beforebegin`,
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
  DELETE_POINT: `DELETE_POINT`,
};

const UpdateType = {
  INIT: `INIT`,
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
};

const EVENT_BLANK = {
  type: `taxi`,
  destination: `Rome`,
  description: ``,
  photos: [],
  offers: [],
  price: 0,
  startTime: Date.now(),
  endTime: Date.now() + 30000,
  isFavorite: false,
};

const BAR_HEIGHT = 55;

const StatsTypes = {
  MONEY: `MONEY`,
  TYPE: `TYPE`,
  TIME_SPEND: `TIME-SPEND`,
};

const MenuItemsName = {
  TABLE: `table`,
  STATS: `stats`,
};

const ApiMethods = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
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
  EVENT_BLANK,
  BAR_HEIGHT,
  StatsTypes,
  MenuItemsName,
  ApiMethods,
  SuccessHTTPStatusRange,
  END_POINT,
  AUTHORIZATION,
};
