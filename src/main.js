import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersView from './view/filters-view.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const presenter = new BoardPresenter({
  tripEventsContainer,
  pointModel,
  offersModel,
  destinationsModel
});

render(new FiltersView(), filtersContainer);

pointModel.init();
offersModel.init();
destinationsModel.init();
presenter.init();
