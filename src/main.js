import {
  RenderPosition,
  UpdateType,
  MenuItemsName,
  END_POINT,
  AUTHORIZATION,
} from './consts';
import {
  render,
  remove,
} from './utils/render';
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

const eventsModel = new Events();
const filterModel = new Filter();
const api = new Api(END_POINT, AUTHORIZATION);

const siteInfo = new SiteInfo([]);
const siteControls = new SiteControls();
const siteMenu = new SiteMenu();
const tripPresenter = new Trip(tripEventsBoard, eventsModel, filterModel, api);
const filtersPresenter = new Filters(siteControls, eventsModel, filterModel);
const addNewEventButton = new NewEventButton();

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
render(tripMainElement, addNewEventButton, RenderPosition.BEFORE_END);

tripPresenter.init();
filtersPresenter.init();

addNewEventButton.disabled = true;

addNewEventButton.getElement().addEventListener(`click`, (evt) => {
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

Promise
  .all([
    api.getEvents(),
    api.getDestinations(),
    api.getOffers(),
  ])
  .then(([events, destinations, offers]) => {
    eventsModel.setDestinations(destinations);
    eventsModel.setOffers(offers);
    eventsModel.setEvents(UpdateType.INIT, events);
    render(siteControls, siteMenu, RenderPosition.BEFORE_END);
    addNewEventButton.disabled = false;
  })
  .catch(()=> {
    eventsModel.setDestinations([]);
    eventsModel.setOffers([]);
    eventsModel.setEvents(UpdateType.INIT, []);
    render(siteControls, siteMenu, RenderPosition.BEFORE_END);
  });
