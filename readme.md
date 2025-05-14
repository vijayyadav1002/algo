# Steps to create typescript project
# 1. Create a new directory for your project
mkdir my-typescript-project
# 2. Navigate to the project directory
cd my-typescript-project
# 3. Initialize a new Node.js project
npm init -y
# 4. Install TypeScript as a development dependency
npm install typescript --save-dev
# 5. Create a tsconfig.json file
npx tsc --init
# 6. Create a src directory
mkdir src
# 7. Create a TypeScript file in the src directory
touch src/index.ts
# 8. Write some TypeScript code in the index.ts file
echo "const greeting: string = 'Hello, TypeScript!'; console.log(greeting);" > src/index.ts
# 9. Compile the TypeScript code to JavaScript
npx tsc
# 10. Run the compiled JavaScript code
node dist/index.js
# 11. Clean up the project
rm -rf my-typescript-project