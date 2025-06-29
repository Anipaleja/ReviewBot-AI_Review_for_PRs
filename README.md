# ReviewBot AI: Automated Code Review for PRs

**ReviewBot** is an intelligent GitHub Action bot that automatically reviews your pull requests and provides actionable code feedback powered by advanced AI models. It helps developers catch bugs, improve code quality, and maintain consistent style — all without manual effort.

## Features

- Automatically analyzes code changes on every pull request  
- Supports JavaScript and TypeScript code diffs (extendable)  
- Posts inline comments on GitHub PRs with detailed AI suggestions  
- Easy integration using GitHub Actions workflow  
- Scalable to add support for more languages and rules  

## Repository Contents

| File               | Description                                     |
|--------------------|------------------------------------------------|
| `bot.js`           | Main Node.js script that runs the AI review bot |
| `.github/workflows/reviewbot.yml` | GitHub Actions workflow config for PR triggers |
| `code_metrics.rs`  | Rust utility to count lines and characters in code files (code quality helper) |
| `package.json`     | Node.js project config and dependencies         |
| `.gitignore`       | Files/folders ignored by Git                    |

## Getting Started

### Setup the GitHub Action

1. Add your OpenAI API key as a GitHub secret named `openai_key`  
2. Push the code to your GitHub repository  
3. Open a Pull Request — the bot will automatically review changed JS/TS files and comment suggestions  


### Using the Rust Code Metrics Tool

You can use the Rust tool to quickly check the size of any code file:

```bash
# Compile the Rust program
rustc code_metrics.rs

# Run it on any file
./code_metrics path/to/your/file.js
```

**Output example:**
```yaml
File: file.js
Total lines: 120
Total characters: 2500
```

This utility complements ReviewBot AI by helping you measure code size and complexity easily.

## Future Enhancements

- Add support for more languages (Python, Rust, C++, etc.) in the AI review  
- Add severity scores and code quality badges  
- Extend Rust tool for complexity analysis  
- Integrate with other git platforms (GitLab, Bitbucket)  

## Contributing

Feel free to open issues or submit pull requests to improve the bot or add new features!

## License

MIT License



