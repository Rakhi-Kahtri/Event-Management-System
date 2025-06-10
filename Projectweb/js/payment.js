const Payment_API_LINK = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev/payments";

fetch(Payment_API_LINK)
  .then(response => {
    if (!response.ok) throw new Error("Failed to fetch payments");
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector("#paymenttable tbody");

    data.forEach(payment => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${payment.payment_id}</td>
        <td>${payment.ticket_id}</td>
        <td>${payment.amount}</td>
        <td>${payment.payment_method}</td>
        <td>${payment.payment_date}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading payments:", err.message);
  });
