import {PHOTOS_MAX_COUNT} from "../../mock/consts";

const renderDestinationText = (description) => {
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${description}
      </p>
    </section>
  `;
};

const getPhotoSrc = (src) => {
  return `<img class="event__photo" src="${src}" alt="Event photo">`;
};

const renderDestinationPhotos = (photos) => {
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
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
  renderDestinationText,
  renderDestinationPhotos,
};