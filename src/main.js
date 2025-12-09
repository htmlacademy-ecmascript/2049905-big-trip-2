import { AUTHORIZATION, END_POINT } from './const.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel({ pointsApiService });
const destinationsModel = new DestinationsModel({ pointsApiService });
const pointsModel = new PointsModel({
  pointsApiService,
  offersModel,
  destinationsModel
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripInfoContainer,
  tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  newEventButton
});

const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  pointsModel
});

tripPresenter.init();
filterPresenter.init();
