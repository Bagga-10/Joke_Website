import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const API_URL = process.env.JOKE_API_URL;

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
