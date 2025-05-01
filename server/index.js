import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios"; // Import axios for Hugging Face API
import OpenAI from "openai";
import userRoute from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hugging Face API Configuration
const HF_API_URL = "https://api-inference.huggingface.co/models/hiteeka123/real-estate-chatbot";

// OpenAI Chatbot Route
app.post("/api/chat/openai", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
});

// Hugging Face Chatbot Route
app.post("/api/chat/huggingface", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        },
      }
    );

    const reply = response.data?.[0]?.generated_text || "Sorry, I didn't understand that.";
    res.json({ reply });
  } catch (err) {
    console.error("Error talking to Hugging Face:", err.message);
    res.status(500).json({ error: "Failed to fetch response from chatbot" });
  }
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

// Export the app instead of calling app.listen() (for Vercel serverless function)
export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
