import {createElement} from '../utils/utils';

const createLoadingMessage = () => {
  return `
    <p class="trip-events__msg">
      Loading...
    </p>
  `;
};

export default class EventsLoading {
  constructor() {
    this._element = null;
  }


  getTemplate() {
    return createLoadingMessage();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
