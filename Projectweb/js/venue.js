const Venue_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/venues"; 

fetch(Venue_API_LINK)
  .then(response => {
    if (!response.ok)
      throw new Error("Failed to fetch data");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#venuetable tbody");

    data.forEach(venue => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${venue.venue_id}</td>
        <td>${venue.venue_name}</td>
        <td>${venue.location}</td>
        <td>${venue.capacity}</td>`;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
