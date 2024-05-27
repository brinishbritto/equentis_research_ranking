# Equentis Research Ranking - Lead Management System

## Description

    This project implements a Lead Management System for Equentis Research Ranking

## Project Structure

    - node_modules/ # Installed dependencies
    - src/ # Source code
        - config/ # Configuration files
        - controllers/ # Application controllers
        - middlewares/ # Middleware functions
        - models/ # Data models
        - routes/ # API routes
        - app.ts # Main application entry point
        - types.ts # TypeScript type definitions
    - .env # Config file
    - .prettierrc # Prettier configuration file (optional)
    - Dockerfile # Docker build instructions
    - equentis_research_ranking.postman_collection.json # Postman collection for API testing
    - equentis_research_ranking.sql # Database schema script
    - package-lock.json # Dependency lock file
    - package.json # Project dependencies and scripts
    - README.md # This file
    - tsconfig.json # TypeScript compiler configuration

## Prerequisites

    - Node.js v18 or later
    - MySQL Database

## Installation

    1. Clone the repository:

        git clone https://github.com/brinishbritto/equentis_research_ranking.git

    2. Install dependencies:

        cd equentis_research_ranking
        npm install

    3. Configure database connection

    4. (Optional) Import the database schema:

        mysql -u 'your_username' -p 'your_database_name' < equentis_research_ranking.sql

## Running the application

    1. Start the development server:

        npm run dev

    2. To build the TypeScript code:

        npm run build:express

    3. Start the production server:

        npm start

## Scripts

    - build: Compiles TypeScript code.
    - start: Starts the application in production mode.
    - dev: Starts the application in development mode using ts-node-dev.

## Postman Collection

    The JSON file containing the Postman collection for this project can be found in the 'equentis_research_ranking.postman_collection.json' file to help with testing API endpoints

## SQL File

    The SQL file containing the database schema for this project can be found in the 'equentis_research_ranking.sql' file
