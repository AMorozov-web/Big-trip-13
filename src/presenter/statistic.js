import Stats from '../view/stats';
import {
  render,
  replace,
  remove,
  RenderPosition,
} from '../utils/render';

export default class Statistic {
  constructor(statsContainer, eventsModel) {
    this._statsContainer = statsContainer;
    this._eventsModel = eventsModel;

    this._statsComponent = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  init() {
    this._eventsModel.addObserver(this._modelEventHandler);

    this._renderStats();
  }

  destroy() {
    remove(this._statsComponent);
    this._statsComponent = null;

    this._eventsModel.removeObserver(this._modelEventHandler);
  }

  _getEvents() {
    const events = this._eventsModel.getEvents();

    return events;
  }

  _renderStats() {
    const events = this._getEvents();
    const prevStatsComponent = this._statsComponent;

    this._statsComponent = new Stats(events);

    if (prevStatsComponent === null) {
      render(this._statsContainer, this._statsComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._statsComponent, prevStatsComponent);
    remove(prevStatsComponent);
  }

  _modelEventHandler() {
    this.init();
  }
}
