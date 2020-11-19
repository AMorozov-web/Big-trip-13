import {createEditEventFormTemplate} from './edit';
import {createEventTemplate} from './event';

const EVENTS_COUNT = 3;
let fragment = ``;

for (let i = 0; i < EVENTS_COUNT; i++) {
  fragment = fragment.concat(createEventTemplate());
}

const createListTemplate = () => {
  return `<ul class="trip-events__list">
            ${createEditEventFormTemplate()}
            ${fragment}
          </ul>`;
};

export {createListTemplate};
