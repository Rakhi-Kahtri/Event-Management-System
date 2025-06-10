const FEEDBACK_API = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/feedback";

fetch(FEEDBACK_API)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch feedback data");
    }
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#feedbacktable tbody");

    data.forEach(feedback => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${feedback.feedback_id}</td>
        <td>${feedback.par_id}</td>
        <td>${feedback.event_id}</td>
        <td>${feedback.rating}</td>
        <td>${feedback.comments}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error loading feedback:", error.message);
  });
