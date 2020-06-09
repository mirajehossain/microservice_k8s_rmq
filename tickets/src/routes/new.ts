import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@evaly/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import {rmqWrapper} from "../rmq-wrapper";

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    // console.log('req.currentUser!.id: ', req.currentUser!.id);
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
      // userId: "5ed8b52a557cfaaf48030a4c",
    });
    await ticket.save();
    let channel = await rmqWrapper.connection.createChannel();
    await new TicketCreatedPublisher(rmqWrapper.connection).publish(channel,{
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
