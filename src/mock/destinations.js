import { getRandomInteger } from '../utils/common.js';

export const mockDestinations = [
  {
    id: '1',
    name: 'Seoul',
    description: 'Seoul is a dynamic city combining high-tech lifestyle with deep cultural roots.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Seoul skyline with Namsan Tower'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Traditional hanok houses in Bukchon'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Street food market in Myeongdong at night'
      }
    ]
  },
  {
    id: '2',
    name: 'Beijing',
    description: 'Beijing is the historical heart of China, known for its imperial landmarks and vibrant culture.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'The Forbidden City under clear skies'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'The Great Wall winding over the hills near Beijing'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Traditional hutong alley with red lanterns'
      }
    ]
  },
  {
    id: '3',
    name: 'Tokyo',
    description: 'Tokyo is a vibrant metropolis blending ultramodern life with rich traditions.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Tokyo skyline with Tokyo Tower'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Shibuya crossing at night'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 999)}`,
        description: 'Cherry blossoms near a temple in Tokyo'
      }
    ]
  },
  {
    id: '4',
    name: 'New York',
    description: 'New York is a bustling global city, famous for its skyline, culture, and endless energy.',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 99)}`,
        description: 'Manhattan skyline with Empire State Building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 99)}`,
        description: 'Times Square lights at night'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(10, 99)}`,
        description: 'Central Park in autumn colors'
      }
    ]
  }
];
