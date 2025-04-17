import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Allow list of frontend origins
const allowedOrigins = [
  'https://joke-website-frontend-oqhtt8hcb-syed-farhans-projects.vercel.app',
  'https://joke-website-frontend-71u96wk0m-syed-farhans-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.post('/api/joke', async (req, res) => {
  const { name } = req.body;
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=txt');
    let joke = response.data;
    let personalizedJoke = joke.replace(/Chuck Norris>/g, name || 'Someone');
    res.send({ joke: personalizedJoke });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching joke' });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

export default app;
