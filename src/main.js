import {RenderPosition} from './consts/consts';
import {renderTemplate, renderElement} from './utils/utils';
import TripInfoView from './view/trip-info/trip-info';
import {createControlsTemplate} from './view/controls';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';
import {events} from './view/list';

const siteHeader = document.querySelector(`.page-header`);
const siteMain = document.querySelector(`.page-main`);
const tripInfoContainer = siteHeader.querySelector(`.trip-main`);
const controlsContainer = tripInfoContainer.querySelector(`.trip-controls`);
const eventsContainer = siteMain.querySelector(`.trip-events`);

controlsContainer.innerHTML = ``;

// tripInfoContainer.prepend(new TripInfoView(events).getElement());
renderElement(tripInfoContainer, new TripInfoView(events).getElement(), RenderPosition.AFTER_BEGIN);
renderTemplate(controlsContainer, createControlsTemplate(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createSortTemplate(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createListTemplate(), RenderPosition.BEFORE_END);
