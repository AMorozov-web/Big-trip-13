import dayjs from 'dayjs';
import Abstract from './abstract';
import {capitalizeFirstLetter} from '../utils/common';
import {getDuration} from '../utils/event';

const getOfferTemplate = (offer) => {
  const {
    title,
    cost,
  } = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${cost}</span>
    </li>
  `;
};

const renderOffers = (offers) => `
  <ul class="event__selected-offers">
    ${!offers.length ? `` : offers.map(getOfferTemplate).join(` `)}
  </ul>
`;

const createEventTemplate = (event) => {
  const {
    type,
    destination,
    startTime,
    endTime,
    price,
    offers,
    isFavorite,
  } = event;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(startTime).format(`YYYY-MM-DD`)}">
          ${dayjs(startTime).format(`MMM DD`)}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(startTime).format(`YYYY-MM-DDTHH:mm`)}">
              ${dayjs(startTime).format(`HH:mm`)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(endTime).format(`YYYY-MM-DDTHH:mm`)}">
              ${dayjs(endTime).format(`HH:mm`)}
            </time>
          </p>
          <p class="event__duration">
            ${getDuration(startTime, endTime)}
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
          ${renderOffers(offers)}
        <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class Event extends Abstract {
  constructor(event) {
    super();
    this._event = event;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _rollupButtonClickHandler() {
    this._callback.buttonClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setPointRollupButtonClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}
