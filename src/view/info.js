import {createTripTemplate} from './trip';
import {createCostTemplate} from './cost';

const createInfoContainerTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
            ${createTripTemplate()}
            ${createCostTemplate()}
          </section>`;
};

export {createInfoContainerTemplate};
