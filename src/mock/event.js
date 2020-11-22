import dayjs from 'dayjs';

import {
  TYPES,
  DESTINATIONS,
  OFFER_TITLES,
  PLACEHOLDER_TEXT,
} from './consts';

import {
  getRandomInt,
  getRandomElement,
  getRandomArr,
} from '../utils/utils';

const createEventOffer = () => {
  return {
    title: getRandomElement(OFFER_TITLES),
    cost: getRandomInt(1, 10) * 10,
  };
};

const generateEventOffers = () => {
  const OFFERS_MIN_COUNT = 0;
  const OFFERS_MAX_COUNT = 5;

  const count = getRandomInt(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT);

  return new Array(count).fill().map(createEventOffer);
};

const generateDestinationText = () => {
  const placeholders = getRandomArr(Array.from(PLACEHOLDER_TEXT.split(`. `)));
  let description = ``;

  for (const fragment of placeholders) {
    description = description.concat(`${fragment}. `);
  }

  return description;
};

const generateDestinationPhotos = () => {
  const PHOTOS_MIN_COUNT = 0;
  const PHOTOS_MAX_COUNT = 5;

  const count = getRandomInt(PHOTOS_MIN_COUNT, PHOTOS_MAX_COUNT);

  return new Array(count).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const generateStartTime = () => {
  const maxDayGap = 7;
  const gap = getRandomInt(-maxDayGap, maxDayGap);

  return dayjs().add(gap, `day`).toDate();
};

const generateEndTime = (startTime) => {
  return dayjs(startTime).add(getRandomInt(3, 9) * 10, `minute`).toDate();
};

const generateEvent = () => {
  const date = generateStartTime();

  return {
    date,
    type: getRandomElement(TYPES),
    destination: getRandomElement(DESTINATIONS),
    startTime: date,
    endTime: generateEndTime(date),
    price: getRandomInt(1, 10) * 10,
    offers: generateEventOffers(),
    isFavorite: Boolean(getRandomInt()),
    description: generateDestinationText(),
    photos: generateDestinationPhotos(),
  };
};

export {
  generateEvent,
};
