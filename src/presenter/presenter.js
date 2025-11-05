import { render } from '../render.js';
import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

const POINTS_COUNT = 3;

export default class Presenter {
  constructor({ filtersContainer, tripEventsContainer }) {
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointsListComponent = new PointsListView();
  }

  init() {
    render(new FiltersView(), this.filtersContainer);
    render(new SortingView(), this.tripEventsContainer);
    render(this.pointsListComponent, this.tripEventsContainer);
    render(new EditPointView(), this.pointsListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.pointsListComponent.getElement());
    }
  }
}
