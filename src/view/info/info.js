import {createTripTemplate} from './trip';
import {createCostTemplate} from './cost';

const createInfoContainerTemplate = (events) => {
  return `
    <section class="trip-main__trip-info  trip-info">
      ${createTripTemplate(events)}
      ${createCostTemplate(events)}
    </section>
  `;
};

export {
  createInfoContainerTemplate,
};
