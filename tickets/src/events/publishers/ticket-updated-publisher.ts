// import { Publisher, Subjects, TicketUpdatedEvent } from '@evaly/common';
import { Publisher, Subjects, TicketUpdatedEvent } from '../../../../common/src';
import {Exchange, RoutingKey} from "../../../../common/src";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  exchange: Exchange.Ticket = Exchange.Ticket;
  routingKey: RoutingKey.TicketUpdated = RoutingKey.TicketUpdated;

}
