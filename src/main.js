import {
  TOTAL_EVENTS_COUNT,
} from './mock/consts';
import {
  RenderPosition,
  SortType,
  MenuItemsName,
} from './consts';
import {
  render,
  remove,
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
import Stats from './view/stats';
import Events from './model/events';
import Filter from './model/filter';
import Trip from './presenter/trip';
import Filters from './presenter/filters';
import Api from './api/api';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsModel = new Events();
const filterModel = new Filter();
eventsModel.setEvents(events);

const eventsSorted = getSortedEvents(events, SortType.DAY); // Temporary need to working SiteInfo component

const siteInfo = new SiteInfo(eventsSorted);
const siteControls = new SiteControls();
const siteMenu = new SiteMenu();
const tripPresenter = new Trip(tripEventsBoard, eventsModel, filterModel);
const filtersPresenter = new Filters(siteControls, eventsModel, filterModel);

let statsComponent = null;

const siteMenuClickHandler = (MenuItemName) => {
  switch (MenuItemName) {
    case MenuItemsName.STATS:
      tripEventsBoard.classList.add(`trip-events--hidden`);
      statsComponent = new Stats(eventsModel.getEvents());
      render(tripEventsBoard, statsComponent, RenderPosition.AFTER_END);
      tripPresenter.destroy();
      break;
    case MenuItemsName.TABLE:
      remove(statsComponent);
      tripEventsBoard.classList.remove(`trip-events--hidden`);
      tripPresenter.init();
      break;
  }
};

siteMenu.setMenuClickHandler(siteMenuClickHandler);

render(tripMainElement, siteInfo, RenderPosition.AFTER_BEGIN);
render(tripMainElement, siteControls, RenderPosition.BEFORE_END);
render(siteControls, siteMenu, RenderPosition.BEFORE_END);
render(tripMainElement, new NewEventButton(), RenderPosition.BEFORE_END);

tripPresenter.init();
filtersPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statsComponent);
  tripPresenter.destroy();
  siteMenu.setActiveMenuItem(MenuItemsName.TABLE);
  tripPresenter.init();
  tripPresenter.createEvent(() => {
    evt.target.disabled = false;
  });
  evt.target.disabled = true;
});

const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic um8WmpRDxYd3aPX70L`;

const api = new Api(END_POINT, AUTHORIZATION);

api.getEvents().then((data) => {
  console.log(data);
});

api.getDestinations().then((data) => {
  console.log(data);
});

api.getOffers().then((data) => {
  console.log(data);
});
