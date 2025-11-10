import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { DATE_FORMAT } from './const.js';

dayjs.extend(duration);
dayjs.extend(utc);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatDate = (date, type) => dayjs.utc(date).utcOffset(1, true).format(DATE_FORMAT[type]);

const getDateTimeDifference = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(diffInMinutes / (60 * 24));
  const hours = Math.floor((diffInMinutes % (60 * 24)) / 60);
  const minutes = diffInMinutes % 60;

  return [
    days && `${days}D`,
    hours && `${hours}H`,
    minutes && `${minutes}M`
  ].filter(Boolean).join(' ');
};

export { getRandomArrayElement, getRandomInteger, capitalize, formatDate, getDateTimeDifference};


