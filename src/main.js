import {RenderPosition} from './consts/consts';
import {renderTemplate, renderElement} from './utils/utils';
import TripInfoView from './view/site-info/site-info';
import SiteControlsView from './view/site-controls/site-controls';
import NewEventButtonView from './view/new-event-button';
import EventSortView from './view/sort';
import {createListTemplate} from './view/list';
import {events} from './view/list';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

renderElement(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsElement, new EventSortView().getElement(), RenderPosition.BEFORE_END);
renderTemplate(tripEventsElement, createListTemplate(), RenderPosition.BEFORE_END);
