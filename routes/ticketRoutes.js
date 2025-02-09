// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const multer = require('multer');
const path = require('path');
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

module.exports = router;
