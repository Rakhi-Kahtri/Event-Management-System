const Session_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/sessions";

fetch(Session_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch sessions");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#sessiontable tbody");

    data.forEach(session => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${session.session_id}</td>
        <td>${session.event_id}</td>
        <td>${session.session_title}</td>
        <td>${session.speaker}</td>
        <td>${new Date(session.start_time).toLocaleString()}</td>
        <td>${new Date(session.end_time).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading sessions:", err.message);
  });
