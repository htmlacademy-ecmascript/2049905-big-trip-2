import { formatDate } from '../utils/common.js';
import { getPointViewData, getDateTimeDifference } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const createPointTemplate = ({ point, checkedOffers, destination }) => {

  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;

  const offersListSelected = checkedOffers.map((offer) => (
    `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `
  )).join('');

  const favoritePoint = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime=${formatDate(dateFrom, 'FULL_DATE')}>${formatDate(dateFrom, 'DATE')}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${formatDate(dateFrom, 'FULL_DATE_TIME')}>${formatDate(dateFrom, 'TIME')}</time>
              &mdash;
              <time class="event__end-time" datetime=${formatDate(dateTo, 'FULL_DATE_TIME')}>${formatDate(dateTo, 'TIME')}</time>
            </p>
            <p class="event__duration">${getDateTimeDifference(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersListSelected}
          </ul>
          <button class="event__favorite-btn ${favoritePoint}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #callbacks = {};

  constructor({ point, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#callbacks.editClick = onEditClick;
    this.#callbacks.favoriteClick = onFavoriteClick;

    this.#setHandlers();
  }

  get template() {
    const { checkedOffers, destination } = getPointViewData(
      this.#point,
      this.#offers,
      this.#destinations
    );

    return createPointTemplate({
      point: this.#point,
      checkedOffers,
      destination,
    });
  }

  #setHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleEditClick);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#handleFavoriteClick);
  }

  #handleEditClick = (evt) => {
    evt.preventDefault();
    this.#callbacks.editClick?.();
  };

  #handleFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#callbacks.favoriteClick?.();
  };
}
