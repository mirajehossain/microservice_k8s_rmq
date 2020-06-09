import { Subjects } from './subjects';
import {Exchange} from "./exchange";
import {Channel, Connection} from "amqplib";
import {RoutingKey} from "./routing-key";
import { Message } from 'amqplib';

interface Event {
  routingKey: RoutingKey;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract onMessage(data: T['data'], msg: Message): void;
  protected ackWait = 5 * 1000;
  abstract routingKey: T['routingKey'];
  abstract exchange: Exchange;
  protected connection: Connection | undefined;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async listen(channel: Channel) {
    await channel.assertExchange(this.exchange, 'topic', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(q.queue, this.exchange, this.routingKey);

    await channel.consume(q.queue, (message) => {

      if (message?.content) {
        console.log(message?.content.toString('utf8'))
        console.log(`Message received: ${this.routingKey} / ${this.exchange}`)
      }
    })
  }
}
