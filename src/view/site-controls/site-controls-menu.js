const createMenuTemplate = (isTable = true) => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn ${(isTable) ? `trip-tabs__btn--active` : ``}" href="#">Table</a>
      <a class="trip-tabs__btn ${(isTable) ? `` : `trip-tabs__btn--active`}" href="#">Stats</a>
    </nav>
  `;
};

export {
  createMenuTemplate,
};
