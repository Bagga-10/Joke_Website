import { useState, type ChangeEvent } from "react";
import "../components/Joke.css";

const API_URL = import.meta.env.VITE_API_URL;

const Joke = () => {
  const [joke, setJoke] = useState<React.ReactNode>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const getJoke = async () => {
    if (!name.trim()) {
      setJoke("Please enter your name to get a joke.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/joke`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        setJoke("API error. Please check the console.");
        return;
      }
      const data = await response.json();
      setJoke(
        <span>
          <strong style={{ fontSize: "25px", color: "#333" }}>{name}</strong>
          , here is your joke:
          <br />
          <span style={{ fontSize: "20px", color: "#555" }}>{data.joke}</span>
        </span>
      );

      setName("");
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <div>
          <h1 className="text">Welcome for the FUN! 😜 </h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleNameChange}
          />
          <button className="btn" onClick={getJoke} disabled={loading}>
            {loading ? "Loading..." : "Get a Joke"}
          </button>
        </div>
      </div>
      <div className="joke-container">
        <div className="joke-text">{joke}</div>
      </div>
    </section>
  );
};

export default Joke;
