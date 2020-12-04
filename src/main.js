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

const eventsInList = events.slice().sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));

renderElement(tripMainElement, new TripInfoView(eventsInList).getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripMainElement, new SiteControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsBoard, new EventSortView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripEventsBoard, EventsList.getElement(), RenderPosition.BEFORE_END);

for (const event of eventsInList) {
  renderElement(EventsList.getElement(), new EventView(event).getElement(), RenderPosition.BEFORE_END);
}

console.log(new EventFormView(eventsInList[3]).getElement());

// const renderEvent = (parentElement, event) => {
//   const eventComponent = new EventView(event);
//   const eventEditComponent = new TaskEditView(task);

//   const replaceCardToForm = () => {
//     taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
//   };

//   const replaceFormToCard = () => {
//     taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToCard();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
//     replaceCardToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
//     evt.preventDefault();
//     replaceFormToCard();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
// };
