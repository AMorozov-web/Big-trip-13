import {RenderPosition} from './consts/consts';
import {renderTemplate, renderElement} from './utils/utils';
import TripInfoView from './view/site-info/site-info';
import SiteControlsView from './view/site-controls/site-controls';
import NewEventButtonView from './view/new-event-button';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';
import {events} from './view/list';

const siteHeader = document.querySelector(`.page-header`);
const siteMain = document.querySelector(`.page-main`);
const tripMainElement = siteHeader.querySelector(`.trip-main`);
// const controlsContainer = tripInfoContainer.querySelector(`.trip-controls`);
const eventsContainer = siteMain.querySelector(`.trip-events`);

// controlsContainer.innerHTML = ``;

renderElement(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createSortTemplate(), RenderPosition.BEFORE_END);
renderTemplate(eventsContainer, createListTemplate(), RenderPosition.BEFORE_END);
