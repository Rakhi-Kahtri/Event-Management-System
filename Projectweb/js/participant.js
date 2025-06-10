const Participant_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/participants";

fetch(Participant_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch participants");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#participanttable tbody");
    data.forEach(participant => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${participant.par_id}</td>
        <td>${participant.par_name}</td>
        <td>${participant.par_email}</td>
        <td>${participant.phone_no}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading participants:", err.message);
  });
