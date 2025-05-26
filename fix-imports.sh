#!/bin/bash

echo "Fixing import statements in JavaScript files..."

# Find all JS/JSX files and add .js/.jsx extensions to imports
find ./ai-hrms/client/src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "\([^"]*\)\/\([^/"]*\)"/from "\1\/\2.js"/g'
find ./ai-hrms/client/src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "\([^"]*\)\/\([^/"]*\)"/from "\1\/\2.jsx"/g'

echo "Done fixing imports!"
