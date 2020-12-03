import {RenderPosition} from './consts/consts';
import {renderTemplate} from './utils/utils';
import {createTripInfoTemplate} from './view/trip-info/trip-info';
import {createControlsTemplate} from './view/controls';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';
import {events} from './view/list';

const siteHeader = document.querySelector(`.page-header`);
const siteMain = document.querySelector(`.page-main`);
const infoContainer = siteHeader.querySelector(`.trip-main`);
const controlsContainer = infoContainer.querySelector(`.trip-controls`);
const eventsContainer = siteMain.querySelector(`.trip-events`);

controlsContainer.innerHTML = ``;

renderTemplate(infoContainer, createTripInfoTemplate(events), RenderPosition.AFTER_BEGIN);
renderTemplate(controlsContainer, createControlsTemplate(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createSortTemplate(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createListTemplate(), RenderPosition.BEFORE_END);
