const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function completion () {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Translate this into 1. French, 2. Spanish and 3. Japanese:\n\nWhat rooms do you have available?\n\n1.",
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          console.log(response.data.choices[0].text);
        //   return response;
    } catch (error) {
        console.error('Completion error:', error);
    }
}

completion();