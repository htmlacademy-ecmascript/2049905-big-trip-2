import { getRandomInteger } from '../utils/utils.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers';

const COUNT_POINTS = 5;

const getRandomMockPoints = (items) => items.sort(() =>
  Math.random() - 0.5).slice(0, COUNT_POINTS);

const getRandomTypeAndOffers = () => {
  const typeGroup = mockOffers[getRandomInteger(0, mockOffers.length - 1)];

  const offers = typeGroup.offers
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, getRandomInteger(0, typeGroup.offers.length))
    .map((offer) => offer.id);

  return {
    type: typeGroup.type,
    offers
  };
};

export const mockPoints = [
  {
    id: '1',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2024-07-15T09:12:00.000Z',
    dateTo: '2024-07-15T09:48:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: true,
    ...getRandomTypeAndOffers()
  },
  {
    id: '2',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-01-02T22:00:00.000Z',
    dateTo: '2025-01-04T10:30:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '3',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-12T14:00:00.000Z',
    dateTo: '2025-11-20T15:10:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: true,
    ...getRandomTypeAndOffers()
  },
  {
    id: '4',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-20T08:45:00.000Z',
    dateTo: '2025-12-15T09:00:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '5',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2026-03-22T19:30:00.000Z',
    dateTo: '2026-03-27T08:00:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '6',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-12T07:00:00.000Z',
    dateTo: '2025-11-12T19:00:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '7',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2022-09-01T00:00:00.000Z',
    dateTo: '2022-09-10T23:59:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: true,
    ...getRandomTypeAndOffers()
  },
  {
    id: '8',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-13T13:45:00.000Z',
    dateTo: '2025-11-13T14:00:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '9',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-05-01T09:00:00.000Z',
    dateTo: '2025-05-03T18:00:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: false,
    ...getRandomTypeAndOffers()
  },
  {
    id: '10',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2024-12-31T23:59:00.000Z',
    dateTo: '2025-01-01T00:10:00.000Z',
    destination: mockDestinations[getRandomInteger(0, mockDestinations.length - 1)].id,
    isFavorite: true,
    ...getRandomTypeAndOffers()
  }
];

export { getRandomMockPoints };
