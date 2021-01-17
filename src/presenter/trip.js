import {
  RenderPosition,
  SortType,
} from '../consts';
import {
  updateItem,
} from '../utils/common';
import {
  calcDuration,
} from '../utils/event';
import {
  render,
} from '../utils/render';
import EventSort from '../view/event-sort';
import EventsList from '../view/events-list';
import EventsEmpty from '../view/events-empty';
import Point from './point';

export default class Trip {
  constructor(listContainer, eventsModel) {
    this._listContainer = listContainer;
    this._eventsModel = eventsModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._eventsList = new EventsList();
    this._eventsEmpty = new EventsEmpty();
    this._eventsSort = new EventSort();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);

    this._renderBoard();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._eventsModel.getTasks().slice().sort((a, b) => a.date - b.date);
      case SortType.TIME:
        return this._eventsModel.getTasks().slice().sort((a, b) => calcDuration(a) - calcDuration(b));
      case SortType.PRICE:
        return this._eventsModel.getTasks().slice().sort((a, b) => a.price - b.price);
      default:
        return this._eventsModel.getTasks().slice().sort((a, b) => a.date - b.date);
    }
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

    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripPoints.sort((a, b) => a.date - b.date);
        break;
      case SortType.TIME:
        this._tripPoints.sort((a, b) => calcDuration(a) - calcDuration(b));
        break;
      case SortType.PRICE:
        this._tripPoints.sort((a, b) => a.price - b.price);
        break;
      default:
        this._tripPoints.sort((a, b) => a.date - b.date);
    }

    this._currentSortType = sortType;
  }

  _renderBoard() {
    this._renderSort();

    this._renderList();
  }

  _handlePointChange(updatedPoint) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList();
    this._renderList();
  }
}
