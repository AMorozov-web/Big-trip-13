import {
  RenderPosition,
} from '../consts';
import {
  render,
  replace,
} from '../utils/render';
import EventForm from '../view/event-form';
import Event from '../view/event';

export default class Point {
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._point = tripPoint;

    this._pointComponent = new Event(tripPoint);
    this._pointEditComponent = new EventForm(tripPoint);

    this._pointComponent.setEditClickHandler(this._handlePointClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setButtonClickHandler(this._handleFormClick);

    render(this._pointsContainer, this._pointComponent, RenderPosition.BEFORE_END);
  }

  _replaceCardToPoint() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replacePointToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replacePointToCard();
    }
  }

  _handlePointClick() {
    this._replaceCardToPoint();
  }

  _handleFormClick() {
    this._replacePointToCard();
  }

  _handleFormSubmit() {
    this._replacePointToCard();
  }
}
