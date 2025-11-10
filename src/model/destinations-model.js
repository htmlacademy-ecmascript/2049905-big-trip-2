import { mockDestinations as destinations } from '../mock/destinations.js';

export default class DestinationsModel {

  constructor() {
    this.destinations = [];
  }

  init() {
    this.destinations = destinations;
  }

  getDestinations() {
    return this.destinations;
  }
}
