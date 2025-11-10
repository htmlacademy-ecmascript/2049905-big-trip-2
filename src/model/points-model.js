import { mockPoints as points } from '../mock/points';

export default class PointsModel {

  constructor() {
    this.points = [];
  }

  init() {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }
}
