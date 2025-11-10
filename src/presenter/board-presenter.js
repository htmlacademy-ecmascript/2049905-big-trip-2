import { render } from '../render.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  sortingComponent = new SortingView();
  pointsListComponent = new PointsListView();

  constructor({ tripEventsContainer, pointModel, offersModel, destinationsModel }) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    const destinations = this.destinationsModel.getDestinations();

    render(this.sortingComponent, this.tripEventsContainer);
    render(this.pointsListComponent, this.tripEventsContainer);

    const pointsListElement = this.pointsListComponent.getElement();
    const pointOffersForEditing = this.offersModel.getOffersByType(points[0].type);

    render(new EditPointView(points[0], pointOffersForEditing, destinations), pointsListElement);

    for (let i = 1; i < points.length; i++) {
      const pointOffers = this.offersModel.getOffersByType(points[i].type);
      render(new PointView(points[i], pointOffers, destinations), pointsListElement);
    }

  }
}
