import { DateFormat } from '../const.js';
import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const formatDate = (date, type) => date ? dayjs(date).format(DateFormat[type]) : '';

export {
  capitalizeFirstLetter,
  formatDate,
  isEscapeKey
};


