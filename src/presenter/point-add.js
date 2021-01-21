import {
  UserAction,
  UpdateType,
  EVENT_BLANC,
  RenderPosition,
} from '../consts';
import {
  setEventID,
} from '../utils/event';
import {
  render,
  remove,
} from '../utils/render';
import EventForm from '../view/event-form';

export default class PointAdd {
  constructor(formContainer, changeData) {
    this._formContainer = formContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventForm(EVENT_BLANC, true);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setResetButtonClickHandler(this._resetButtonClickHandler);

    render(this._formContainer, this._eventEditComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {
              id: setEventID()
            },
            event
        )
    );
    this.destroy();
  }

  _resetButtonClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
