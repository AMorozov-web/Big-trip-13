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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  shuffleArr,
  capitalizeFirstLetter,
  updateItem,
};
