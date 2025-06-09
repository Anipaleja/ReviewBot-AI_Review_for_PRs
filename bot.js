import { Octokit } from "@octokit/rest";
import fetch from "node-fetch";

async function callOpenAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.openai_key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function main() {
  try {
    const octokit = new Octokit({ auth: process.env.github_token });

    const repo = process.env.GITHUB_REPOSITORY;
    const prMatch = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
    if (!prMatch) throw new Error("Cannot extract PR number");
    const prNumber = parseInt(prMatch[1], 10);

    const [owner, repoName] = repo.split("/");

    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo: repoName,
      pull_number: prNumber,
    });

    for (const file of files) {
      if (!file.filename.endsWith(".js") && !file.filename.endsWith(".ts")) continue;
      if (!file.patch) continue;

      const prompt = `You are an expert software engineer. Review this code diff and provide clear, concise improvement suggestions:\n\n${file.patch}`;

      const reviewText = await callOpenAI(prompt);

      // Find first added line for inline comment
      const patchLines = file.patch.split("\n");
      let lineNumber = 1;
      for (let i = 0; i < patchLines.length; i++) {
        if (patchLines[i].startsWith("+") && !patchLines[i].startsWith("++")) {
          lineNumber = i + 1;
          break;
        }
      }

      await octokit.pulls.createReviewComment({
        owner,
        repo: repoName,
        pull_number: prNumber,
        body: reviewText,
        commit_id: file.sha,
        path: file.filename,
        line: lineNumber,
        side: "RIGHT",
      });

      console.log(`Posted review on ${file.filename}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
