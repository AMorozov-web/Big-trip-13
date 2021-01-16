import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {TYPES} from '../mock/consts';
import {capitalizeFirstLetter} from '../utils/common';
import Smart from './smart';

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const renderDestinationText = (destinationDescription) => `<p class="event__destination-description">${destinationDescription}</p>`;

const getPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

const renderDestinationPhotos = (photos, havePhotos) => !havePhotos ? `` : `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(getPhoto).join(` `)}
    </div>
  </div>
`;

const renderDestination = (destinationDescription, photos, haveDescription, havePhotos) => !haveDescription ? `` : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDestinationText(destinationDescription)}
    ${renderDestinationPhotos(photos, havePhotos)}
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

const renderOffers = (offers, haveOffers) => !haveOffers ? `` : `
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

const createEventFormTemplate = (data, isNew) => {
  const {
    type,
    destination,
    startTime,
    endTime,
    price,
    offers,
    description,
    photos,
    haveOffers,
    haveDescription,
    havePhotos,
  } = data;

  const offersTemplate = renderOffers(offers, haveOffers);
  const descriptionTemplate = renderDestination(description, photos, haveDescription, havePhotos);
  const typesListTemplate = TYPES.map((currentType) => getSelectButton(currentType, currentType === type)).join(` `);

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
                ${typesListTemplate}
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
          <button class="event__reset-btn" type="reset">${isNew ? `Cancel` : `Delete`}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${descriptionTemplate}
        </section>
      </form>
    </li>
  `;
};

export default class EventForm extends Smart {
  constructor(event, isNew = false) {
    super();
    this._data = EventForm.parseEventToData(event);
    this._isNew = isNew;
    this._startTimePicker = null;
    this._endTimePicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);

    this._setInnerHandlers();
    this._setPickers();
  }

  getTemplate() {
    return createEventFormTemplate(this._data, this._isNew);
  }

  reset(event) {
    this.updateData(
        EventForm.parseEventToData(event)
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setPickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupButtonClickHandler(this._callback.rollupButtonClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._eventDestinationChangeHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._eventPriceInputHandler);
  }

  _setPickers() {
    if (this._startTimePicker) {
      this._startTimePicker.destroy();
      this._startTimePicker = null;
    }

    if (this._endTimePicker) {
      this._endTimePicker.destroy();
      this._endTimePicker = null;
    }

    this._startTimePicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `y/m/d H:i`,
          defaultDate: this._data.startTime,
          maxDate: this._data.endTime,
          onChange: this._startTimeChangeHandler
        }
    );

    this._endTimePicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `y/m/d H:i`,
          minDate: this._data.startTime,
          defaultDate: this._data.endTime,
          onChange: this._endTimeChangeHandler
        }
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventForm.parseDataToEvent(this._data));
  }

  _rollupButtonClickHandler() {
    this._callback.rollupButtonClick();
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetButtonClick(EventForm.parseDataToEvent(this._data));
  }

  _eventTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _eventDestinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
    }, true);
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      startTime: userDate,
    }, true);

    this._endTimePicker.set(`minDate`, userDate);
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: userDate,
    }, true);
    this._startTimePicker.set(`maxDate`, userDate);
  }

  _eventPriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }

  setResetButtonClickHandler(callback) {
    this._callback.resetButtonClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetButtonClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          haveOffers: event.offers.length !== 0,
          haveDescription: event.description !== ``,
          havePhotos: event.photos.length !== 0,
        }
    );
  }

  static parseDataToEvent(data) {
    const event = Object.assign({}, data);

    if (!data.haveOffers) {
      event.offers = [];
    }

    if (!data.haveDescription) {
      event.description = ``;
    }

    if (!data.havePhotos) {
      event.photos = [];
    }

    delete event.haveOffers;
    delete event.haveDescription;
    delete event.havePhotos;

    return event;
  }
}
