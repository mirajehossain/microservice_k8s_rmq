// import { Listener, OrderCreatedEvent, Subjects } from '@evaly/common';
import {
  Exchange,
  Listener,
  OrderCreatedEvent,
  RoutingKey,
  TicketCreatedEvent,
  TicketUpdatedEvent
} from '../../../../common/src';
import {Ticket} from '../../models/ticket';
import {Message} from 'amqplib';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class TicketUpdatedListener extends Listener<TicketCreatedEvent> {
  routingKey: RoutingKey.TicketCreated = RoutingKey.TicketCreated;
  exchange: Exchange = Exchange.Ticket;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
  }
}
