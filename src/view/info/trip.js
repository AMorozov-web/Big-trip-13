import dayjs from 'dayjs';

const createTripTemplate = (items) => {
  const destinations = new Set(items.map((item) => item.destination));
  const dates = items.map((item) => item.date);

  const getEndDate = () => {
    return (dayjs(dates[0]).format(`MMM`) === dayjs(dates[dates.length - 1]).format(`MMM`))
      ? `${dayjs(dates[dates.length - 1]).format(`DD`)}` : `${dayjs(dates[dates.length - 1]).format(`MMM DD`)}`;
  };

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${[...destinations].join(` &mdash; `)}
      </h1>

      <p class="trip-info__dates">
        ${dayjs(dates[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${getEndDate()}
      </p>
    </div>
  `;
};

export {createTripTemplate};
