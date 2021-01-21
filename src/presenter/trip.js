import {
  RenderPosition,
  SortType,
  FilterType,
  UpdateType,
  UserAction,
} from '../consts';
import {
  calcDuration,
} from '../utils/event';
import {
  filter,
} from '../utils/filter';
import {
  render,
  remove,
} from '../utils/render';
import EventsList from '../view/events-list';
import EventSort from '../view/event-sort';
import EventsEmpty from '../view/events-empty';
import Point from './point';
import PointAdd from './point-add';

export default class Trip {
  constructor(listContainer, eventsModel, filterModel) {
    this._listContainer = listContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._eventsList = new EventsList();
    this._eventsEmpty = new EventsEmpty();
    this._eventsSort = null;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._eventAddPresenter = new PointAdd(this._eventsList, this._handleViewAction);
  }

  init() {
    this._renderBoard();
  }

  createEvent() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventAddPresenter.init();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort((a, b) => a.startTime - b.startTime);
      case SortType.TIME:
        return filteredEvents.sort((a, b) => calcDuration(a) - calcDuration(b));
      case SortType.PRICE:
        return filteredEvents.sort((a, b) => a.price - b.price);
      default:
        return filteredEvents;
    }
  }

  _renderPoint(tripPoint) {
    const PointPresenter = new Point(this._eventsList, this._handleViewAction, this._handleModeChange);

    PointPresenter.init(tripPoint);

    this._pointPresenter[tripPoint.id] = PointPresenter;
  }

  _renderPoints(events) {
    events.forEach((item) => this._renderPoint(item));
  }

  _renderEmpty() {
    render(this._eventsList, new EventsEmpty(), RenderPosition.AFTER_BEGIN);
  }

  _renderList() {
    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);
  }

  _renderBoard() {
    const events = this._getEvents();

    if (!events.length) {
      this._renderEmpty();
      return;
    }

    this._renderSort();
    this._renderList();
    this._renderPoints(events);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventAddPresenter.destroy();

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
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._eventAddPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }
}
