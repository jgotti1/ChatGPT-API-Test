const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const OpenAI = require("openai"); // Correct import
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI API Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key in .env
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

// Heritage API Endpoint
app.post("/api/heritage", async (req, res) => {
  const { lastName } = req.body;

  if (!lastName) {
    return res.status(400).json({ error: "Last name is required" });
  }

  try {
    // Call OpenAI's API using the chat completion endpoint
const completion = await openai.chat.completions.create({
  model: "gpt-4", // You can change the model as needed
  messages: [
    {
      role: "user",
      content: `Provide a brief heritage-related description for the surname: ${lastName}. Limit the response to 50 words.`,
    },
  ],
  max_tokens: 50, // Limit the number of tokens (words and punctuation) in the response
});


    const heritageInfo = completion.choices[0].message.content.trim();
    res.json({ lastName, heritage: heritageInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with the API request" });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
