/**
 * This example demonstrates how to use the OpenAI API to create a chatbot that
 * can be used in a Copilot GitHub Application. It uses the `stream` parameter to stream
 * the completions back to the client as they are generated.
 */
const { createReadStream } = require('fs')

const express = require('express')
const fetch = require('node-fetch')
const { log } = require('console')
const openaiApiKey = process.env.OPENAI_API_KEY;

const app = express()
app.use(express.json())

if (!openaiApiKey) {
  console.error('OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

app.get('/', (req, res) => {
  // An endpoint should exist to receive the OAuth redirect from new GitHub users.
  res.send(process.env.OPENAI_API_KEY);
})

app.post('/', async (req, res) => {
  // This endpoint receives the chat messages from the client and forwards them to the OpenAI API.
  const messages = req.body.messages.map(({ role, content }) => ({
    role,
    content
  }))

  const completions = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },

      body: JSON.stringify({
        messages,
        model: 'gpt-4',
        stream: true
      })
    }
  )

  // Forward the completions from the OpenAI API to the client.
  res.type('text/event-stream')
  res.setHeader('Transfer-Encoding', 'chunked')
  completions.body.pipe(res)
})


app.listen(80, () => {
  console.log('Server started on port 80');
});