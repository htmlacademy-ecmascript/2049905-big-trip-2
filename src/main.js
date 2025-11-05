import Presenter from './presenter/presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const presenter = new Presenter({ filtersContainer, tripEventsContainer });

presenter.init();
