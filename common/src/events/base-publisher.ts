import { Exchange } from './exchange';
import { Connection, Channel } from 'amqplib';
import {RoutingKey} from "./routing-key";
interface Event {
  routingKey: RoutingKey;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract routingKey: T['routingKey'];
  abstract exchange: Exchange;
  protected connection: Connection | undefined;

  constructor(connection: Connection) {
    this.connection = connection;
  }


  async publish(channel: Channel, data: T['data']): Promise<void> {
    await channel.assertExchange(this.exchange, 'topic', { durable: false });
    channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(data)))
  }
}
