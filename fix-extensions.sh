#!/bin/bash

echo "Fixing import extensions in JavaScript files..."

# Find all JS/JSX files and fix import extensions
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.js\.jsx/\.js/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.jsx\.jsx/\.jsx/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "\([^"]*\)"/from "\1.js"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.js\.js/\.js/g'

echo "Done fixing import extensions!"
