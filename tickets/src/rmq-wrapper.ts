import { Connection, connect } from 'amqplib';

class RmqWrapper {
  private _connection?: Connection;


  get connection() {
    if (!this._connection) {
      throw new Error('Cannot access RabbitMQ client before connecting');
    }
    return this._connection;
  }
  async connect(url: string) {
    this._connection = await connect(url);
    return await connect(url);
  };
}
export const rmqWrapper = new RmqWrapper();
