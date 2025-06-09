#!/bin/bash
echo "Running code lint and tests..."

# Lint JS/TS files
npx eslint .

# Run tests if you have any
# npm test

echo "Checks complete."

# Make it executable with:
chmod +x run_checks.sh
