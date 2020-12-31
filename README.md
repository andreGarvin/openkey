# OpenKey: Replica of now descended ShoutKey

# What is OpenKey?

To explain what this application is would be this.

![this meme is precious to me](./assets/meme.jpg)

But all jokes aside, this is a replica of no longer running `shoutkey.com` but still another URL shorter, but the extra steps can be handy and useful for some. These extra steps are.

- You can add an expiration to the URL, meaning how long you want the URL to exist on the site
- After creating a shortened URL, it tells you whether it is secure or not and informs you what other sites will redirect to (only final URL)
- You can report keys, and message will be collected and sent to GitHub issues
- You can send feedback to report bugs, give some feedback on to improve the site, and any abuse that you might notice on the application. Any feedback sent will create an issue on GitHub

# Change-log

Here is the [change log](https://github.com/andreGarvin/openkey/blob/3.0.0/CHANGELOG.md) for the service

# Contributing

## prerequisites

You need these three things to ensure compatibility when working locally.

- NodeJS version 10.15.0
- PostgreSQL version 12.13
- Docker version 19.03.5

## Getting Started

- Clone the repo (`git clone https://github.com/andreGarvin/react-boilerplate.git`)
- Install all dependencies using (`npm i`)
- Copy the the contents inside the `.env.sample` file into `.env` (`cat .env.sample > .env`)

Then your set to make whatever changes you want!

### Scripts

- `npm run start`: Starts the backend server
- `npm run start:dev`: Starts the backend server in development mode
- `npm run server:build`: Builds the backend
- `npm run server:build:watch`: Builds the backend in development mode and rebuilds based on any code changes
- `npm run frontend:build`: Builds the frontend react app
- `npm run frontend:build:watch`: Builds the frontend app in development mode and rebuilds based on any code changes
- `npm run db:launch`: Launches docker container of the PostgreSQL instance
- `npm run db:restart`: Restarts PostgreSQL docker container
- `npm run db:stop`: Stops PostgresSQL docker container
- `npm run db:destroy`: Deletes PostgresSQL docker container (you have to stop the docker first before deleting it)
