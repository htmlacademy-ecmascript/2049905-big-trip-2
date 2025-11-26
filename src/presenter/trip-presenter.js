import { render } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { sortPointsTime, sortPointsPrice, sortPointsDay } from '../utils/point.js';
import { SortType } from '../const.js';
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
  #sortingComponent = null;
  #sourcePoints = null;

  #pointsListComponent = new PointsListView();
  #noPointsComponent = new NoPointsView();

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({ tripEventsContainer, pointModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointModel.points].sort(sortPointsDay);

    this.#sourcePoints = [...this.#points];

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
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

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
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations
    });

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsPrice);
        break;
      default:
        this.#points = [...this.#sourcePoints];
    }

    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcePoints = updateItem(this.#sourcePoints, updatedPoint);

    const pointPresenter = this.#pointPresenters.get(updatedPoint.id);

    pointPresenter.init({
      point: updatedPoint,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations
    });
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}

