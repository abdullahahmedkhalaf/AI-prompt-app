#!/bin/bash

if [ -z "$1" ]; then
    echo "❌ Error: Please provide a commit message!"
    echo "Usage: ./push.sh \"your commit message here\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🔄 Rebuilding the deployment docs folder..."
rm -rf docs && cp -r frontend docs

echo "📦 Staging all fresh asset files..."
git add .

echo "💾 Creating snapshot save point: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing codebase branches live to GitHub main..."
git push origin main

echo "✅ Deployment pipeline complete!"
