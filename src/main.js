import {
  RenderPosition,
  UpdateType,
  MenuItemsName,
  END_POINT,
  AUTHORIZATION,
  STORE_NAME,
} from './consts';
import {
  isOnline,
} from './utils/common';
import {
  render,
  remove,
} from './utils/render';
import {
  toast,
} from './utils/toast';
import SiteControls from './view/site-controls';
import SiteMenu from './view/site-menu';
import NewEventButton from './view/new-event-button';
import Stats from './view/stats';
import SiteOffline from './view/site-offline';
import Events from './model/events';
import Filter from './model/filter';
import Trip from './presenter/trip';
import Filters from './presenter/filters';
import Info from './presenter/info';
import Api from './api/api';
import Provider from './api/provider';
import Store from './api/store';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new Events();
const filterModel = new Filter();

const siteControls = new SiteControls();
const siteMenu = new SiteMenu();
const offlineIndicator = new SiteOffline();
const addNewEventButton = new NewEventButton();

const tripPresenter = new Trip(tripEventsBoard, eventsModel, filterModel, apiWithProvider);
const filtersPresenter = new Filters(siteControls, eventsModel, filterModel);
const infoPresenter = new Info(tripMainElement, eventsModel);

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

render(tripMainElement, siteControls, RenderPosition.BEFORE_END);
render(tripMainElement, addNewEventButton, RenderPosition.BEFORE_END);

tripPresenter.init();
filtersPresenter.init();
infoPresenter.init();

addNewEventButton.disabled = true;

addNewEventButton.getElement().addEventListener(`click`, (evt) => {
  siteMenu.setActiveMenuItem(MenuItemsName.TABLE);

  if (!isOnline()) {
    toast(`You cannot add a new event offline`);
    return;
  }

  evt.preventDefault();
  remove(statsComponent);
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createEvent(() => {
    evt.target.disabled = false;
  });
  evt.target.disabled = true;
});

apiWithProvider
  .getAllData()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
    render(siteControls, siteMenu, RenderPosition.AFTER_BEGIN);
    addNewEventButton.disabled = false;
  })
  .catch(()=> {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(siteControls, siteMenu, RenderPosition.AFTER_BEGIN);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [OFFLINE]`, ``);
  remove(offlineIndicator);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  render(siteHeaderElement, offlineIndicator, RenderPosition.AFTER_BEGIN);
  document.title += ` [OFFLINE]`;
});
