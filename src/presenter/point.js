import {
  RenderPosition,
} from '../consts';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import EventForm from '../view/event-form';
import Event from '../view/event';

export default class Point {
  constructor(pointsContainer, pointsChangeData) {
    this._pointsContainer = pointsContainer;
    this._pointsChangeData = pointsChangeData;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._point = tripPoint;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new Event(tripPoint);
    this._pointEditComponent = new EventForm(tripPoint);

    this._pointComponent.setEditClickHandler(this._handlePointClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setButtonClickHandler(this._handleFormClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointsContainer, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._pointsContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    render(this._pointsContainer, this._pointComponent, RenderPosition.BEFORE_END);

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
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

  _handleFormSubmit(point) {
    this._pointsChangeData(point);
    this._replacePointToCard();
  }

  _handleFavoriteClick() {
    this._pointsChangeData(
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }
}
