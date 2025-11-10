import { getRandomInteger } from '../utils.js';
export const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Comfort ride with free Wi-Fi',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Business class vehicle upgrade',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Express airport transfer',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '1',
        title: 'Extra legroom seat upgrade',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Priority boarding pass',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Onboard meal and drink package',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '1',
        title: 'First class seat upgrade',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Meal service on board',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Quiet coach option',
        price: getRandomInteger(10, 300)
      },
      {
        id: '4',
        title: 'Window seat reservation',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'ship',
    offers: []
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'GPS navigation add-on',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Full insurance coverage',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Child seat rental',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '1',
        title: 'Extra baggage allowance',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Priority boarding upgrade',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Lounge access pass',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '1',
        title: 'Guided city tour',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Museum access ticket',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Sunset boat cruise',
        price: getRandomInteger(10, 300)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Wine pairing menu',
        price: getRandomInteger(10, 300)
      },
      {
        id: '2',
        title: 'Chef’s tasting set',
        price: getRandomInteger(10, 300)
      },
      {
        id: '3',
        title: 'Table by the window',
        price: getRandomInteger(10, 300)
      }
    ]
  }
];
