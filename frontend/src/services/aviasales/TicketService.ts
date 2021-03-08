import moment, { duration } from 'moment';

export default class TicketService {

  public static getRUStopsTitle = (stopsCount: number): string => {
    const endOnI = [2, 3, 4];

    if (stopsCount === 0) {
      return 'Без пересадок';
    }

    if (stopsCount % 10 === 1) {
      return `${stopsCount} пересадка`;
    }

    if (endOnI.includes(stopsCount % 10)) {
      return `${stopsCount} пересадки`;
    }

    return `${stopsCount} пересадок`;
  };

  public static getTravelTime = (durationInMinutes: number): string => {
    return moment.utc(duration(durationInMinutes, 'minutes').asMilliseconds()).format('HHч mmм');
  }

  public static getTimeLine = (departureDate: string, durationInMinutes: number): string => {
    const durationTime = duration(durationInMinutes, 'minutes').asMilliseconds();
    const departureTime = moment(departureDate).format('HH:mm');
    const arrivalTime = moment(departureDate).add(durationTime).format('HH:mm');

    return `${departureTime} - ${arrivalTime}`;
  }
}
