const Staff_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/staff";

fetch(Staff_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch staff");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#stafftable tbody");

    data.forEach(staff => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${staff.staff_id}</td>
        <td>${staff.name}</td>
        <td>${staff.role}</td>
        <td>${staff.assigned_event_id}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading staff:", err.message);
  });
