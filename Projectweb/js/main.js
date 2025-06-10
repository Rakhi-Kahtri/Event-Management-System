const baseUrl = "https://probable-dollop-jjqg77j5gvw92ppv9-5002.app.github.dev";

// ✅ Pluralized entity names directly for accurate endpoint access
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

document.addEventListener("DOMContentLoaded", () => {
  fetchCounts();
  fetchFeedbackDistribution();
});

async function fetchCounts() {
  for (const entity of entityNames) {
    try {
      const res = await fetch(`${baseUrl}/${entity}/count`); // ✅ No extra 's' here
      const data = await res.json();
      counts[entity] = parseInt(data.count);
      const label = entity.charAt(0).toUpperCase() + entity.slice(1);
      console.log(`${label} count: ${data.count}`);
    } catch (err) {
      console.error(`Error fetching ${entity}:`, err);
      counts[entity] = 0;
    }
  }

  renderBarChart();
}

function renderBarChart() {
  const ctx = document.getElementById("barChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(counts).map(e =>
        e.charAt(0).toUpperCase() + e.slice(1)
      ),
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
        y: { beginAtZero: true }
      }
    }
  });
}

async function fetchFeedbackDistribution() {
  try {
    const res = await fetch(`${baseUrl}/feedback`);
    const feedbackData = await res.json();

    const ratingDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbackData.forEach(fb => {
      const rating = fb.rating;
      if (rating >= 1 && rating <= 5) ratingDist[rating]++;
    });

    renderPieChart(ratingDist);
  } catch (err) {
    console.error("Error fetching feedback:", err);
  }
}

function renderPieChart(data) {
  const ctx = document.getElementById("pieChart").getContext("2d");

  if (feedbackChart) feedbackChart.destroy();

  feedbackChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [{
        data: Object.values(data),
        backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"]
      }]
    },
    options: { responsive: true }
  });
}
