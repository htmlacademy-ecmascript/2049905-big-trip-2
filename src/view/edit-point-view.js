import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils/utils.js';
import { POINT_TYPES } from '../const.js';

const createDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  const { description, pictures } = destination;

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

const createEditPointTemplate = (point, offers, checkedOffers, destination) => {
  const { basePrice, dateFrom, dateTo, type } = point;

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
            name="event-offer-luggage" ${checked}>
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

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

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
                name="event-destination" value="${destination.name}" list="destination-list-${pointId}">
              <datalist id="destination-list-${pointId}">
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text"
                name="event-start-time" value="${formatDate(dateFrom, 'CALENDAR_DATE')} ${formatDate(dateFrom, 'TIME')}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text"
                name="event-end-time" value="${formatDate(dateTo, 'CALENDAR_DATE')} ${formatDate(dateTo, 'TIME')}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${pointId}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${pointId}" type="text"
                name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
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

export default class EditPointView extends AbstractView {
  #point = null;
  #offers = null;
  #checkedOffers = null;
  #destination = null;
  #handleFormClick = null;
  #handleSaveBtnSubmit = null;

  constructor({ point, offers, checkedOffers, destination, onFormClick, onSaveBtnSubmit }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#destination = destination;
    this.#handleFormClick = onFormClick;
    this.#handleSaveBtnSubmit = onSaveBtnSubmit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#saveClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#offers, this.#checkedOffers, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClick();
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveBtnSubmit();
  };
}
