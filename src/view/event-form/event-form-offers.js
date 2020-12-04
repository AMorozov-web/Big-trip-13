const getOffer = (offer) => {
  const {
    title,
    cost,
  } = offer;

  const getClassNamePart = (str) => {
    const splitStr = str.split(` `);

    return splitStr[splitStr.length - 1];
  };

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassNamePart(title)}-1" type="checkbox"
      name="event-offer-${getClassNamePart(title)}" checked="">
      <label class="event__offer-label" for="event-offer-${getClassNamePart(title)}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${cost}</span>
      </label>
    </div>
  `;
};

const renderOffers = (offers) => {
  if (!offers.length) {
    return ``;
  }

  const offersList = [];

  offers.forEach((value) => {
    offersList.push(getOffer(value));
  });

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${[...offersList].join(` `)}
      </div>
    </section>
  `;
};

export {
  renderOffers,
};
