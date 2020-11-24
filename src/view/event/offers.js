const generateOffers = (event) => {
  const offers = event.offers;
  let offersList = ``;

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

  offers.forEach((offer) => {
    offersList = offersList.concat(getOfferTemplate(offer));
  });

  return `
    <ul class="event__selected-offers">
      ${offersList}
    </ul>
  `;
};

export {
  generateOffers,
};
