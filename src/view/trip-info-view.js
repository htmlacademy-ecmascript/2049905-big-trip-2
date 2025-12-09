import { formatDate } from '../utils/common.js';
import { sortPointsDay, getPointViewData } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const MAX_COUNT_CITIES = 3;

const getSortedPointsByDay = (points) => [...points].sort(sortPointsDay);

const getTripTitle = (sortedPoints, destinations, offers) => {
  const allCities = sortedPoints
    .map((point) => getPointViewData(point, offers, destinations).destination?.name)
    .filter(Boolean);

  const citiesCount = allCities.length;

  if (citiesCount === 0) {
    return '';
  }

  if (citiesCount <= MAX_COUNT_CITIES) {
    return allCities.join(' &mdash; ');
  }

  return `${allCities[0]} &mdash; ... &mdash; ${allCities[citiesCount - 1]}`;
};

const getTripDates = (sortedPoints) => {
  if (!sortedPoints.length) {
    return {
      dateFromFormatted: '',
      dateToFormatted: ''
    };
  }

  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  const dateFromFormatted = firstPoint.dateFrom
    ? formatDate(firstPoint.dateFrom, 'SHORT_DATE')
    : '';

  const dateToFormatted = lastPoint.dateTo
    ? formatDate(lastPoint.dateTo, 'SHORT_DATE')
    : '';

  return { dateFromFormatted, dateToFormatted };
};

const getTotalTripPrice = (sortedPoints, destinations, offers) =>
  sortedPoints.reduce((totalSum, point) => {
    const { checkedOffers } = getPointViewData(point, offers, destinations);
    const offersSum = checkedOffers.reduce((sum, offer) => sum + offer.price, 0);

    return totalSum + point.basePrice + offersSum;
  }, 0);

const createTripInfoTemplate = (points, destinations, offers) => {
  if (!points.length) {
    return '';
  }

  const sortedPoints = getSortedPointsByDay(points);
  const titleTripInfo = getTripTitle(sortedPoints, destinations, offers);
  const { dateFromFormatted, dateToFormatted } = getTripDates(sortedPoints);
  const totalTripPrice = getTotalTripPrice(sortedPoints, destinations, offers);

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${titleTripInfo}</h1>

        <p class="trip-info__dates">
          ${dateFromFormatted}&nbsp;&mdash;&nbsp;${dateToFormatted}
        </p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripPrice}</span>
      </p>
    </section>
  `;
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(
      this.#points,
      this.#destinations,
      this.#offers
    );
  }
}
