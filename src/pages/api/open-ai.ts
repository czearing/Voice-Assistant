import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the prompt from the query parameter
  const prompt = req.query.prompt as string;

  // Create an instance of the OpenAIApi client
  const openai = new OpenAIApi(configuration);

  // Call the chat endpoint with the prompt and some options
  const response = await openai.createCompletion({
      model: 'text-ada-001',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 10
  });

  // Get the response data
  const data: any = response.data;

  // Send a JSON response with the data
  res.status(200).json(data);
}