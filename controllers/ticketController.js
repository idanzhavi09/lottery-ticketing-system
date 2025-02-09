// controllers/ticketController.js
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } from '../models/Ticket.js';

const listTickets = async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.render('tickets', { tickets, error: req.flash('error'), success: req.flash('success') });
  } catch (err) {
    req.flash('error', 'Error retrieving tickets.');
    res.redirect('/');
  }
};

const showNewTicketForm = (req, res) => {
  res.render('new_ticket', { error: req.flash('error') });
};

const createTicketHandler = async (req, res) => {
  try {
    const { hostname, description, priority } = req.body;
    let tests = [];
    if (Array.isArray(req.body.test)) {
      for (let i = 0; i < req.body.test.length; i++) {
        tests.push({ test: req.body.test[i], result: req.body.result[i] });
      }
    } else if (req.body.test && req.body.result) {
      tests.push({ test: req.body.test, result: req.body.result });
    }
    if (tests.length === 0) {
      req.flash('error', 'At least one test is required.');
      return res.redirect('/tickets/new');
    }
    const attachments = req.files
      ? req.files.map(file => ({
          originalname: file.originalname,
          filename: file.filename,
          path: file.path
        }))
      : [];
    await createTicket({
      hostname,
      description,
      priority,
      tests,
      attachments,
      createdBy: req.user.username
    });
    req.flash('success', 'Ticket created successfully.');
    res.redirect('/tickets');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating ticket.');
    res.redirect('/tickets/new');
  }
};

const getTicketDetailHandler = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      req.flash('error', 'Ticket not found.');
      return res.redirect('/tickets');
    }
    res.render('ticket_detail', { ticket, error: req.flash('error'), success: req.flash('success') });
  } catch (err) {
    req.flash('error', 'Error retrieving ticket.');
    res.redirect('/tickets');
  }
};

const showEditTicketForm = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) {
      req.flash('error', 'Ticket not found.');
      return res.redirect('/tickets');
    }
    res.render('edit_ticket', { ticket, error: req.flash('error') });
  } catch (err) {
    req.flash('error', 'Error retrieving ticket.');
    res.redirect('/tickets');
  }
};

const updateTicketHandler = async (req, res) => {
  try {
    const { hostname, description, priority, status } = req.body;
    let tests = [];
    if (Array.isArray(req.body.test)) {
      for (let i = 0; i < req.body.test.length; i++) {
        tests.push({ test: req.body.test[i], result: req.body.result[i] });
      }
    } else if (req.body.test && req.body.result) {
      tests.push({ test: req.body.test, result: req.body.result });
    }
    if (tests.length === 0) {
      req.flash('error', 'At least one test is required.');
      return res.redirect(`/tickets/${req.params.id}/edit`);
    }
    const attachments = req.files
      ? req.files.map(file => ({
          originalname: file.originalname,
          filename: file.filename,
          path: file.path
        }))
      : [];
    await updateTicket(req.params.id, { hostname, description, priority, status, tests, attachments });
    req.flash('success', 'Ticket updated successfully.');
    res.redirect(`/tickets/${req.params.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating ticket.');
    res.redirect(`/tickets/${req.params.id}/edit`);
  }
};

const deleteTicketHandler = async (req, res) => {
  try {
    const success = await deleteTicket(req.params.id);
    if (!success) {
      req.flash('error', 'Ticket not found.');
    } else {
      req.flash('success', 'Ticket deleted successfully.');
    }
    res.redirect('/tickets');
  } catch (err) {
    req.flash('error', 'Error deleting ticket.');
    res.redirect('/tickets');
  }
};

export default {
  listTickets,
  showNewTicketForm,
  createTicket: createTicketHandler,
  getTicketDetail: getTicketDetailHandler,
  showEditTicketForm,
  updateTicket: updateTicketHandler,
  deleteTicket: deleteTicketHandler
};