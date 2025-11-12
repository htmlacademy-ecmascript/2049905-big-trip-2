import { mockPoints, getRandomMockPoints } from '../mock/points';

export default class PointsModel {
  #points = getRandomMockPoints(mockPoints);

  get points() {
    return this.#points;
  }
}
