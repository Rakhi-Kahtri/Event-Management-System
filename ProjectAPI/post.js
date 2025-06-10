const express = require('express');
const router = express.Router();
const Pool = require('./db');

// Utility functions
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);
const isValidDate = (date) => !isNaN(Date.parse(date));
const isPositiveNumber = (num) => typeof num === 'number' && num > 0;
const isValidRating = (rating) => Number.isInteger(rating) && rating >= 1 && rating <= 5;

// POST /venues
router.post('/venues', async (req, res) => {
  const { venue_name, location, capacity } = req.body;
  if (!venue_name || !location || capacity === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isPositiveNumber(capacity)) {
    return res.status(400).json({ error: "Capacity must be a positive number" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO venues (venue_name, location, capacity) VALUES ($1, $2, $3) RETURNING *',
      [venue_name, location, capacity]
    );
    res.status(201).json({ message: "Venue added", venue: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /organizers
router.post('/organizers', async (req, res) => {
  const { org_name, email, phone_no } = req.body;
  if (!org_name || !email || !phone_no) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!isValidPhone(phone_no)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO organizers (org_name, email, phone_no) VALUES ($1, $2, $3) RETURNING *',
      [org_name, email, phone_no]
    );
    res.status(201).json({ message: "Organizer added", organizer: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /events
router.post('/events', async (req, res) => {
  const { event_title, description, date, event_type, venue_id, org_id } = req.body;
  if (!event_title || !date || !event_type) {
    return res.status(400).json({ error: "event_title, date, and event_type are required" });
  }
  if (!isValidDate(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }
  try {
    const result = await Pool.query(
      `INSERT INTO events (event_title, description, date, event_type, venue_id, org_id) VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [event_title, description || null, date, event_type, venue_id || null, org_id || null]
    );
    res.status(201).json({ message: "Event added", event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /participants
router.post('/participants', async (req, res) => {
  const { par_name, par_email, phone_no } = req.body;
  if (!par_name || !par_email || !phone_no) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isValidEmail(par_email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!isValidPhone(phone_no)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO participants (par_name, par_email, phone_no) VALUES ($1, $2, $3) RETURNING *',
      [par_name, par_email, phone_no]
    );
    res.status(201).json({ message: "Participant added", participant: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tickets
router.post('/tickets', async (req, res) => {
  const { event_id, par_id, ticket_type, ticket_price, issue_date } = req.body;
  if (!event_id || !par_id || !ticket_type || ticket_price === undefined || !issue_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isPositiveNumber(ticket_price)) {
    return res.status(400).json({ error: "Ticket price must be a positive number" });
  }
  if (!isValidDate(issue_date)) {
    return res.status(400).json({ error: "Invalid issue date" });
  }
  try {
    const result = await Pool.query(
      `INSERT INTO tickets (event_id, par_id, ticket_type, ticket_price, issue_date) VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [event_id, par_id, ticket_type, ticket_price, issue_date]
    );
    res.status(201).json({ message: "Ticket added", ticket: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /sessions
router.post('/sessions', async (req, res) => {
  const { event_id, session_title, speaker, start_time, end_time } = req.body;
  if (!event_id || !session_title || !speaker || !start_time || !end_time) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isValidDate(start_time) || !isValidDate(end_time)) {
    return res.status(400).json({ error: "Invalid time format" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO sessions (event_id, session_title, speaker, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [event_id, session_title, speaker, start_time, end_time]
    );
    res.status(201).json({ message: "Session added", session: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /sponsors
router.post('/sponsors', async (req, res) => {
  const { event_id, sponsor_name, sponsored_amount } = req.body;
  if (!event_id || !sponsor_name || sponsored_amount === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isPositiveNumber(sponsored_amount)) {
    return res.status(400).json({ error: "Sponsored amount must be positive" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO sponsors (event_id, sponsor_name, sponsored_amount) VALUES ($1, $2, $3) RETURNING *',
      [event_id, sponsor_name, sponsored_amount]
    );
    res.status(201).json({ message: "Sponsor added", sponsor: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /staff
router.post('/staff', async (req, res) => {
  const { name, role, assigned_event_id } = req.body;
  if (!name || !role || !assigned_event_id) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO staff (name, role, assigned_event_id) VALUES ($1, $2, $3) RETURNING *',
      [name, role, assigned_event_id]
    );
    res.status(201).json({ message: "Staff added", staff: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /payments
router.post('/payments', async (req, res) => {
  const { ticket_id, amount, payment_method, payment_date } = req.body;
  if (!ticket_id || amount === undefined || !payment_method || !payment_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!isPositiveNumber(amount)) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }
  if (!isValidDate(payment_date)) {
    return res.status(400).json({ error: "Invalid payment date" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO payments (ticket_id, amount, payment_method, payment_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [ticket_id, amount, payment_method, payment_date]
    );
    res.status(201).json({ message: "Payment added", payment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /feedback
router.post('/feedback', async (req, res) => {
  const { par_id, event_id, rating, comments } = req.body;
  if (!par_id || !event_id || rating === undefined) {
    return res.status(400).json({ error: "par_id, event_id and rating are required" });
  }
  if (!isValidRating(rating)) {
    return res.status(400).json({ error: "Rating must be an integer between 1 and 5" });
  }
  try {
    const result = await Pool.query(
      'INSERT INTO feedback (par_id, event_id, rating, comments) VALUES ($1, $2, $3, $4) RETURNING *',
      [par_id, event_id, rating, comments || null]
    );
    res.status(201).json({ message: "Feedback added", feedback: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
