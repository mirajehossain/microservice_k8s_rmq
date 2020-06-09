import mongoose from 'mongoose';
import { app } from './app';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { resolve } from "path"
import { config } from "dotenv";
import {rmqWrapper} from "./rmq-wrapper";
import {Channel} from "amqplib";
import {TicketCreatedListener} from "./events/listeners/ticket-created-listener";
import {TicketUpdatedListener} from "./events/listeners/ticket-updated-listener";

config({ path: resolve(__dirname, "./.env") })

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.MQ_URL) {
    throw new Error('MQ_URL must be defined');
  }

  try {
    await rmqWrapper.connect(
      process.env.MQ_URL
    );

    process.on('SIGINT', () => rmqWrapper.connection?.close());
    process.on('SIGTERM', () => rmqWrapper.connection?.close());

    const channel: Channel = await rmqWrapper.connection.createChannel();
    await new TicketCreatedListener(rmqWrapper.connection).listen(channel);
    await new TicketUpdatedListener(rmqWrapper.connection).listen(channel);
    // new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3002, () => {
    console.log('Listening on port 3002!!!!!!!!');
  });
};

start();
