import { getDefaultPoint } from '../const.js';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const nowDate = dayjs();

const isPresentPoints = (startDate, endDate) =>
  nowDate.isAfter(dayjs(startDate)) && nowDate.isBefore(dayjs(endDate));

const isFuturePoints = (startDate) =>
  nowDate.isBefore(dayjs(startDate));

const isPastPoints = (endDate) =>
  nowDate.isAfter(dayjs(endDate));

const sortPointsTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'minute');
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'minute');

  return durationB - durationA;
};

const sortPointsPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const sortPointsDay = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom), 'hours');

const getPointViewData = (point, offers, destinations) => {
  const offersByType = offers.find((item) => item.type === point.type)?.offers ?? [];

  const destination =
    (destinations.find((dest) => dest.id === point.destination) || getDefaultPoint())
    ?? null;

  const selectedOfferIds = point.offers ?? [];

  const checkedOffers = offersByType.filter((offer) => selectedOfferIds.includes(offer.id));

  return { offersByType, checkedOffers, destination };
};

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

export {
  isPresentPoints,
  isFuturePoints,
  isPastPoints,
  sortPointsTime,
  sortPointsPrice,
  sortPointsDay,
  getPointViewData,
  getDateTimeDifference
};
