import { mockOffers } from '../mock/offers';

export default class OffersModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getOffersById(type, offersIds) {
    return this.getOffersByType(type).filter((offer) =>
      offersIds.find((id) => offer.id === id));
  }

}
