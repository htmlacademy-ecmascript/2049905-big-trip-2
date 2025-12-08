import { remove, render, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType, getDefaultPoint } from '../const.js';
import EditPointView from '../view/edit-point-view.js';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #editPointComponent = null;
  #handlePointChange = null;
  #handleNewPointFormClose = null;

  constructor({ pointsListContainer, onPointChange, onNewPointFormClose }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointChange = onPointChange;
    this.#handleNewPointFormClose = onNewPointFormClose;
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

    this.#handleNewPointFormClose();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#handleDocumentKeydown);
  }

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
      isDeleting: false,
    });
  }

  setResetting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
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
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
