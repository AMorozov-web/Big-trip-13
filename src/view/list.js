import dayjs from 'dayjs';
import {generateEvent} from '../mock/event';
import {createEditEventFormTemplate} from './form/edit';
import {createEventTemplate} from './event/event';

const EVENTS_COUNT = 18;

const events = Array(EVENTS_COUNT).fill().map(() => generateEvent()).sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));

let fragment = ``;

for (let i = 1; i < events.length; i++) {
  fragment = fragment.concat(createEventTemplate(events[i]));
}

const createListTemplate = () => {
  return `
    <ul class="trip-events__list">
      ${createEditEventFormTemplate(events[0])}
      ${fragment}
    </ul>
  `;
};

export {
  createListTemplate,
  events,
};
