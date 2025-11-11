import { mockPoints as points } from '../mock/points';

export default class PointsModel {
  #points = [];

  constructor() {
    this.#points = [];
  }

  init() {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
