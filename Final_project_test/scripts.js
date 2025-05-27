// Redirect to login if not logged in
const currentUser = JSON.parse(localStorage.getItem("user"));
if (!currentUser) {
  window.location.href = "login.html";
}

const resorts = [
    {
      name: "Bali Beach Resort",
      climate: "tropical",
      activity: "beach",
      budget: "medium",
      region: "asia",
      description: "Relax on beautiful beaches with tropical vibes.",
    },
    {
      name: "Swiss Alps Ski Lodge",
      climate: "cold",
      activity: "skiing",
      budget: "high",
      region: "europe",
      description: "Enjoy skiing in luxury at the Swiss Alps.",
    },
    {
      name: "Rocky Mountain Retreat",
      climate: "cold",
      activity: "hiking",
      budget: "medium",
      region: "america",
      description: "Explore breathtaking trails in the Rockies.",
    },
    {
      name: "Thai Jungle Resort",
      climate: "moderate",
      activity: "hiking",
      budget: "low",
      region: "asia",
      description: "Adventure in the Thai jungles at affordable rates.",
    }
  ];
  
  document.getElementById("preferenceForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const climate = document.getElementById("climate").value;
    const activity = document.getElementById("activity").value;
    const budget = document.getElementById("budget").value;
    const region = document.getElementById("region").value;
  
    const matches = resorts.filter(resort =>
      resort.climate === climate &&
      resort.activity === activity &&
      resort.budget === budget &&
      resort.region === region
    );
  
    const container = document.getElementById("recommendations");
    container.innerHTML = "";
  
    if (matches.length === 0) {
      container.innerHTML = "<p>No resorts match your preferences. Try changing your filters.</p>";
    } else {
      matches.forEach(resort => {
        const card = document.createElement("div");
        card.className = "resort-card";
        card.innerHTML = `
          <h3>${resort.name}</h3>
          <p>${resort.description}</p>
        `;
        container.appendChild(card);
      });
    }
  });
  