import { Subjects } from './subjects';
import {RoutingKey} from "./routing-key";

export interface TicketCreatedEvent {
  routingKey: RoutingKey.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
