import { mockOffers as offers} from '../mock/offers';

export default class OffersModel {

  constructor() {
    this.offers = [];
  }

  init() {
    this.offers = offers;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

}
