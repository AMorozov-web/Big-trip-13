import Abstract from './abstract';

const createMenuTemplate = () => `
  <div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" data-name="table" href="#">Table</a>
      <a class="trip-tabs__btn" data-name="stats" href="#">Stats</a>
    </nav>
  </div>
`;

export default class SiteMenu extends Abstract {
  constructor() {
    super();

    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setActiveMenuItem(targetItem) {
    const needToActiveItem = this.getElement().querySelector(`[data-name=${targetItem}]`);
    const activedItem = this.getElement().querySelector(`.trip-tabs__btn--active`);

    if (needToActiveItem && activedItem) {
      activedItem.classList.remove(`trip-tabs__btn--active`);
      needToActiveItem.classList.add(`trip-tabs__btn--active`);
    }
  }

  _menuItemClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn`)
        && !evt.target.classList.contains(`trip-tabs__btn--active`)) {
      evt.preventDefault();

      const itemName = evt.target.dataset.name;

      this.setActiveMenuItem(itemName);
      this._callback.menuItemClick(itemName);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuItemClick = callback;
    this.getElement().addEventListener(`click`, this._menuItemClickHandler);
  }
}
