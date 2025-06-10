const ORGANIZER_API = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/organizers";

fetch(ORGANIZER_API)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch organizers");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#organizertable tbody");

    data.forEach(org => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${org.org_id}</td>
        <td>${org.org_name}</td>
        <td>${org.email || "N/A"}</td>
        <td>${org.phone_no || "N/A"}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error loading organizers:", error.message);
  });
