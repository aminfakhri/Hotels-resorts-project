// Redirect to login if not logged in
const currentUser = JSON.parse(localStorage.getItem("user"));
if (!currentUser) {
  window.location.href = "index.html";
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
    },
    {
      name: "Caribbean Dive Paradise",
      climate: "tropical",
      activity: "beach",
      budget: "high",
      region: "america",
      description: "Luxurious diving and beach experience in the Caribbean.",
    },
    {
      name: "Andean Mountain Lodge",
      climate: "cold",
      activity: "hiking",
      budget: "medium",
      region: "america",
      description: "Challenging hikes and stunning views in the Andes.",
    }
  ];

  // Define weights for each preference. Higher weight means more important.
  const preferenceWeights = {
    climate: 0.4,
    activity: 0.3,
    budget: 0.2,
    region: 0.1
  };
  
  document.getElementById("preferenceForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const climate = document.getElementById("climate").value;
    const activity = document.getElementById("activity").value;
    const budget = document.getElementById("budget").value;
    const region = document.getElementById("region").value;

    const scoredResorts = resorts.map(resort => {
      let score = 0;

      if (resort.climate === climate) {
        score += preferenceWeights.climate;
      }
      if (resort.activity === activity) {
        score += preferenceWeights.activity;
      }
      if (resort.budget === budget) {
        score += preferenceWeights.budget;
      }
      if (resort.region === region) {
        score += preferenceWeights.region;
      }

      if (score === (preferenceWeights.climate + preferenceWeights.activity + preferenceWeights.budget + preferenceWeights.region)) {
        score += 1.0;
      }

      return { ...resort, score: score };
    });

    const recommendations = scoredResorts
      .filter(resort => resort.score > 0)
      .sort((a, b) => b.score - a.score);
  
    const container = document.getElementById("recommendations");
    container.innerHTML = "";
  
    if (recommendations.length === 0) {
      container.innerHTML = "<p>No resorts match your preferences. Try changing your filters.</p>";
    } else {
      recommendations.forEach(resort => {
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

  // Logout functionality
  document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("user"); // Remove the logged-in user from local storage
    window.location.href = "login.html"; // Redirect to the login page
  });
  async function askChatbot() {
  const input = document.getElementById("chatInput").value.trim();
  const responseBox = document.getElementById("chatResponse");

  if (!input) return;

  responseBox.innerText = "Thinking...";
  
  const openaiApiKey = "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"; // ← Replace this with your actual key

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful vacation assistant. Recommend holiday resorts based on user preferences like climate, region, activity, and budget."
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await res.json();
    responseBox.innerText = data.choices[0].message.content;
  } catch (error) {
    responseBox.innerText = "Sorry, I couldn't get a recommendation.";
    console.error("Chatbot error:", error);
  }
}
