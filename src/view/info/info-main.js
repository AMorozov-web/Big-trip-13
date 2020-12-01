import {createTripTemplate} from './info-trip';
import {createCostTemplate} from './info-cost';

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
