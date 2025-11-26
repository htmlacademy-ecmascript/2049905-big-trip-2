import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #isEditing = false;

  constructor({ pointsListContainer, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, offers, destinations }) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point,
      offers,
      destinations,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point,
      offers,
      destinations,
      onFormClick: () => {
        this.#replaceEditFormToPoint();
      },
      onSaveBtnSubmit: () => {
        this.#replaceEditFormToPoint();
      }
    });

    this.#editPointComponent._restoreHandlers();

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#pointsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsListContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#isEditing = true;
    document.addEventListener('keydown', this.#onDocumentKeydown);
  }

  #replaceEditFormToPoint() {
    this.#editPointComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editPointComponent);
    this.#isEditing = false;
    document.removeEventListener('keydown', this.#onDocumentKeydown);
  }

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  #handleEditClick = () => {
    if(!this.#isEditing) {
      this.#handleModeChange();
      this.#replacePointToEditForm();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  resetView() {
    if (this.#isEditing) {
      this.#replaceEditFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }
}
