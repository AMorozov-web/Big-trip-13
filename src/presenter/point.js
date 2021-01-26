import {
  RenderPosition,
  Mode,
  UpdateType,
  UserAction,
} from '../consts';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import EventForm from '../view/event-form';
import Event from '../view/event';

export default class Point {
  constructor(pointsContainer, changeData, changeMode) {
    this._pointsContainer = pointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointRollupClick = this._handlePointRollupClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormResetClick = this._handleFormResetClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint, destinations, offers) {
    this._point = tripPoint;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new Event(tripPoint);
    this._pointEditComponent = new EventForm(tripPoint, destinations, offers);

    this._pointComponent.setPointRollupButtonClickHandler(this._handlePointRollupClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormRollupButtonClickHandler(this._handleFormRollupClick);
    this._pointEditComponent.setResetButtonClickHandler(this._handleFormResetClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointsContainer, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDIT) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceCardToPoint();
    }
  }

  _replaceCardToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToCard() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceCardToPoint();
    }
  }

  _handlePointRollupClick() {
    this._replacePointToCard();
  }

  _handleFormRollupClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceCardToPoint();
  }

  _handleFormResetClick(point) {
    if (this._mode === Mode.EDIT) {
      this._changeData(
          UserAction.DELETE_POINT,
          UpdateType.MAJOR,
          point
      );
      return;
    }
    this._pointEditComponent.reset(this._point);
    this._replaceCardToPoint();
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
    this._replaceCardToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
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
