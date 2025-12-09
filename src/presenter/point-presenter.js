import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType } from '../const.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #pointsListContainer = null;
  #handlePointChange = null;
  #handleModeChange = null;

  #isEditing = false;

  constructor({ pointsListContainer, handlePointChange, handleModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointChange = handlePointChange;
    this.#handleModeChange = handleModeChange;
  }

  init({ point, offers, destinations }) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point,
      offers,
      destinations,
      handleEditClick: this.#handleEditClick,
      handleFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point,
      offers,
      destinations,
      handleCloseClick: this.#handleCloseClick,
      handleFormSubmit: this.#handleFormSubmit,
      handleDeleteClick: this.#handleDeleteClick
    });

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

  setSaving() {
    if (this.#isEditing) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
        isDeleting: false,
      });
    }
  }

  setDeleting() {
    if (this.#isEditing) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: false,
        isDeleting: true,
      });
    }
  }

  setResetting() {
    if (!this.#isEditing) {
      this.#pointComponent.shake();
      return;
    }

    const reset = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(reset);
  }

  resetView() {
    if (!this.#isEditing) {
      return;
    }

    this.#editPointComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#isEditing = true;
    document.addEventListener('keydown', this.#documentKeydownHandler);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#isEditing = false;
    document.removeEventListener('keydown', this.#documentKeydownHandler);
  }

  #documentKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.resetView();
    }
  };

  #handleEditClick = () => {
    if(!this.#isEditing) {
      this.#handleModeChange();
      this.#replacePointToEditForm();
    }
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleFormSubmit = (update) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update
    );
  };

  #handleCloseClick = () => {
    this.resetView();
  };

  #handleDeleteClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
