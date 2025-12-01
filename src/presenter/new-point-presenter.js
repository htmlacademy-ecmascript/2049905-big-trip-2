import EditPointView from '../view/edit-point-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { getRandomInteger, isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType, getDefaultPoint } from '../const.js';


export default class NewPointPresenter {
  #pointsListContainer = null;
  #editPointComponent = null;
  #handlePointChange = null;
  #handleNewPointDestroy = null;

  constructor({ pointsListContainer, onPointChange, onNewPointDestroy }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointChange = onPointChange;
    this.#handleNewPointDestroy = onNewPointDestroy;
  }

  init(offers, destinations) {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      point: getDefaultPoint(),
      offers: offers,
      destinations: destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#editPointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#handleDocumentKeydown);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleNewPointDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#handleDocumentKeydown);
  }

  #handleDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handlePointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {
        ...point,
        id: getRandomInteger(15, 100)},
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
