import { DateFormat } from '../const.js';
import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatDate = (date, type) => date ? dayjs(date).format(DateFormat[type]) : '';

export {
  capitalizeFirstLetter,
  formatDate,
  isEscapeKey
};


