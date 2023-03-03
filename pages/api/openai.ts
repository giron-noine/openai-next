import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

interface Error {
  message: string[];
  statusCode: number;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function OpenAi(req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI APIキーが設定されていません",
      },
    });
    return;
  }

  const prompt = req.body.prompt || "";
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "何か入力してください",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptSetting(prompt),
      temperature: 0.9,
      max_tokens: 600,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (err) {
    const error = err as AxiosError<Error>;
    if (error) {
      console.error(error.response?.status, error.response?.data);
      if (error.response?.status) {
        res.status(error.response.status).json(error.response?.data);
      }
    } else {
      //if (error)の条件にしているためこの中ではerrorの型はneverになってしまう
      //次の処理はopenai-quickstart-nodeで書かれていた
      console.error(`Error with OpenAI API request: ${error["message"]}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function promptSetting(input: string) {
  return `
    回答するときは語尾に「にゃー」をつけてください
    入力: ${input}
  `;
}
