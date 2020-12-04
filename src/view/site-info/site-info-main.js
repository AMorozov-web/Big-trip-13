import dayjs from 'dayjs';

const createTripTemplate = (events) => {
  const destinations = new Set(events.map((event) => event.destination));
  const dates = events.map((event) => event.date);

  const getEndDate = () => (dayjs(dates[0]).format(`MMM`) === dayjs(dates[dates.length - 1]).format(`MMM`))
    ? `${dayjs(dates[dates.length - 1]).format(`DD`)}` : `${dayjs(dates[dates.length - 1]).format(`MMM DD`)}`;

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

export {
  createTripTemplate,
};
