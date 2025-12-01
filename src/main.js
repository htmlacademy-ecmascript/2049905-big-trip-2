import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventBtn = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

newEventBtn.addEventListener('click', onNewEventButtonClick);

const handleNewPointFormClose = () => {
  newEventBtn.disabled = false;
};

const tripPresenter = new TripPresenter({
  tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

function onNewEventButtonClick() {
  tripPresenter.createPoint();
  newEventBtn.disabled = true;
}

const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  pointsModel
});

tripPresenter.init();
filterPresenter.init();
