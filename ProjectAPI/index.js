const express = require('express');
const cors = require('cors');
const Pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const postRoutes = require('./post');
app.use('/', postRoutes);

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO EVENT MANAGEMENT API');
    }
    catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});


app.get('/venues', async (req, res) => {
  try {
    const result = await Pool.query('select * from venues');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});



app.get('/organizers', async (req, res) => {
  try {
    const result = await Pool.query('select * from organizers');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});


app.get('/events', async (req, res) => {
  try {
    const result = await Pool.query('select * from events');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});

app.get('/participants', async (req, res) => {
  try {
    const result = await Pool.query('select * from participants');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});


app.get('/tickets', async (req, res) => {
  try {
    const result = await Pool.query('select * from tickets');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});

app.get('/sessions', async (req, res) => {
  try {
    const result = await Pool.query('select * from sessions');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});

app.get('/sponsors', async (req, res) => {
  try {
    const result = await Pool.query('select * from sponsors');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});

app.get('/staff', async (req, res) => {
  try {
    const result = await Pool.query('select * from staff');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});


app.get('/payments', async (req, res) => {
  try {
    const result = await Pool.query('select * from payments');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});


app.get('/feedback', async (req, res) => {
  try {
    const result = await Pool.query('select * from feedback');
    res.json(result.rows);
  }
   catch (err)
  {
    res.status(500).json({ Error:err.message });
  }
});

app.post('/organizer', async (req, res) => {
  const { org_id, org_name, email, phone_no } = req.body;
  try {
    await Pool.query(
      'INSERT INTO organizers (org_id, org_name, email, phone_no) VALUES ($1, $2, $3, $4)',
      [org_id, org_name, email, phone_no]
    );
    res.status(201).json({ message: 'Organizer added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/venues/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM venues');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/organizers/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM organizers');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/events/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM events');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/participants/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM participants');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tickets/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM tickets');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/sessions/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM sessions');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/sponsors/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM sponsors');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/staff/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM staff');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/payments/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM payments');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/feedback/count', async (req, res) => {
  try {
    const result = await Pool.query('SELECT COUNT(*) FROM feedback');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/report/summary', async (req, res) => {
  try {
    const [
      totalEvents,
      totalParticipants,
      totalTickets,
      mostActiveOrganizer,
      eventsPerVenue,
      sessionsPerEvent,
      averageTicketsPerEvent
    ] = await Promise.all([
      Pool.query('select count(*) as total_events from events'),
      Pool.query('select count(*) as total_participants from participants'),
      Pool.query('select count(*) as total_tickets from tickets'),
      Pool.query(`
        select org_id, count(*) as event_count
        from events
        group by org_id
        order by event_count desc
        limit 1
      `),
      Pool.query(`
        select venue_id, count(*) as event_count
        from events
        group by venue_id
      `),
      Pool.query(`
        select event_id, count(*) as session_count
        from sessions
        group by event_id
      `),
      Pool.query(`
        select avg(ticket_count)::numeric(10,2) as average_tickets
        from (
          select event_id, count(*) as ticket_count
          from tickets
          group by event_id
        ) as sub
      `)
    ]);

    res.json({
      summary: {
        total_events: totalEvents.rows[0].total_events,
        total_participants: totalParticipants.rows[0].total_participants,
        total_tickets: totalTickets.rows[0].total_tickets
      },

      insights: 
      {
        most_active_organizer: mostActiveOrganizer.rows[0],
        events_per_venue: eventsPerVenue.rows,
        sessions_per_event: sessionsPerEvent.rows,
        average_tickets_per_event: averageTicketsPerEvent.rows[0].average_tickets
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT;
app.listen(PORT,() =>{
    console.log(`Connected Successfully....Running on PORT ${PORT}`);
});