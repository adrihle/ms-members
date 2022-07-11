import * as dateFns from 'date-fns';
import { env } from 'env';

const {setHours, setMinutes, isBefore, differenceInSeconds, setDay} = dateFns;
const { endpointRefreshHour, endpointRefreshMinute } = env;

export const getSecondsToCleanCache = () => {
  const today = new Date();
  let refreshCacheDate = setHours(today, endpointRefreshHour)
  refreshCacheDate = setMinutes(refreshCacheDate, endpointRefreshMinute)
  if (isBefore(refreshCacheDate, today)){
    refreshCacheDate = setDay(refreshCacheDate, refreshCacheDate.getDay() + 1);
  }
  return differenceInSeconds(refreshCacheDate, today);
}