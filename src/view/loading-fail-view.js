import AbstractView from '../framework/view/abstract-view.js';

const createLoadingFailTemplate = () =>
  `<p class="trip-events__msg">
    Failed to load latest route information</p>
  `;

export default class LoadingFailView extends AbstractView {
  get template() {
    return createLoadingFailTemplate();
  }
}
