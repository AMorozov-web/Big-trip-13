import {
  filter,
} from '../utils/filter';
import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
    this._destinations = [];
    this._offers = [];
  }

  setEvents(updateType, events) {
    this._events = [...events];

    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = [...destinations];
  }

  setOffers(offers) {
    this._offers = [...offers];
  }

  getEvents() {
    return this._events;
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  getFiltredEvents(filterType) {
    return filter[filterType](this._events);
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          destination: event.destination.name,
          description: event.destination.description,
          photos: event.destination.pictures,
          price: event.base_price,
          startTime: new Date(event.date_from),
          endTime: new Date(event.date_to),
          isFavorite: event.is_favorite,
        }
    );

    delete adaptedEvent.city;
    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "base_price": event.price,
          "date_from": event.startTime.toISOString(),
          "date_to": event.endTime.toISOString(),
          "is_favorite": event.isFavorite,
          "destination": Object.assign(
              {},
              {
                name: event.destination,
                description: event.description,
                pictures: event.photos,
              }
          )
        }
    );

    delete adaptedEvent.destination;
    delete adaptedEvent.description;
    delete adaptedEvent.photos;
    delete adaptedEvent.price;
    delete adaptedEvent.startTime;
    delete adaptedEvent.endTime;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}

