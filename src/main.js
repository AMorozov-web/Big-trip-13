import {TOTAL_EVENTS_COUNT} from './mock/consts';
import {
  RenderPosition,
  SortType,
} from './consts';
import {
  render,
  replace
} from './utils/render';
import {getSortedEvents} from './utils/sort';
import {generateEvent} from './mock/event-create';
import SiteInfo from './view/site-info';
import SiteControls from './view/site-controls';
import NewEventButton from './view/new-event-button';
import EventSort from './view/event-sort';
import EventsList from './view/events-list';
import EventForm from './view/event-form';
import Event from './view/event';
import EventsEmpty from './view/events-empty';
import Trip from './presenter/trip';

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripEventsBoard = siteMainElement.querySelector(`.trip-events`);

const events = new Array(TOTAL_EVENTS_COUNT).fill().map(generateEvent);

const eventsSorted = getSortedEvents(events, SortType.DAY);

// const renderEvent = (eventsContainer, event) => {
//   const eventComponent = new Event(event);
//   const eventEditComponent = new EventForm(event);

//   const replaceItemToForm = () => {
//     replace(eventEditComponent, eventComponent);
//   };

//   const replaceFormToItem = () => {
//     replace(eventComponent, eventEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToItem();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   eventComponent.setButtonClickHandler(() => {
//     replaceItemToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   eventEditComponent.setButtonClickHandler(() => {
//     replaceFormToItem();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   eventEditComponent.setFormSubmitHandler(() => {
//     replaceFormToItem();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(eventsContainer, eventComponent, RenderPosition.BEFORE_END);
// };

// const renderEventsList = (eventsListContainer, tripPoints) => {
//   const eventsList = new EventsList();

//   render(eventsListContainer, eventsList, RenderPosition.BEFORE_END);

//   if (!tripPoints.length) {
//     render(eventsList, new EventsEmpty(), RenderPosition.AFTER_BEGIN);
//     return;
//   }

//   render(eventsList, new EventSort(), RenderPosition.BEFORE_END);

//   tripPoints.forEach((item) => renderEvent(eventsList, item));
// };

const tripPresenter = new Trip(tripEventsBoard);

render(tripMainElement, new SiteInfo(eventsSorted), RenderPosition.AFTER_BEGIN);
render(tripMainElement, new SiteControls(), RenderPosition.BEFORE_END);
render(tripMainElement, new NewEventButton(), RenderPosition.BEFORE_END);

// renderEventsList(tripEventsBoard, eventsSorted);
tripPresenter.init(eventsSorted);
