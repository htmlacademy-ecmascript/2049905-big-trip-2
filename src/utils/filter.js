import { FilterType } from '../const.js';
import { isPresentPoints, isFuturePoints, isPastPoints } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isFuturePoints(point.dateFrom)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isPresentPoints(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) =>
    points.filter((point) => isPastPoints(point.dateTo)),
};

export { filter };
