import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public compareInHour(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    const compare = dayjs(endDateUTC).diff(startDateUTC, 'hours');

    return compare;
  }

  public compareInDays(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    const compare = dayjs(endDateUTC).diff(startDateUTC, 'days');

    return compare;
  }

  public convertToUTC(date: Date): string {
    const dateUTC = dayjs(date).utc().local().format();

    return dateUTC;
  }

  public dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
