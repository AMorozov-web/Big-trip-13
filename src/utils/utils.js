import dayjs from 'dayjs';
import {RenderPosition} from '../consts/consts';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const HOURS_IN_DAY = 24;

const getRandomInt = (min = 0, max = 1, multiplier = 1) => Math.floor(min + Math.random() * (max - min + 1)) * multiplier;

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const shuffleArr = (arr) => {
  const newArr = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getRandomArr = (arr) => {
  const randomArr = [];

  if (arr.length !== 0) {
    const count = getRandomInt(1, arr.length);
    const elements = shuffleArr(arr);

    for (let i = 0; i < count; i++) {
      randomArr.push(elements[i]);
    }
  }

  return randomArr;
};

const capitalizeFirstLetter = (str) => (str) ? str[0].toUpperCase() + str.slice(1) : str;

const calcDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, `minutes`);
  const durationInHours = Math.floor(durationInMinutes / MINUTES_IN_HOUR);
  const durationInDays = Math.floor(durationInHours / HOURS_IN_DAY);

  if (durationInMinutes < MINUTES_IN_HOUR) {
    return `${durationInMinutes.toString().padStart(2, 0)}M`;
  } else if (durationInMinutes >= MINUTES_IN_HOUR && durationInMinutes < MINUTES_IN_DAY) {
    return `${durationInHours.toString().padStart(2, 0)}H
            ${(+durationInMinutes - durationInHours * MINUTES_IN_HOUR).toString().padStart(2, 0)}M`;
  } else {
    return `${(durationInDays).toString().padStart(2, 0)}D
            ${(+durationInHours - durationInDays * HOURS_IN_DAY).toString().padStart(2, 0)}H
            ${(+durationInMinutes - durationInHours * MINUTES_IN_HOUR).toString().padStart(2, 0)}M`;
  }
};

const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  shuffleArr,
  capitalizeFirstLetter,
  calcDuration,
  renderTemplate,
  renderElement,
  createElement,
};
