const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DateFormat = {
  DATE: 'MMM DD',
  FULL_DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  FULL_DATE_TIME: 'YYYY-MM-DDTHH:mm',
  CALENDAR_DATE: 'DD/MM/YY',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const NoPointsTextByType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const getDefaultPoint = () => ({
  id: null,
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[1]
});

export {
  POINT_TYPES,
  DateFormat,
  FilterType,
  NoPointsTextByType,
  SortType,
  UpdateType,
  UserAction,
  Method,
  getDefaultPoint
};
