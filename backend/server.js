import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.JOKE_API_URL;
const FRONTEND_URL=process.env.FRONTEND_URL;


const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/joke", async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const joke = await response.text();
    console.log(joke);
    res.json({ joke });
  } catch (error) {
    console.log("Error Fetching Joke", error);
    res.status(500).json({ error: "Error Fetching Joke" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT || 3000, () => console.log(`🚀 Server running on port ${PORT || 3000}`));
