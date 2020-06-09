// import { Listener, OrderCreatedEvent, Subjects } from '@evaly/common';
import {Exchange, Listener, OrderCreatedEvent, RoutingKey} from '../../../../common/src';
import {Ticket} from '../../models/ticket';
import {Message} from 'amqplib';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  routingKey: RoutingKey.OrderCreated = RoutingKey.OrderCreated;
  exchange: Exchange = Exchange.Order;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();
    // await new TicketUpdatedPublisher(this.connection).publish({
    //   id: ticket.id,
    //   price: ticket.price,
    //   title: ticket.title,
    //   userId: ticket.userId,
    //   orderId: ticket.orderId,
    //   version: ticket.version,
    // });
    //
    // ack the message
    // msg.ack();
  }
}
