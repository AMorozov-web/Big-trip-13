const createCostTemplate = (items) => {
  let totalSum = 0;

  items.forEach((item) => {
    const {
      price,
      offers,
    } = item;

    if (offers.length !== 0) {
      totalSum += (+(Object.values(...offers).slice(1).toString()));
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
