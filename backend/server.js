import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for frontend domain
app.use(cors({
  origin: 'https://joke-website-frontend-oqhtt8hcb-syed-farhans-projects.vercel.app',  // Allow requests from frontend domain
}));

app.use(express.json());

// API route to get a joke
app.post('/api/joke', async (req, res) => {
  const { name } = req.body;
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=txt');
    let joke = response.data;

    // Personalize the joke
    let personalizedJoke = joke.replace(/Chuck Norris>/g, name || 'Someone');
    res.send({ joke: personalizedJoke });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching joke' });
  }
});

// Root route to verify server is running (optional)
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Export the app (Vercel expects it)
export default app;
