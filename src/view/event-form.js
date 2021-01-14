import dayjs from "dayjs";
import {TYPES} from '../mock/consts';
import {capitalizeFirstLetter} from '../utils/common';
import Smart from './smart';

const renderDestinationText = (destinationDescription) => `<p class="event__destination-description">${destinationDescription}</p>`;

const getPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

const renderDestinationPhotos = (photos) => !photos.length ? `` : `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(getPhoto).join(` `)}
    </div>
  </div>
`;

const renderDestination = (destinationDescription, photos) => !destinationDescription ? `` : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDestinationText(destinationDescription)}
    ${renderDestinationPhotos(photos)}
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

  const classNamePart = getClassNamePart(title);

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${classNamePart}-1" type="checkbox"
      name="event-offer-${classNamePart}" checked="">
      <label class="event__offer-label" for="event-offer-${classNamePart}-1">
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

const getSelectButton = (type, isTypeMatch) => {
  const selectTypeLowerCase = type.toLowerCase();

  return `
    <div class="event__type-item">
      <input id="event-type-${selectTypeLowerCase}-1" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${selectTypeLowerCase}" ${isTypeMatch ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${selectTypeLowerCase}" for="event-type-${selectTypeLowerCase}-1">
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
  `;
};

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
                ${TYPES.map((currentType) => getSelectButton(currentType, currentType === type)).join(` `)}
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
          ${renderDestination(description, photos)}
        </section>
      </form>
    </li>
  `;
};

export default class EventForm extends Smart {
  constructor(event, isEdit = true) {
    super();
    this._event = event;
    this._isEdit = isEdit;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createEventFormTemplate(this._event, this._isEdit);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  _rollupButtonClickHandler() {
    this._callback.rollupButtonClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}
