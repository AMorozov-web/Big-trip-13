import {createElement} from '../../utils/utils';
import {createMenuTemplate} from './site-controls-menu';
import {createFiltersTemplate} from './site-controls-filters';

const createSiteControlsTemplate = () => {
  return `
    <div class="trip-main__trip-controls  trip-controls">
      <h2 class="visually-hidden">Switch trip view</h2>
        ${createMenuTemplate()}
      <h2 class="visually-hidden">Filter events</h2>
        ${createFiltersTemplate()}
    </div>
  `;
};

export default class SiteControlsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteControlsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
