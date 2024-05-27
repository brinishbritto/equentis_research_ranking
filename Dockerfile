# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src ./src
COPY tsconfig.json ./

# Build the TypeScript code
RUN npm run build:express

# Stage 2: Running the application in a smaller Node.js image for runtime
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built code from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build/app.js"]
