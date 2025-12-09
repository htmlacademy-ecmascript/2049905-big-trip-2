import { RenderPosition, render, remove, replace } from '../framework/render.js';
import { sortPointsTime, sortPointsPrice, sortPointsDay } from '../utils/point.js';
import { SortType, FilterType, UpdateType, UserAction, TimeLimit } from '../const.js';
import { filter } from '../utils/filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoView from '../view/trip-info-view.js';
import SortingView from '../view/sorting-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import LoadingFailView from '../view/loading-fail-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #tripEventsContainer = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #tripInfoComponent = null;
  #sortingComponent = null;
  #pointsListComponent = new PointsListView();
  #loadingComponent = new LoadingView();
  #loadingFailComponent = new LoadingFailView();
  #noPointsComponent = null;

  #newPointPresenter = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #filterType = null;

  #newEventButton = null;

  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ tripInfoContainer, tripEventsContainer, pointsModel, offersModel,
    destinationsModel, filterModel, newEventButton }) {

    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#newEventButton = newEventButton;

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      handlePointChange: this.#handleViewAction,
      handleNewPointFormClose: this.#handleNewPointFormClose
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventButton.addEventListener('click', this.#newEventBtnClickHandler);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch(this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointsTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsPrice);
    }
    return filteredPoints.sort(sortPointsDay);
  }

  init() {
    this.#newEventButton.disabled = true;

    this.#pointsModel.init()
      .finally(() => {
        this.#newEventButton.disabled = false;
      });

    this.#renderTripBoard();
  }

  #resetPointsEditing = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());

    this.#newEventButton.disabled = false;
  };

  #createNewPoint() {
    this.#resetPointsEditing();
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (!this.points.length) {
      remove(this.#noPointsComponent);
      render(this.#pointsListComponent, this.#tripEventsContainer);
    }

    this.#newPointPresenter.init(this.#offersModel.offers, this.#destinationsModel.destinations);
  }

  #renderTripBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    this.#renderTripInfo(this.#pointsModel.points);

    if (!points.length) {
      this.#renderNoPointsList();
      return;
    }

    this.#renderSorting();
    this.#renderPointsList();
    this.#renderPoints(points);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #renderTripInfo(points) {
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    }

    if (!points.length) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers
    });

    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      handleSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortingComponent, this.#tripEventsContainer);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripEventsContainer);
  }

  #renderNoPointsList() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render(this.#noPointsComponent, this.#tripEventsContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      handlePointChange: this.#handleViewAction,
      handleModeChange: this.#resetPointsEditing
    });

    pointPresenter.init({
      point,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations
    });

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearTripBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#loadingComponent);

    if (this.#noPointsComponent !== null) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }

    remove(this.#sortingComponent);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard();
        this.#renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this.#currentSortType = SortType.DAY;
        this.#clearTripBoard();
        this.#renderTripBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        replace(this.#loadingFailComponent, this.#loadingComponent);
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setResetting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
          this.#newPointPresenter.destroy();
        } catch (err) {
          this.#newPointPresenter.setResetting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setResetting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTripBoard();
    this.#renderTripBoard();
  };

  #newEventBtnClickHandler = () => {
    this.#resetPointsEditing();
    this.#createNewPoint();

    this.#newEventButton.disabled = true;
  };

  #handleNewPointFormClose = () => {
    this.#newEventButton.disabled = false;
    if (this.points.length === 0) {
      this.#pointsListComponent.element.replaceChildren();

      this.#renderNoPointsList();
    }
  };
}

