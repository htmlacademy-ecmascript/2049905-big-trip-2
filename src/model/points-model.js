import Observable from '../framework/observable.js';
import { mockPoints, getRandomMockPoints } from '../mock/points';

export default class PointsModel extends Observable {
  #points = getRandomMockPoints(mockPoints);

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.push(update);

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((item) => item.id !== update.id);

    this._notify(updateType);
  }
}
