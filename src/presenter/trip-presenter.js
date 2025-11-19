import { render } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #pointModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = null;

  #sortingComponent = new SortingView();
  #pointsListComponent = new PointsListView();
  #noPointsComponent = new NoPointsView();

  #pointPresenters = new Map();

  constructor({ tripEventsContainer, pointModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = this.#pointModel.points;

    this.#renderFullTrip();
  }

  #renderFullTrip() {
    this.#renderSorting();
    this.#renderPointsList();

    if (!this.#points.length) {
      this.#renderNoPointsList();
      return;
    }

    this.#renderPoints();
  }

  #renderSorting() {
    render(this.#sortingComponent, this.#tripEventsContainer);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripEventsContainer);
  }

  #renderNoPointsList() {
    render(this.#noPointsComponent, this.#pointsListComponent.element);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init({
      point,
      offers: this.#offersModel.getOffersByType(point.type),
      checkedOffers: this.#offersModel.getOffersById(point.type, point.offers),
      destination: this.#destinationsModel.getDestinationById(point.destination)
    });

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);

    const pointPresenter = this.#pointPresenters.get(updatedPoint.id);

    pointPresenter.init({
      point: updatedPoint,
      offers: this.#offersModel.getOffersByType(updatedPoint.type),
      checkedOffers: this.#offersModel.getOffersById(updatedPoint.type, updatedPoint.offers),
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination)
    });
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}

