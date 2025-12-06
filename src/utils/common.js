import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateFormat } from '../const.js';

dayjs.extend(utc);

const isEscapeKey = (evt) => evt.key === 'Escape';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatDate = (date, type) => dayjs.utc(date).utcOffset(1, true).format(DateFormat[type]);

export {
  capitalizeFirstLetter,
  formatDate,
  isEscapeKey
};


