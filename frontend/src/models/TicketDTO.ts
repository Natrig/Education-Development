import { TicketSegmentDTO } from './TicketSegmentDTO';

export interface TicketDTO {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // всегда поиск "туда-обратно"
  segments: [
    TicketSegmentDTO,
    TicketSegmentDTO
  ]
}
