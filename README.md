.env.example を複製して.env にリネーム  
open ai の API key を入れる

https://github.com/openai/openai-quickstart-node

Setup
If you don’t have Node.js installed, install it from here (Node.js version >= 14.6.0 required)

Clone this repository

Navigate into the project directory

$ cd openai-quickstart-node
Install the requirements

$ npm install
Make a copy of the example environment variables file

On Linux systems:

$ cp .env.example .env
On Windows:

$ copy .env.example .env
Add your API key to the newly created .env file

Run the app

$ npm run dev
You should now be able to access the app at http://localhost:3000! For the full context behind this example app, check out the tutorial.
