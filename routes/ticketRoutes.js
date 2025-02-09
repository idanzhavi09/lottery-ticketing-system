// routes/ticketRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } from '../models/Ticket.js';
import ticketController from '../controllers/ticketController.js';

// In ESM, __dirname isn't available; so create it manually:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Middleware to ensure the user is an admin (for edit/delete)
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') return next();
  req.flash('error', 'Admin access required.');
  res.redirect('/');
}

// List all tickets
router.get('/', ensureAuthenticated, ticketController.listTickets);

// Show form to create a new ticket
router.get('/new', ensureAuthenticated, ticketController.showNewTicketForm);

// Create a new ticket
router.post('/', ensureAuthenticated, upload.array('attachments'), ticketController.createTicket);

// View ticket details
router.get('/:id', ensureAuthenticated, ticketController.getTicketDetail);

// Show form to edit a ticket (admin only)
router.get('/:id/edit', ensureAuthenticated, ensureAdmin, ticketController.showEditTicketForm);

// Update ticket (admin only)
router.post('/:id/edit', ensureAuthenticated, ensureAdmin, upload.array('attachments'), ticketController.updateTicket);

// Delete ticket (admin only)
router.post('/:id/delete', ensureAuthenticated, ensureAdmin, ticketController.deleteTicket);

export default router;
