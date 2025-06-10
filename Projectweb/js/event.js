const Event_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/events";

fetch(Event_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch events");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#eventtable tbody");
    data.forEach(event => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${event.event_id}</td>
        <td>${event.event_title}</td>
        <td>${event.description}</td>
        <td>${new Date(event.date).toLocaleDateString()}</td>
        <td>${event.event_type}</td>
        <td>${event.venue_id}</td>
        <td>${event.org_id}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading events:", err.message);
  });
