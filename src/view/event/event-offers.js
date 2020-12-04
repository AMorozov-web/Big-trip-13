const getOfferTemplate = (offer) => {
  const {
    title,
    cost,
  } = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${cost}</span>
    </li>
  `;
};

const renderOffers = (offers) => {
  if (!offers.length) {
    return ``;
  }

  const offersList = [];

  offers.forEach((offer) => {
    offersList.push(getOfferTemplate(offer));
  });

  return `
    <ul class="event__selected-offers">
      ${[...offersList].join(` `)}
    </ul>
  `;
};

export {
  renderOffers,
};
