import dayjs from "dayjs";
import {RenderPositions} from '../consts/consts';

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
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInMinutes < 60) {
    return `${durationInMinutes.toString().padStart(2, 0)}M`;
  } else if (durationInMinutes >= 60 && durationInMinutes < 1439) {
    return `${durationInHours.toString().padStart(2, 0)}H ${(+durationInMinutes - durationInHours * 60).toString().padStart(2, 0)}M`;
  } else {
    return `${(durationInDays).toString().padStart(2, 0)}D ${(+durationInHours - durationInDays * 24).toString().padStart(2, 0)}H
            ${(+durationInMinutes - durationInHours * 60).toString().padStart(2, 0)}M`;
  }
};

const render = (container, template, place = RenderPositions.BEFORE_END) => container.insertAdjacentHTML(place, template);

export {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  shuffleArr,
  capitalizeFirstLetter,
  calcDuration,
  render,
};
