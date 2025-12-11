import { UpdateType } from '../const.js';

export default class DestinationsModel {
  #destinations = null;
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    this.#destinations = [];
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
    } catch (error) {
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
    }
  }
}
