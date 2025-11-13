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

export {
  isPresentPoints,
  isFuturePoints,
  isPastPoints
};
