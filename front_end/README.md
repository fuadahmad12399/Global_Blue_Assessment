# Math Calculator App

A simple calculator web app built with React (frontend) and Node.js/Express (backend) that evaluates mathematical expressions via a secured REST API.

## Features

- Accepts math expressions as strings
- Supports `+`, `-`, `*`, `/` with operator precedence
- Secured with API Key authentication
- Responsive UI with real-time results

## Requirements

- Node.js & npm installed
- Backend runs on port `5000`
- Frontend runs on port `3000`

## Test Case

- Positive Test Case
Input: 2 + 3 * 4
Expected Output: 14
Explanation: Multiplication has higher precedence than addition

- Negative Test Case
Input: 2 ++ 3
Expected Output: "Invalid expression"
Explanation: Malformed expression.

## Setup Instructions

### Start Frontend

```bash
cd front_end
npm install axios
npm install react-router-dom

### Start Backend

```bash
cd back_end
npm install express cors body-parser dotenv
npm install --save-dev nodemon
node server.js