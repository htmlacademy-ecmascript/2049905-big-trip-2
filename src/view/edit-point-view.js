import { capitalizeFirstLetter, formatDate } from '../utils/common.js';
import { getPointViewData } from '../utils/point.js';
import { POINT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

const createDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  const { description, pictures = [] } = destination;

  if (!description && pictures.length === 0) {
    return '';
  }

  const descriptionTemplate = description
    ? `<p class="event__destination-description">${description}</p>`
    : '';

  const picturesTemplate = pictures.length
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((photo) => `
            <img
              class="event__photo"
              src="${photo.src}"
              alt="${photo.description}"
            >
          `).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <section class="event__section event__section--destination">
      ${descriptionTemplate}
      ${picturesTemplate}
    </section>
  `;
};

const createEditPointTemplate = ({ point, offers, checkedOffers, destinations, destination }) => {
  const { id, basePrice, dateFrom, dateTo, type, isDisabled, isSaving, isDeleting } = point;

  const pointId = point.id;

  const pointTypesList = POINT_TYPES.map((pointType) => {
    const eventTypeId = `event-type-${pointType}-${pointId}`;
    const checkedPointType = pointType === type ? 'checked' : '';
    return `
      <div class="event__type-item">
        <input id="${eventTypeId}" class="event__type-input visually-hidden"
          type="radio" name="event-type" value="${pointType}" ${checkedPointType}>
        <label class="event__type-label event__type-label--${pointType}" for="${eventTypeId}">
          ${capitalizeFirstLetter(pointType)}
        </label>
      </div>`;
  }).join('');

  const destinationList = destinations.map((dest) =>
    `
      <option value="${dest.name}"></option>
    `
  ).join('');


  const pointOffersList = offers.length
    ? `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
    ${offers.map((offer) => {
    const eventOfferId = `event-offer-${offer.title}-${pointId}`;
    const checked = checkedOffers.some((pointOffer) => pointOffer.id === offer.id) ? 'checked' : '';
    return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="${eventOfferId}" type="checkbox"
            name="event-offer-luggage" data-offer-id="${offer.id}" ${checked}
            ${isDisabled ? 'disabled' : ''}
          >
          <label class="event__offer-label" for="${eventOfferId}">
            <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
  }).join('')}
      </div>
    </section>
    `
    : '';

  const isNewPoint = id
    ? `
    <button class="event__reset-btn" type="reset"
      ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    `
    : '<button class="event__reset-btn" type="reset">Cancel</button>';

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17"
                  src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}"
                type="checkbox"
                ${isDisabled ? 'disabled' : ''}
              >

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                    ${pointTypesList}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${pointId}">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text"
                name="event-destination" value='${destination.name ? he.encode(destination.name) : ''}'
                list="destination-list-${pointId}" required autocomplete="off" ${isDisabled ? 'disabled' : ''}>
              <datalist id="destination-list-${pointId}">
                 ${destinationList}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text"
                name="event-start-time" value="${dateFrom ? `${formatDate(dateFrom, 'CALENDAR_DATE')}
                  ${formatDate(dateFrom, 'TIME')}` : ''}"
                ${isDisabled ? 'disabled' : ''}
              >
              &mdash;
              <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text"
                name="event-end-time" value="${dateTo ? `${formatDate(dateTo, 'CALENDAR_DATE')}
                  ${formatDate(dateTo, 'TIME')}` : ''}"
                ${isDisabled ? 'disabled' : ''}
              >
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${pointId}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${pointId}" type="number"
                name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
            </div>

            <button class="event__save-btn btn btn--blue" type="submit"
              ${isDisabled ? 'disabled' : ''}>
              ${isSaving ? 'Saving...' : 'Save'}
            </button>
            ${isNewPoint}
          </header>
          <section class="event__details">
                ${pointOffersList}
                ${createDestinationTemplate(destination)}
          </section>
        </form>
      </li>
    `
  );
};

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #handleCloseClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ point, offers, destinations,
    handleCloseClick, handleFormSubmit, handleDeleteClick }) {
    super();

    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleCloseClick = handleCloseClick;
    this.#handleFormSubmit = handleFormSubmit;
    this.#handleDeleteClick = handleDeleteClick;

    this._setState(EditPointView.parsePointToState(point));

    this._restoreHandlers();
  }

  get template() {
    const { offersByType, checkedOffers, destination } = getPointViewData(
      this._state,
      this.#offers,
      this.#destinations
    );

    return createEditPointTemplate({
      point: this._state,
      offers: offersByType,
      checkedOffers,
      destinations: this.#destinations,
      destination,
    });
  }

  reset(point) {
    this._setState(
      EditPointView.parsePointToState(point)
    );

    this.updateElement(this._state);
  }

  removeElement() {
    this.#startDatepicker?.destroy();
    this.#startDatepicker = null;

    this.#endDatepicker?.destroy();
    this.#endDatepicker = null;

    super.removeElement();
  }

  _restoreHandlers() {
    this.#setHandlers();
    this.#setDatepickers();
  }

  #setHandlers() {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#inputPriceInputHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((checkbox) =>
        checkbox.addEventListener('change', this.#offerCheckboxChangeHandler)
      );

    const rollupBtn = this.element.querySelector('.event__rollup-btn');

    if(rollupBtn) {
      rollupBtn.addEventListener('click', this.#rollupBtnClickHandler);
    }

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formPointSubmitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#resetBtnClickHandler);
  }

  #setDatepickers () {
    this.#startDatepicker?.destroy();
    this.#startDatepicker = null;

    this.#endDatepicker?.destroy();
    this.#endDatepicker = null;

    const startTimeInput = this.element
      .querySelector('input[name="event-start-time"]');
    const endTimeInput = this.element
      .querySelector('input[name="event-end-time"]');

    const DatepickerCommonConfig = {
      'time_24hr': true,
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      locale: { firstDayOfWeek: 1 }
    };

    this.#startDatepicker = flatpickr(startTimeInput, {
      ...DatepickerCommonConfig,
      defaultDate: this._state.dateFrom,
      onChange: this.#startDateChangeHandler,
    });

    this.#endDatepicker = flatpickr(endTimeInput, {
      ...DatepickerCommonConfig,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onChange: this.#endDateChangeHandler,
    });
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      ...this._state,
      type: newType,
      offers: []
    });
  };

  #inputDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    const value = evt.target.value.trim();
    const selectedDestination = this.#destinations.find(
      (dest) => dest.name === value
    );

    if (selectedDestination) {
      this.updateElement({
        ...this._state,
        destination: selectedDestination.id,
      });
    } else {
      const currentDestination = this.#destinations.find(
        (dest) => dest.id === this._state.destination
      );
      evt.target.value = currentDestination ? currentDestination.name : '';
    }
  };

  #inputPriceInputHandler = (evt) => {
    evt.preventDefault();

    const value = evt.target.value;

    if (value === '') {
      return;
    }

    const newPrice = Number(value);

    if (Number.isNaN(newPrice) || newPrice <= 0) {
      return;
    }

    this._setState({
      ...this._state,
      basePrice: newPrice,
    });
  };

  #offerCheckboxChangeHandler = (evt) => {
    const { checked, dataset } = evt.target;
    const offerId = dataset.offerId;
    const oldOffers = this._state.offers ?? [];

    let newOffers;

    if (checked) {
      newOffers = oldOffers.includes(offerId)
        ? oldOffers
        : [...oldOffers, offerId];
    } else {
      newOffers = oldOffers.filter((id) => id !== offerId);
    }

    this._setState({
      ...this._state,
      offers: newOffers,
    });
  };

  #startDateChangeHandler = ([newStartDate]) => {
    this._setState({
      ...this._state,
      dateFrom: newStartDate
    });

    this.#endDatepicker.set('minDate', newStartDate);
  };

  #endDateChangeHandler = ([newEndDate]) => {
    this._setState({
      ...this._state,
      dateTo: newEndDate
    });
  };

  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick?.();
  };

  #formPointSubmitHandler = (evt) => {
    evt.preventDefault();

    const destinationInput = this.element.querySelector('.event__input--destination');
    const inputValue = destinationInput.value.trim();
    const validDestinationNames = this.#destinations.map((dest) => dest.name);

    if (validDestinationNames.includes(inputValue)) {
      this.#handleFormSubmit?.(EditPointView.parseStateToPoint(this._state));
    }
  };

  #resetBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick?.(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}

