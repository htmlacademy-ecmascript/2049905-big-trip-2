import { formatDate } from '../utils/common.js';
import { sortPointsDay, getPointViewData } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = (points, destinations, offers) => {
  if (!points.length) {
    return '';
  }

  const sortedPoints = [...points].sort(sortPointsDay);

  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  const dateFrom = firstPoint.dateFrom;
  const dateTo = lastPoint.dateTo;

  const allCities = sortedPoints
    .map((point) => getPointViewData(point, offers, destinations).destination?.name)
    .filter(Boolean);

  const citiesCount = allCities.length;

  let titleTripInfo = '';

  if (citiesCount === 0) {
    titleTripInfo = '';
  } else if (citiesCount <= 3) {
    titleTripInfo = allCities.join(' &mdash; ');
  } else {
    titleTripInfo = `${allCities[0]} &mdash; ... &mdash; ${allCities[citiesCount - 1]}`;
  }

  const totalTripPrice = sortedPoints.reduce((totalSum, point) => {
    const { checkedOffers } = getPointViewData(point, offers, destinations);
    const offersSum = checkedOffers.reduce((sum, offer) => sum + offer.price, 0);
    return totalSum + point.basePrice + offersSum;
  }, 0);

  const dateFromFormatted = dateFrom ? formatDate(dateFrom, 'SHORT_DATE') : '';
  const dateToFormatted = dateTo ? formatDate(dateTo, 'SHORT_DATE') : '';

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
