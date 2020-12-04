import dayjs from 'dayjs';
import {TOTAL_EVENTS_COUNT} from './mock/consts';
import {RenderPosition} from './consts/consts';
import {renderElement} from './utils/utils';
import {generateEvent} from './mock/event-create';
import TripInfoView from './view/site-info/site-info';
import SiteControlsView from './view/site-controls/site-controls';
import NewEventButtonView from './view/new-event-button';
import EventSortView from './view/sort';
import EventsListView from './view/events-list';
import EventFormView from './view/event-form/event-form';
import EventView from './view/event/event';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const EventsList = new EventsListView();

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsSorted = events.slice().sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));

renderElement(tripMainElement, new TripInfoView(eventsSorted).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsBoard, new EventSortView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsBoard, EventsList.getElement(), RenderPosition.BEFORE_END);

const renderEvent = (parentElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventFormView(event);

  const replaceItemToForm = () => {
    parentElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToItem = () => {
    parentElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceItemToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(parentElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

for (const event of eventsSorted) {
  renderEvent(EventsList.getElement(), new EventView(event).getElement());
}

