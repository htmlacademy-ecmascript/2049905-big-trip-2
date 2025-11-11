import { render, replace } from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  #tripEventsContainer = null;
  #pointModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = null;
  #offers = null;
  #destinations = null;

  #sortingComponent = new SortingView();
  #pointsListComponent = new PointsListView();

  constructor({ tripEventsContainer, pointModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#pointModel.init();
    this.#offersModel.init();
    this.#destinationsModel.init();

    this.#points = this.#pointModel.points;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    this.#renderTrip();
  }

  #renderTrip() {
    render(this.#sortingComponent, this.#tripEventsContainer);
    render(this.#pointsListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers, this.#destinations);
    }
  }

  #renderPoint(point) {
    const onDocumentKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    const pointComponent = new PointView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', onDocumentKeydown);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      },
      onSaveBtnSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    });

    render(pointComponent, this.#pointsListComponent.element);

    function replacePointToEditForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

  }

}

