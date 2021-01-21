import Abstract from './abstract';

const createSiteControlsTemplate = () => `
  <div class="trip-main__trip-controls  trip-controls"></div>
`;

export default class SiteControls extends Abstract {
  getTemplate() {
    return createSiteControlsTemplate();
  }
}
