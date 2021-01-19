import {
  RenderPosition,
  SortType,
  UpdateType,
  UserAction,
} from '../consts';
import {
  calcDuration,
} from '../utils/event';
import {
  render,
  remove,
} from '../utils/render';
import EventsList from '../view/events-list';
import EventSort from '../view/event-sort';
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
    this._eventsSort = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
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
    const PointPresenter = new Point(this._eventsList, this._handleViewAction, this._handleModeChange);

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

  _clearList({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._eventsSort);
    remove(this._eventsEmpty);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderSort() {
    if (this._eventsSort !== null) {
      this._eventsSort = null;
    }
    this._eventsSort = new EventSort(this._currentSortType);
    this._eventsSort.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._eventsList, this._eventsSort, RenderPosition.BEFORE_END);
  }

  _renderBoard() {
    if (this._tripPoints.length) {
      this._renderSort();
    }

    this._renderList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearList();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._clearList({resetSortType: true});
        this._renderList();
        break;
    }
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
