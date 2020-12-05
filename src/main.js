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
import EventsEmptyView from './view/events-empty';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsSorted = events.slice().sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));

const renderEvent = (eventsContainer, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventFormView(event);

  const replaceItemToForm = () => {
    eventsContainer.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToItem = () => {
    eventsContainer.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
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

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(eventsContainer, eventComponent.getElement(), RenderPosition.BEFORE_END);
};

const renderEventsList = (eventsListContainer, tripPoints) => {
  const eventsList = new EventsListView();

  renderElement(eventsListContainer, eventsList.getElement(), RenderPosition.BEFORE_END);

  if (!tripPoints.length) {
    renderElement(eventsList.getElement(), new EventsEmptyView().getElement(), RenderPosition.AFTER_BEGIN);
    return;
  }

  renderElement(eventsList.getElement(), new EventSortView().getElement(), RenderPosition.BEFORE_END);

  tripPoints.forEach((item) => renderEvent(eventsList.getElement(), item));
};

renderElement(tripMainElement, new TripInfoView(eventsSorted).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFORE_END);

renderEventsList(tripEventsBoard, eventsSorted);
