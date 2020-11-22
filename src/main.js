import {RenderPositions} from './consts/consts';
import {render} from './utils/utils';
import {createInfoContainerTemplate} from './view/info';
import {createControlsTemplate} from './view/controls';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';

const siteHeader = document.querySelector(`.page-header`);
const siteMain = document.querySelector(`.page-main`);
const infoContainer = siteHeader.querySelector(`.trip-main`);
const controlsContainer = infoContainer.querySelector(`.trip-controls`);
const eventsContainer = siteMain.querySelector(`.trip-events`);

controlsContainer.innerHTML = ``;

render(infoContainer, createInfoContainerTemplate(), RenderPositions.AFTER_BEGIN);
render(controlsContainer, createControlsTemplate());
render(eventsContainer, createSortTemplate());
render(eventsContainer, createListTemplate());
