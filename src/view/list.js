import {generateEvent} from '../mock/event';
import {createEditEventFormTemplate} from './edit';
import {createEventTemplate} from './event/event';

const EVENTS_COUNT = 3;
let fragment = ``;

for (let i = 0; i < EVENTS_COUNT; i++) {
  const event = generateEvent();
  fragment = fragment.concat(createEventTemplate(event));
}

const createListTemplate = () => {
  return `<ul class="trip-events__list">
            ${createEditEventFormTemplate()}
            ${fragment}
          </ul>`;
};

export {createListTemplate};
