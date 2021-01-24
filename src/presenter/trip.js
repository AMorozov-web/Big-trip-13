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
import EventsLoading from '../view/events-loading';
import Point from './point';
import PointAdd from './point-add';

export default class Trip {
  constructor(listContainer, eventsModel, filterModel, api) {
    this._listContainer = listContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._eventsList = new EventsList();
    this._eventsEmpty = new EventsEmpty();
    this._eventsLoading = new EventsLoading();
    this._eventsSort = null;

    this._onLoading = true;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventAddPresenter = new PointAdd(this._eventsList, this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);

    this._clearBoard({resetSortType: true});
  }

  createEvent(callback) {
    const destinations = this._eventsModel.getDestinations();
    const offers = this._eventsModel.getOffers();

    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventAddPresenter.init(callback, destinations, offers);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort((a, b) => a.startTime - b.startTime);
      case SortType.TIME:
        return filteredEvents.sort((a, b) => calcDuration(b) - calcDuration(a));
      case SortType.PRICE:
        return filteredEvents.sort((a, b) => b.price - a.price);
      default:
        return filteredEvents;
    }
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new Point(this._eventsList, this._handleViewAction, this._handleModeChange);
    const destinations = this._eventsModel.getDestinations();
    const offers = this._eventsModel.getOffers();

    pointPresenter.init(tripPoint, destinations, offers);

    this._pointPresenter[tripPoint.id] = pointPresenter;
  }

  _renderPoints(events) {
    events.forEach((item) => this._renderPoint(item));
  }

  _renderEmpty() {
    render(this._eventsList, this._eventsEmpty, RenderPosition.BEFORE_END);
  }

  _renderLoading() {
    render(this._eventsList, this._eventsLoading, RenderPosition.BEFORE_END);
  }

  _renderList() {
    render(this._listContainer, this._eventsList, RenderPosition.BEFORE_END);
  }

  _renderBoard() {
    if (this._onLoading) {
      this._renderLoading();
      return;
    }

    const events = this._getEvents();

    if (!events.length) {
      this._renderEmpty();
      return;
    }

    this._renderList();
    this._renderSort();
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
    remove(this._eventsList);
    remove(this._eventsLoading);

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
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          });
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
      case UpdateType.INIT:
        this._onLoading = false;
        remove(this._eventsLoading);
        this._renderBoard();
        break;
      case UpdateType.PATCH:
        const destinations = this._eventsModel.getDestinations();
        const offers = this._eventsModel.getOffers();

        this._pointPresenter[data.id].init(data, destinations, offers);
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
