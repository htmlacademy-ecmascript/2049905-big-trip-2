import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import NoPointsView from '../view/no-points-view.js';

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
  #noPointsComponent = new NoPointsView();

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
    render(this.#sortingComponent, this.#tripEventsContainer);
    render(this.#pointsListComponent, this.#tripEventsContainer);

    if (!this.#points.length) {
      render(new NoPointsView(), this.#pointsListComponent.element);
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint({
        point: this.#points[i],
        offers: this.#offersModel.getOffersByType(this.#points[i].type),
        checkedOffers: this.#offersModel.getOffersById(this.#points[i].type, this.#points[i].offers),
        destination: this.#destinationsModel.getDestinationById(this.#points[i].destination)
      });
    }

  }

  #renderPoint({point, offers, checkedOffers, destination}) {
    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    const pointComponent = new PointView({
      point,
      checkedOffers,
      destination,
      onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', onDocumentKeydown);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      offers,
      checkedOffers,
      destination,
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

