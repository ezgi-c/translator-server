const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate this into ${targetLanguage}:\n\n${text}\n\n1.`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const translatedText = response.data.choices[0].text;
    res.json({ translatedText });
    console.log(translatedText);
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
