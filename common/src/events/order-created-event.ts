import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';
import {RoutingKey} from "./routing-key";

export interface OrderCreatedEvent {
  routingKey: RoutingKey.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus.Created;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
