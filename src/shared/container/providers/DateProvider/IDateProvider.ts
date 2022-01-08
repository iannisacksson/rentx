interface IDateProvider {
  compareInHour(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
}

export { IDateProvider };
