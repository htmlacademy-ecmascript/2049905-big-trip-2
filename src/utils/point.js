import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

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
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom), 'minute');

export {
  isPresentPoints,
  isFuturePoints,
  isPastPoints,
  sortPointsTime,
  sortPointsPrice,
  sortPointsDay
};
