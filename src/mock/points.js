import { getRandomInteger } from '../utils.js';

export const mockPoints = [
  {
    id: '1',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-10-05T09:15:00.000Z',
    dateTo: '2025-10-05T12:45:00.000Z',
    destination: '1',
    isFavorite: true,
    offers: ['1', '3'],
    type: 'train'
  },
  {
    id: '2',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-09T14:00:00.000Z',
    dateTo: '2025-11-09T18:45:00.000Z',
    destination: '2',
    isFavorite: false,
    offers: ['1', '2', '3'],
    type: 'bus'
  },
  {
    id: '3',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2025-11-22T08:00:00.000Z',
    dateTo: '2025-11-23T10:30:00.000Z',
    destination: '3',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: '4',
    basePrice: getRandomInteger(100, 2000),
    dateFrom: '2026-01-10T06:00:00.000Z',
    dateTo: '2026-01-10T13:45:00.000Z',
    destination: '4',
    isFavorite: false,
    offers: ['3'],
    type: 'flight'
  }
];
