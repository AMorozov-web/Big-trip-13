import {
  TOTAL_EVENTS_COUNT,
} from './mock/consts';
import {
  RenderPosition,
  SortType,
} from './consts';
import {
  render,
} from './utils/render';
import {
  getSortedEvents,
} from './utils/sort';
import {
  generateEvent,
} from './mock/event-create';
import SiteInfo from './view/site-info';
import SiteControls from './view/site-controls';
import SiteMenu from './view/site-menu';
import NewEventButton from './view/new-event-button';
import Events from './model/events';
import Filter from './model/filter';
import Trip from './presenter/trip';
import Filters from './presenter/filters';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsModel = new Events();
const filterModel = new Filter();
eventsModel.setEvents(events);

const eventsSorted = getSortedEvents(events, SortType.DAY);

const siteInfo = new SiteInfo(eventsSorted);
const siteControls = new SiteControls();
const siteMenu = new SiteMenu();
const tripPresenter = new Trip(tripEventsBoard, eventsModel, filterModel);
const filtersPresenter = new Filters(siteControls, eventsModel, filterModel);

render(tripMainElement, siteInfo, RenderPosition.AFTER_BEGIN);
render(tripMainElement, siteControls, RenderPosition.BEFORE_END);
render(siteControls, siteMenu, RenderPosition.BEFORE_END);
render(tripMainElement, new NewEventButton(), RenderPosition.BEFORE_END);

tripPresenter.init();
filtersPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
