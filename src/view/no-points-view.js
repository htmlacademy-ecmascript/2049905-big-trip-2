import { NoPointsTextByType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNoPointsTemplate = (filterType) =>
  `<p class="trip-events__msg">
    ${NoPointsTextByType[filterType]}
  `;

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
