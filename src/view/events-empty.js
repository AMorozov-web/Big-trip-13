import Abstract from './abstract';

const createEmptyMessageTemplate = () => `
  <p class="trip-events__msg">
    Click New Event to create your first point
  </p>
`;

export default class EventsEmpty extends Abstract {
  getTemplate() {
    return createEmptyMessageTemplate();
  }
}
