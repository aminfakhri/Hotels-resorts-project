const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai"); // MUST be at the top

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('Final_project_test'));

// 🔐 OpenAI Setup
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "sk-xxxsk-proj-kjMNiGiHkJf34Fjf90o4qLieDkBpE_lezJBFHTiYdkBnbhKn7ltxUmePR7iuOxY2lwAZlmawy2T3BlbkFJqANg1H7mMWoPzM9KMss4-0M_YuATjhs5qbvwivbx6wQ-7JdWuIXZDp-arDYAZEp3WFb5rcd2cA", // Replace with your actual key
});


// 👥 Local JSON file for users
const USERS_FILE = './users.json';

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// 📝 Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  users.push({ email, password });
  saveUsers(users);
  res.json({ message: 'Signup successful' });
});

// 🔐 Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user });
});

// 💬 Chatbot Route
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant recommending holiday resorts based on user preferences."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Chatbot failed to respond." });
  }
});

// 🏠 Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Final_project_test/index.html');
});

// 🚀 Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
