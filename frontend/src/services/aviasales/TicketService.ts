import moment, { duration } from 'moment';
import { TicketDTO } from '../../models/TicketDTO';
import { TicketFilterBtnTypeEnum } from '../../enums/aviasales/TicketFilterBtnTypeEnum';

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
  };

  public static getTimeLine = (departureDate: string, durationInMinutes: number): string => {
    const durationTime = duration(durationInMinutes, 'minutes').asMilliseconds();
    const departureTime = moment(departureDate).format('HH:mm');
    const arrivalTime = moment(departureDate).add(durationTime).format('HH:mm');

    return `${departureTime} - ${arrivalTime}`;
  };

  public static ticketSortBy =
    (
      tickets: TicketDTO[],
      transferCounts: number[],
      type: TicketFilterBtnTypeEnum,
    ) : TicketDTO[] => {
      switch (type) {
        case TicketFilterBtnTypeEnum.Cheapest:
          return [...tickets]
            .filter(ticket => transferCounts.includes(ticket.segments[0].stops.length))
            .sort((a, b) => a.price - b.price);
        case TicketFilterBtnTypeEnum.Fastest:
          return [...tickets]
            .filter(ticket => transferCounts.includes(ticket.segments[0].stops.length))
            .sort((a, b) => a.segments[0].duration - b.segments[0].duration);
      }
    };
}
