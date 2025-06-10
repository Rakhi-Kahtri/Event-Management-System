const baseUrl = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev"; 

const entityNames = [
  "venues",
  "organizers",
  "events",
  "participants",
  "tickets",
  "sessions",
  "sponsors",
  "staff",
  "payments",
  "feedback"
];

const counts = {};
let feedbackChart;

async function fetchCounts() {
  for (const entity of entityNames) {
    try {
      const res = await fetch(`${baseUrl}/${entity}/count`);
      const data = await res.json();
      counts[entity] = parseInt(data.count);
      document.getElementById(`${entity}-count`).textContent = data.count;
    } catch (err) {
      console.error(`Error fetching ${entity}`, err);
    }
  }

  renderBarChart();
  fetchFeedbackDistribution();
}

function renderBarChart() {
  const ctx = document.getElementById("barChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: "Entity Count",
        data: Object.values(counts),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function fetchFeedbackDistribution() {
  try {
    const res = await fetch(`${baseUrl}/feedback`);
    const feedbackData = await res.json();

    // Count feedback ratings from 1 to 5
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    feedbackData.forEach(item => {
      const rating = parseInt(item.rating);
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
      }
    });

    renderPieChart(ratingCounts);
  } catch (err) {
    console.error("Error fetching feedback", err);
  }
}

function renderPieChart(data) {
  const ctx = document.getElementById("pieChart").getContext("2d");

  const labels = Object.keys(data).map(r => `Rating ${r}`);
  const values = Object.values(data);
  const colors = ["#ff4c4c", "#ffa534", "#ffe234", "#4cff4c", "#34aaff"];

  if (feedbackChart) feedbackChart.destroy();

  feedbackChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Feedback Ratings (1 to 5)"
        }
      }
    }
  });
}

// Start everything
window.onload = fetchCounts;
