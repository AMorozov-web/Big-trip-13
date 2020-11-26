import {createMenuTemplate} from './menu';
import {createFiltersTemplate} from './filters';

const createControlsTemplate = () => {
  return `
    <h2 class="visually-hidden">Switch trip view</h2>
      ${createMenuTemplate()}
    <h2 class="visually-hidden">Filter events</h2>
      ${createFiltersTemplate()}
  `;
};

export {
  createControlsTemplate,
};
