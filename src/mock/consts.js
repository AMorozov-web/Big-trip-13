const TOTAL_EVENTS_COUNT = 27;
const OFFERS_MIN_COUNT = 0;
const OFFERS_MAX_COUNT = 5;
const PHOTOS_MIN_COUNT = 0;
const PHOTOS_MAX_COUNT = 5;
const MAX_DAY_GAP = 7;

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

const DESTINATIONS = [
  `Chamonix`,
  `Geneva`,
  `Amsterdam`,
  `Barcelona`,
  `Venice`,
  `Rome`,
  `Omsk`,
];

const OFFER_TITLES = [
  `Add luggage`,
  `Switch to comfort`,
  `Add meal`,
  `Choose seats`,
  `Order Uber`,
  `Rent a car`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`,
];

const PLACEHOLDER_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta
  ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae,
  sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus`;

export {
  TYPES,
  DESTINATIONS,
  OFFER_TITLES,
  PLACEHOLDER_TEXT,
  OFFERS_MIN_COUNT,
  OFFERS_MAX_COUNT,
  PHOTOS_MIN_COUNT,
  PHOTOS_MAX_COUNT,
  MAX_DAY_GAP,
  TOTAL_EVENTS_COUNT,
};
