import {PHOTOS_MAX_COUNT} from "../../mock/consts";

const renderDestinationText = (description) => {
  return `
      <p class="event__destination-description">
        ${description}
      </p>
  `;
};

const getPhotoSrc = (src) => {
  return `<img class="event__photo" src="${src}" alt="Event photo">`;
};

const renderDestinationPhotos = (photos) => {
  if (!photos.length) {
    return ``;
  }

  const destinationPhotos = [];

  for (let i = 0; i < Math.min(photos.length, PHOTOS_MAX_COUNT); i++) {
    destinationPhotos.push(getPhotoSrc(photos[i]));
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${[...destinationPhotos].join(` `)}
      </div>
    </div>
  `;
};

const renderDestination = (description, photos, isEdit) => {
  return (!description) ? `` : `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${renderDestinationText(description)}
      ${(isEdit) ? `` : renderDestinationPhotos(photos)}
    </section>
  `;
};

export {
  renderDestination,
};


