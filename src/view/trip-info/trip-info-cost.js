const createCostTemplate = (events) => {
  let totalSum = 0;

  events.forEach((event) => {
    const {
      price,
      offers,
    } = event;

    if (offers.length) {
      totalSum += offers.map((offer) => offer.cost).reduce((a, b) => a + b);
    }

    totalSum += price;
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>
  `;
};

export {
  createCostTemplate,
};
