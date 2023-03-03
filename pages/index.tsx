import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { AxiosError } from "axios";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [promptHistory, setPromptHistory] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setPromptHistory(promptInput);
      setResult(data.result);
      setPromptInput("");
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>type something</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="input prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="generate openAi" />
        </form>
        <div>{promptHistory}</div>
        <div>{result}</div>
      </main>
    </>
  );
}
