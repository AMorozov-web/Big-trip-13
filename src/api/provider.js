import {
  isOnline,
} from "../utils/common.js";
import Events from '../model/events';

const AddDataKey = {
  DESTINATIONS: `DESTINATIONS`,
  OFFERS: `OFFERS`,
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(Events.adaptToServer));
          this._store.setItems(items);
          return events;
        });
    }

    const eventsInStore = Object.values(this._store.getItems());

    return Promise.resolve(eventsInStore.map(Events.adaptToClient));
  }

  getDestinations(init = false) {
    if (isOnline() && init) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setAddData(AddDataKey.DESTINATIONS, destinations);
          return destinations;
        });
    }

    return init ? Promise.resolve(this._store.getAddData(AddDataKey.DESTINATIONS))
      : this._store.getAddData(AddDataKey.DESTINATIONS);
  }

  getOffers(init = false) {
    if (isOnline() && init) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setAddData(AddDataKey.OFFERS, offers);
          return offers;
        });
    }

    return init ? Promise.resolve(this._store.getAddData(AddDataKey.OFFERS))
      : this._store.getAddData(AddDataKey.OFFERS);
  }

  getAllData() {
    return Promise
      .all([
        this.getEvents(),
        this.getDestinations(true),
        this.getOffers(true)
      ])
      .then(([events]) => {
        return events;
      })
      .catch(() => {
        this._store.setAddData(AddDataKey.DESTINATIONS, []);
        this._store.setAddData(AddDataKey.OFFERS, []);
      });
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, Events.adaptToServer(newEvent));
          return newEvent;
        });
    }

    return Promise.reject(new Error(`Add new event failed`));
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeItem(event.id));
    }

    return Promise.reject(new Error(`Delete event failed`));
  }

  updateEvent(event) {
    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updated) => {
          this._store.setItem(updated.id, Events.adaptToServer(updated));
          return updated;
        });
    }

    this._store.setItem(event.id, Events.adaptToServer(Object.assign({}, event)));

    return Promise.resolve(event);
  }

  sync() {
    if (isOnline()) {
      const eventsInStore = Object.values(this._store.getItems());

      return this._api.sync(eventsInStore)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
