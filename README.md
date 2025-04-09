# Simple Chatbot

This is a simple chatbot implementation using OpenAI's GPT-3.5 API.

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the project root and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

You can get an API key by signing up at [OpenAI's platform](https://platform.openai.com/).

## Usage

Run the chatbot:
```bash
python chatbot.py
```

- Type your messages and press Enter to chat with the bot
- Type 'quit' to exit the program

## Features

- Uses OpenAI's GPT-3.5 model for generating responses
- Simple command-line interface
- Error handling for API calls
- Environment variable support for API key management
