import { UpdateType } from '../const.js';

export default class OffersModel {
  #offers = null;
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    this.#offers = [];
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch (error) {
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }

  get offers() {
    return this.#offers;
  }
}
