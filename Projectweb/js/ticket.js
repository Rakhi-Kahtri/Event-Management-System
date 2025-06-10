const Ticket_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/tickets";

fetch(Ticket_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch tickets");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#tickettable tbody");

    data.forEach(ticket => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${ticket.ticket_id}</td>
        <td>${ticket.event_id}</td>
        <td>${ticket.par_id}</td>
        <td>${ticket.ticket_type}</td>
        <td>${ticket.ticket_price}</td>
        <td>${new Date(ticket.issue_date).toLocaleDateString()}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading tickets:", err.message);
  });
