// models/Ticket.js
import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

async function getAllTickets() {
  await db.read();
  return db.data.tickets;
}

async function getTicketById(id) {
  await db.read();
  return db.data.tickets.find(ticket => ticket.id === id);
}

async function createTicket(ticketData) {
  await db.read();
  const newTicket = {
    id: uuidv4(),
    hostname: ticketData.hostname,
    description: ticketData.description,
    tests: ticketData.tests, // array of test objects: { test, result }
    priority: ticketData.priority,
    status: 'open', // default status
    attachments: ticketData.attachments || [],
    createdBy: ticketData.createdBy,
    createdAt: new Date()
  };
  db.data.tickets.push(newTicket);
  await db.write();
  return newTicket;
}

async function updateTicket(id, updateData) {
  await db.read();
  const ticket = db.data.tickets.find(ticket => ticket.id === id);
  if (!ticket) return null;
  ticket.hostname = updateData.hostname;
  ticket.description = updateData.description;
  ticket.priority = updateData.priority;
  ticket.status = updateData.status;
  ticket.tests = updateData.tests;
  if (updateData.attachments && updateData.attachments.length > 0) {
    ticket.attachments = ticket.attachments.concat(updateData.attachments);
  }
  await db.write();
  return ticket;
}

async function deleteTicket(id) {
  await db.read();
  const index = db.data.tickets.findIndex(ticket => ticket.id === id);
  if (index === -1) return false;
  db.data.tickets.splice(index, 1);
  await db.write();
  return true;
}

export {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
