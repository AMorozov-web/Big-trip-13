import dayjs from 'dayjs';
import {createElement} from "../utils";

const humanizeMaxDate = (min, max) => (dayjs(min).format(`MMM`) === dayjs(max).format(`MMM`))
  ? `${dayjs(max).format(`DD`)}` : `${dayjs(max).format(`MMM DD`)}`;

const createTripTemplate = (events) => {
  const destinations = new Set(events.map((event) => event.destination));
  const dates = events.map((event) => event.date);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${[...destinations].join(` &mdash; `)}
      </h1>

      <p class="trip-info__dates">
        ${dayjs(minDate).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${humanizeMaxDate(minDate, maxDate)}
      </p>
    </div>
  `;
};

const createCostTemplate = (events) => {
  let totalSum = 0;

  events.forEach((event) => {
    const {
      price,
      offers,
    } = event;

    if (offers.length) {
      totalSum += offers.map((offer) => offer.cost).reduce((a, b) => a + b);
    }

    totalSum += price;
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>
  `;
};

const createTripInfoTemplate = (events) => !events.length ? `
  <div class="visually-hidden"> </div>
  ` : `
  <section class="trip-main__trip-info  trip-info">
    ${createTripTemplate(events)}
    ${createCostTemplate(events)}
  </section>
`;

export default class SiteInfo {
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
