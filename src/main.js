import {TOTAL_EVENTS_COUNT} from './mock/consts';
import {
  RenderPosition,
  SortType,
} from './consts';
import {
  render,
} from './utils/render';
import {getSortedEvents} from './utils/sort';
import {generateEvent} from './mock/event-create';
import SiteInfo from './view/site-info';
import SiteControls from './view/site-controls';
import NewEventButton from './view/new-event-button';
import Events from './model/events';
import Trip from './presenter/trip';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsModel = new Events();
eventsModel.setTasks(events);

const eventsSorted = getSortedEvents(events, SortType.DAY);

const tripPresenter = new Trip(tripEventsBoard);

render(tripMainElement, new SiteInfo(eventsSorted), RenderPosition.AFTER_BEGIN);
render(tripMainElement, new SiteControls(), RenderPosition.BEFORE_END);
render(tripMainElement, new NewEventButton(), RenderPosition.BEFORE_END);

tripPresenter.init();
