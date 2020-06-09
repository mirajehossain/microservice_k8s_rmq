import { Subjects } from './subjects';
import {RoutingKey} from "./routing-key";

export interface TicketUpdatedEvent {
  routingKey: RoutingKey.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
