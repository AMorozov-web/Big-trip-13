import Abstract from "./abstract";

const createLoadingMessage = () => `
  <p class="trip-events__msg">
    Loading...
  </p>
`;

export default class EventsLoading extends Abstract {
  getTemplate() {
    return createLoadingMessage();
  }
}
