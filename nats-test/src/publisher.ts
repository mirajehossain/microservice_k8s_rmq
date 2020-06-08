import nats from 'node-nats-streaming';
// import {connect, NatsConnectionOptions, Payload} from 'ts-nats';
import { connect, Subscription, Stan } from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

// console.clear();

// const stan = nats.connect('ticketing', 'abc');
const stan = connect('ticketing', 'abc');

console.log('Publisher connected to NATS', stan);

// connect()
//     .then(async (nc) => {
//       nc.publish('greeting', 'hello world!');
//
//       let sub = await nc.subscribe('greeting', (err, msg) => {
//         if(err) {
//           // do something
//         } else {
//           console.log('--',msg);
//           // do something with msg.data
//         }
//       });
//       // Do something with the connection
//     })
//     .catch((ex) => {
//       // handle the error
//     });

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  console.log('publisher:-=-=', publisher);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '$20',
  // });

  // stan.publish('TicketCreated', data, () => {
  //   console.log('Event published');
  // });
});
