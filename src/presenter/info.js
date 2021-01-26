import {
  RenderPosition,
} from '../consts';
import {
  render,
  replace,
  remove,
} from '../utils/render';
import SiteInfo from '../view/site-info';

export default class Info {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._infoComponent = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._eventsModel.addObserver(this._modelEventHandler);
  }

  init() {
    const events = this._getEvents();
    const prevInfoComponent = this._infoComponent;

    this._infoComponent = new SiteInfo(events);

    if (prevInfoComponent === null) {
      render(this._container, this._infoComponent, RenderPosition.AFTER_BEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  _modelEventHandler() {
    this.init();
  }
}
