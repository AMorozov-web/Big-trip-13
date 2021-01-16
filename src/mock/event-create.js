import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

import {
  TYPES,
  DESTINATIONS,
  OFFER_TITLES,
  PLACEHOLDER_TEXT,
  OFFERS_MIN_COUNT,
  OFFERS_MAX_COUNT,
  PHOTOS_MIN_COUNT,
  PHOTOS_MAX_COUNT,
  MAX_DAY_GAP,
} from './consts';

import {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  shuffleArr,
} from '../utils/common';

const createEventOffer = (randomTitle) => {
  return {
    title: randomTitle,
    cost: getRandomInt(1, 10, 10),
  };
};

const generateEventOffers = () => {
  const count = getRandomInt(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT);
  const offerRandomTitles = shuffleArr(OFFER_TITLES).slice(0, count);
  const offers = [];

  offerRandomTitles.forEach((element) => {
    offers.push(createEventOffer(element));
  });

  return offers;
};

const generateDestinationText = () => {
  const placeholders = getRandomArr(Array.from(PLACEHOLDER_TEXT.split(`. `)));
  let description = ``;

  for (const fragment of placeholders) {
    description = description.concat(`${fragment}. `);
  }

  return description;
};

const getPhotoUrl = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getPhotoAlt = () => getRandomElement(PLACEHOLDER_TEXT.split(` `));

const getPhoto = () => {
  return {
    src: getPhotoUrl(),
    description: getPhotoAlt(),
  };
};

const generateDestinationPhotos = () => {
  const count = getRandomInt(PHOTOS_MIN_COUNT, PHOTOS_MAX_COUNT);

  return new Array(count).fill().map(() => getPhoto());
};

const generateStartTime = () => {
  const gap = getRandomInt(-MAX_DAY_GAP, MAX_DAY_GAP);

  return dayjs().add(gap, `day`).toDate();
};

const generateEndTime = (startTime) => dayjs(startTime).add(getRandomInt(3, 9, 10), `minute`).toDate();

const generateEvent = () => {
  const date = generateStartTime();

  return {
    date,
    id: nanoid(),
    type: getRandomElement(TYPES),
    destination: getRandomElement(DESTINATIONS),
    startTime: date,
    endTime: generateEndTime(date),
    price: getRandomInt(1, 10, 10),
    offers: generateEventOffers(),
    isFavorite: Boolean(getRandomInt()),
    description: generateDestinationText(),
    photos: generateDestinationPhotos(),
  };
};

export {
  generateEvent,
};
