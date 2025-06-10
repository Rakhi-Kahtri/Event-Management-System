const Sponsor_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/sponsors";

fetch(Sponsor_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch sponsors");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#sponsortable tbody");

    data.forEach(sponsor => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${sponsor.sponsor_id}</td>
        <td>${sponsor.event_id}</td>
        <td>${sponsor.sponsor_name}</td>
        <td>${sponsor.sponsored_amount}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading sponsors:", err.message);
  });
