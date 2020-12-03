import {createElement} from "../../utils/utils";
import {createTripTemplate} from './trip-info-main';
import {createCostTemplate} from './trip-info-cost';

const createTripInfoTemplate = (events) => {
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripTemplate(events)}
      ${createCostTemplate(events)}
    </section>
  `;
};

export default class TripInfoView {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
