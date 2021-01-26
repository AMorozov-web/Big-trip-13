import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {
  TYPES,
} from '../consts';
import {
  capitalizeFirstLetter,
} from '../utils/common';
import {
  setID,
} from '../utils/event';
import Smart from './smart';

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const renderDestinationText = (destinationDescription) => `<p class="event__destination-description">${destinationDescription}</p>`;

const getPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

const renderDestinationPhotos = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(getPhoto).join(` `)}
    </div>
  </div>
`;

const renderDestination = (destinationDescription, photos) => (
  !destinationDescription && !photos.length) ? `` : `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${destinationDescription ? renderDestinationText(destinationDescription) : ``}
    ${photos.length ? renderDestinationPhotos(photos) : ``}
  </section>
`;

const renderDestinationOption = (optionCity) => `<option value="${optionCity}"></option>`;

const getClassNamePart = (str) => {
  const splitStr = str.split(` `);

  return splitStr[splitStr.length - 1];
};

const getOfferTemplate = (offer, isChecked, isDisabled) => {
  const {
    title,
    price,
  } = offer;

  const classNamePart = getClassNamePart(title);
  const id = setID();

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${classNamePart}-${id}" type="checkbox"
      name="event-offer-${classNamePart}" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
      <label class="event__offer-label" for="event-offer-${classNamePart}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const renderOffers = (offers, offersOfSelectedType, isDisabled) => !offersOfSelectedType.length ? `` : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersOfSelectedType.map((offer) => getOfferTemplate(offer,
      Boolean(offers.find((current) => current.title === offer.title)), isDisabled)).join(``)}
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

const createEventFormTemplate = (data, destinations, typedOffers, isNew) => {
  const {
    type,
    destination,
    startTime,
    endTime,
    price,
    offers,
    description,
    photos,
    onSaving,
    onDeleting,
    isDisabled,
  } = data;

  const selectedTypeOffers = typedOffers.find((item) => item.type === type).offers;
  const offersTemplate = renderOffers(offers, selectedTypeOffers, isDisabled);
  const descriptionTemplate = renderDestination(description, photos);
  const typesListTemplate = TYPES.map((currentType) => getSelectButton(currentType, currentType === type)).join(` `);
  const resetButtonInnerText = isNew ? `Cancel` : `Delete`;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden"
            id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

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
              name="event-destination" value="${destination}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
            <datalist id="destination-list-1">
              ${destinations.map((current) => renderDestinationOption(current.name)).join(` `)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1"
              type="text" name="event-start-time"
              value="${dayjs(startTime).format(`DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1"
              type="text" name="event-end-time"
              value="${dayjs(endTime).format(`DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1"
            type="text" name="event-price" value="${price}" ${isDisabled ? `disabled` : ``}>
          </div>

          <button class="event__save-btn  btn  btn--blue"
            type="submit" ${isDisabled ? `disabled` : ``}>${onSaving ? `Saving...` : `Save`}</button>
          <button class="event__reset-btn"
            type="reset" ${isDisabled ? `disabled` : ``}>${onDeleting ? `Deleting...` : resetButtonInnerText}</button>
          ${!isNew ? `<button class="event__rollup-btn" type="button">` : ``}
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
  constructor(event, destinations, offers, isNew = false) {
    super();
    this._data = EventForm.parseEventToData(event);
    this._destinations = destinations;
    this._offers = offers;
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
    return createEventFormTemplate(this._data, this._destinations, this._offers, this._isNew);
  }

  reset(event) {
    this.updateData(
        EventForm.parseEventToData(event)
    );
  }

  removeElement() {
    super.removeElement();

    if (this._startTimePicker) {
      this._startTimePicker.destroy();
      this._startTimePicker = null;
    }

    if (this._endTimePicker) {
      this._endTimePicker.destroy();
      this._endTimePicker = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setPickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupButtonClickHandler(this._callback.rollupButtonClick);
    this.setResetButtonClickHandler(this._callback.resetButtonClick);
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

    const checkedOffers = [];
    const offersOfSelectedType = this._offers.find((current) => current.type === this._data.type).offers;

    this.getElement()
    .querySelectorAll(`.event__offer-checkbox`)
    .forEach((checkbox, i) => {
      if (checkbox.checked) {
        checkedOffers.push(offersOfSelectedType[i]);
      }
    });

    this._data.offers = checkedOffers;

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

    const destinationCity = evt.target.value;

    if (!this._destinations.find((current) => current.name === destinationCity)) {
      evt.target.setCustomValidity(`Выберите пункт назначения из предложенного списка`);
      return;
    }

    this.updateData({
      destination: evt.target.value,
      description: `${this._destinations.find((city) => city.name === destinationCity).description}`,
      photos: this._destinations.find((city) => city.name === destinationCity).pictures,
    });
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

    if (isNaN(+evt.target.value) || !Number.isInteger(+evt.target.value)) {
      evt.target.setCustomValidity(`Цена должна быть целым числом`);
      return;
    }

    this.updateData({
      price: +evt.target.value,
    }, true);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormRollupButtonClickHandler(callback) {
    if (!this._isNew) {
      this._callback.rollupButtonClick = callback;
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
    }
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
          onSaving: false,
          onDeleting: false,
          isDisabled: false,
        }
    );
  }

  static parseDataToEvent(data) {
    const event = Object.assign(
        {},
        data
    );

    delete data.onSaving;
    delete data.onDeleting;
    delete data.isDisabled;

    return event;
  }
}
