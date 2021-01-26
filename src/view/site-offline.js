import Abstract from './abstract';

const createSiteOfflineMessageTemplate = () => {
  return `
    <div class="offline-message">
      <p class="offline-message__text">No connection. You're offline</p>
    </div>
  `;
};

export default class SiteOffline extends Abstract {
  getTemplate() {
    return createSiteOfflineMessageTemplate();
  }
}
