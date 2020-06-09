import {Exchange, Publisher, RoutingKey, TicketCreatedEvent} from '../../../../common/src';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  exchange: Exchange.Ticket = Exchange.Ticket;
  routingKey: RoutingKey.TicketCreated = RoutingKey.TicketCreated;
}
