import {
  RenderPosition,
} from '../consts';
import {
  render,
  replace
} from '../utils/render';
import EventForm from '../view/event-form';
import Event from '../view/event';
import EventSort from '../view/event-sort';
import EventsList from '../view/events-list';
import EventsEmpty from '../view/events-empty';

export default class Trip {
  constructor(listContainer) {
    this._listContainer = listContainer;

    this._eventsList = new EventsList();
    this._eventsEmpty = new EventsEmpty();
    this._eventsSort = new EventSort();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);
    debugger
    this._renderList();
  }

  _renderSort() {
    render(this._eventsList, new EventSort(), RenderPosition.BEFORE_END);
  }

  _renderPoint(tripPoint) {
    const eventComponent = new Event(tripPoint);
    const eventEditComponent = new EventForm(tripPoint);

    const replaceItemToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToItem = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setButtonClickHandler(() => {
      replaceItemToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setButtonClickHandler(() => {
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._eventsList, eventComponent, RenderPosition.BEFORE_END);
  }

  _renderPoints() {
    this._tripPoints.forEach((item) => this._renderPoint(this._eventsList, item));
  }

  _renderEmpty() {
    render(this._eventsList, new EventsEmpty(), RenderPosition.AFTER_BEGIN);
  }

  _renderList() {
    if (!this._tripPoints.length) {
      this._renderEmpty();
      return;
    }

    this._renderPoints();
  }

  _renderBoard() {
    this._renderSort();

    this._renderList();
  }
}
