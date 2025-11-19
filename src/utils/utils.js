import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { DateFormat } from '../const.js';

dayjs.extend(duration);
dayjs.extend(utc);

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatDate = (date, type) => dayjs.utc(date).utcOffset(1, true).format(DateFormat[type]);

const getDateTimeDifference = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = (Math.floor(diffInMinutes / (60 * 24)));
  const hours = (Math.floor((diffInMinutes % (60 * 24)) / 60));
  const minutes = (diffInMinutes % 60);

  const format = (value) => value.toString().padStart(2, '0');

  return [
    days > 0 ? `${format(days)}D` : '',
    (days > 0 || hours > 0) ? `${format(hours)}H` : '',
    `${format(minutes)}M`
  ].filter(Boolean).join(' ');
};

const updateItem = (items, update) =>
  items.map((item) => item.id === update.id ? update : item);

export {
  getRandomInteger,
  capitalizeFirstLetter,
  formatDate,
  getDateTimeDifference,
  isEscapeKey,
  updateItem
};


