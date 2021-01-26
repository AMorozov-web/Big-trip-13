import dayjs from 'dayjs';
import Abstract from './abstract';

const humanizeMaxDate = (min, max) => (dayjs(min).format(`MMM`) === dayjs(max).format(`MMM`))
  ? `${dayjs(max).format(`DD`)}` : `${dayjs(max).format(`MMM DD`)}`;

const createTripTemplate = (events) => {
  const destinations = Array.from(new Set(events.map((event) => event.destination)));
  const dates = events.map((event) => event.startTime);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const isMore = Boolean(destinations.length > 3);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${!isMore ? destinations.join(`&nbsp;&mdash;&nbsp;`) : `
          ${destinations[0]}
            &mdash;&nbsp;&hellip;&nbsp;&mdash;
          ${destinations[destinations.length - 1]}
        `}
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
      totalSum += offers.map((offer) => offer.price).reduce((a, b) => a + b);
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

export default class SiteInfo extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
