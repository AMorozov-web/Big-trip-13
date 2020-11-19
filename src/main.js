import {createInfoContainerTemplate} from './view/info';
import {createControlsTemplate} from './view/controls';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';

const Places = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const siteHeader = document.querySelector(`.page-header`);
const siteMain = document.querySelector(`.page-main`);
const infoContainer = siteHeader.querySelector(`.trip-main`);
const controlsContainer = infoContainer.querySelector(`.trip-controls`);
const eventsContainer = siteMain.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(infoContainer, createInfoContainerTemplate(), Places.AFTERBEGIN);

controlsContainer.innerHTML = ``;

render(controlsContainer, createControlsTemplate(), Places.BEFOREEND);
render(eventsContainer, createSortTemplate(), Places.BEFOREEND);
render(eventsContainer, createListTemplate(), Places.BEFOREEND);
