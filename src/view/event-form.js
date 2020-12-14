import dayjs from "dayjs";
import {TYPES} from '../mock/consts';
import {capitalizeFirstLetter} from '../utils/common';
import Abstract from './abstract';

const renderDestinationText = (description) => `<p class="event__destination-description">${description}</p>`;

const getPhotoSrc = (src) => `<img class="event__photo" src="${src}" alt="Event photo">`;

const renderDestinationPhotos = (photos) => !photos.length ? `` : `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(getPhotoSrc).join(` `)}
    </div>
  </div>
`;

const renderDestination = (description, photos, isEdit) => !description ? `` : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDestinationText(description)}
    ${isEdit ? `` : renderDestinationPhotos(photos)}
  </section>
`;

const getClassNamePart = (str) => {
  const splitStr = str.split(` `);

  return splitStr[splitStr.length - 1];
};

const getOfferTemplate = (offer) => {
  const {
    title,
    cost,
  } = offer;

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassNamePart(title)}-1" type="checkbox"
      name="event-offer-${getClassNamePart(title)}" checked="">
      <label class="event__offer-label" for="event-offer-${getClassNamePart(title)}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${cost}</span>
      </label>
    </div>
  `;
};

const renderOffers = (offers) => !offers.length ? `` : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map(getOfferTemplate).join(` `)}
    </div>
  </section>
`;

const getSelectButton = (type, eventType) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio"
    name="event-type" value="${type.toLowerCase()}" ${(type === eventType) ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">
      ${capitalizeFirstLetter(type)}
    </label>
  </div>
`;

const renderSelectButtons = (types, eventType) => types.map((type) => getSelectButton(type, eventType)).join(` `);

const createEventFormTemplate = (event, isEdit) => {
  const {
    type,
    destination,
    startTime,
    endTime,
    price,
    offers,
    description,
    photos,
  } = event;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${renderSelectButtons(TYPES, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text"
              name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1"
              type="text" name="event-start-time" value="${dayjs(startTime).format(`DD/MM/YY HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1"
              type="text" name="event-end-time" value="${dayjs(endTime).format(`DD/MM/YY HH:mm`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEdit ? `Delete` : `Cancel`}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${renderOffers(offers)}
          ${renderDestination(description, photos, isEdit)}
        </section>
      </form>
    </li>
  `;
};

export default class EventForm extends Abstract {
  constructor(event, isEdit = true) {
    super();
    this._event = event;
    this._isEdit = isEdit;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  getTemplate() {
    return createEventFormTemplate(this._event, this._isEdit);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  _buttonClickHandler() {
    this._callback.buttonClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setButtonClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._buttonClickHandler);
  }
}
