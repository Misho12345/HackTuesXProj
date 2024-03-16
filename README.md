# HOBBYt

## Introduction
HOBBYt е приложение, предназначено да предостави на потребителите платформа за изучаване на техните хобита и интереси и препоръчване на обучителни курсове/университети/начини да си направят хобито истинска професия в близко бъдеще. 

## Installation
To set up the HOBBYt application on your local environment, follow these steps:
1. Clone the repository:
[git clone](https://github.com/Misho12345/HackTuesXProj.git)
2. Navigate to the project directory: 
cd [project-directory]
3. Install dependencies:
npm i
4. Set up environment variables by creating a `.env` file in the root directory and configure the following variables:
- `MONGODB_LINK`: Your MongoDB connection string.
- `OPENAI_API_KEY`: Your OpenAI [API key](https://platform.openai.com/api-keys).
- `ASSISTANT_ID`: The ID of your OpenAI [Assistant](https://platform.openai.com/assistants).

## Usage
To run the HOBBYt chat application:

1. Start the server:
npm start
2. Open a web browser and navigate to `http://localhost:3000/` to access the chat interface.

## Features
- Real-time messaging.
- Integration with OpenAI's GPT model for intelligent conversation handling.
- User data management with MongoDB.
- Support for creating multiple chat threads.

## Dependencies
- `express`: Web application framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `body-parser`: Node.js body parsing middleware.
- `openai`: Official OpenAI API client library for JavaScript.
- `dotenv`: Module to load environment variables from `.env` file.
