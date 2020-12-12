import {
  RenderPosition,
} from '../consts';
import {
  render,
} from '../utils/render';
import {
  updateItem,
} from '../utils/common';
import EventSort from '../view/event-sort';
import EventsList from '../view/events-list';
import EventsEmpty from '../view/events-empty';
import Point from './point';

export default class Trip {
  constructor(listContainer) {
    this._listContainer = listContainer;
    this._pointPresenter = {};

    this._eventsList = new EventsList();
    this._eventsEmpty = new EventsEmpty();
    this._eventsSort = new EventSort();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);

    this._renderBoard();
  }

  _renderPoint(tripPoint) {
    const PointPresenter = new Point(this._eventsList, this._handlePointChange, this._handleModeChange);

    PointPresenter.init(tripPoint);

    this._pointPresenter[tripPoint.id] = PointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((item) => this._renderPoint(item));
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

  _clearList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderSort() {
    render(this._eventsList, this._eventsSort, RenderPosition.BEFORE_END);
  }

  _renderBoard() {
    this._renderSort();

    this._renderList();
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
