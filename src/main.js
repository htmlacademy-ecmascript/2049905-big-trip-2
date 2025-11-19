import { render } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersView from './view/filters-view.js';
import { generateFilter } from './mock/filters.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const presenter = new TripPresenter({
  tripEventsContainer,
  pointModel,
  offersModel,
  destinationsModel
});

const filters = generateFilter(pointModel.points);

render(new FiltersView({filters}), filtersContainer);

presenter.init();
