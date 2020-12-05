import dayjs from 'dayjs';
import {createElement} from "../utils";

const createTripTemplate = (events) => {
  const destinations = new Set(events.map((event) => event.destination));
  const dates = events.map((event) => event.date);

  const getEndDate = () => (dayjs(dates[0]).format(`MMM`) === dayjs(dates[dates.length - 1]).format(`MMM`))
    ? `${dayjs(dates[dates.length - 1]).format(`DD`)}` : `${dayjs(dates[dates.length - 1]).format(`MMM DD`)}`;

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${[...destinations].join(` &mdash; `)}
      </h1>

      <p class="trip-info__dates">
        ${dayjs(dates[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${getEndDate()}
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

const createTripInfoTemplate = (events) => {
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripTemplate(events)}
      ${createCostTemplate(events)}
    </section>
  `;
};

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
