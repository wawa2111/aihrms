#!/bin/bash

echo "Fixing all import issues in JavaScript files..."

# Fix package imports (remove .js extension from package imports)
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "@reduxjs\/toolkit\.js"/from "@reduxjs\/toolkit"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "react\.js"/from "react"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "react-router-dom\.js"/from "react-router-dom"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "react-redux\.js"/from "react-redux"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "react-hot-toast\.js"/from "react-hot-toast"/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/from "axios\.js"/from "axios"/g'

# Fix local imports with double extensions
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.js\.js/\.js/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.jsx\.jsx/\.jsx/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.js\.jsx/\.js/g'
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs sed -i 's/\.jsx\.js/\.jsx/g'

echo "Done fixing import issues!"
