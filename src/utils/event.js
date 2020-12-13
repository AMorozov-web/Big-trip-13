import dayjs from 'dayjs';

import {
  MINUTES_IN_HOUR,
  MINUTES_IN_DAY,
  HOURS_IN_DAY,
} from '../consts';

const getDuration = (start, end) => {
  const durationInMinutes = dayjs(end).diff(start, `minutes`);
  const durationInHours = Math.floor(durationInMinutes / MINUTES_IN_HOUR);
  const durationInDays = Math.floor(durationInHours / HOURS_IN_DAY);

  if (durationInMinutes < MINUTES_IN_HOUR) {
    return `${durationInMinutes.toString().padStart(2, 0)}M`;
  } else if (durationInMinutes >= MINUTES_IN_HOUR && durationInMinutes < MINUTES_IN_DAY) {
    return `${durationInHours.toString().padStart(2, 0)}H
            ${(+durationInMinutes - durationInHours * MINUTES_IN_HOUR).toString().padStart(2, 0)}M`;
  } else {
    return `${(durationInDays).toString().padStart(2, 0)}D
            ${(+durationInHours - durationInDays * HOURS_IN_DAY).toString().padStart(2, 0)}H
            ${(+durationInMinutes - durationInHours * MINUTES_IN_HOUR).toString().padStart(2, 0)}M`;
  }
};

const calcDuration = (event) => dayjs(event.endTime).diff(event.startTime, `minutes`);

export {
  getDuration,
  calcDuration,
};
