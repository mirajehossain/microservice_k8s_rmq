// import { Listener, OrderCreatedEvent, Subjects } from '@evaly/common';
import {Exchange, Listener, OrderCreatedEvent, RoutingKey, TicketCreatedEvent} from '../../../../common/src';
import {Ticket} from '../../models/ticket';
import {Message} from 'amqplib';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  routingKey: RoutingKey.TicketCreated = RoutingKey.TicketCreated;
  exchange: Exchange = Exchange.Ticket;
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {

    // ack the message
    // msg.ack();
  }
}
