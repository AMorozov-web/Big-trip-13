import {
  RenderPosition,
} from '../consts';
import {
  render,
} from '../utils/render';
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
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);

    this._renderBoard();
  }

  _renderPoint(tripPoint) {
    const PointPresenter = new Point(this._eventsList);

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
      .values(this._pointPresenter_pointPresenter)
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
}
