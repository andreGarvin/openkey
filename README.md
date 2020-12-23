# OpenKey: Replica of now descended ShoutKey

A replica of `shoutkey.com` some of the same exact functionality

- need node version 10.15.0
- PostgreSQL version 12.13
- Docker version 19.03.5

## Change-log

- version@3.0.0

  - Backend is running on Node version 10.15.0
  - Node backend is written in typescript
  - no longer using MonogoDB, switched to PostgreSQL
  - no longer using VueJS, now using ReactJS with redux & react-router
  - Still using Heroku for deployment but now using DockerFile to build and deploy this service
  - Can no longer see all keys stored in OpenKey
  - Improved feedback process, all feedbacks will create issues on this repo
  - Integration and unit testing
  - Proper API documentation using swagger open API 3

- version@2.0.0

  - report bad key/url
  - show weather a website secured with SSL. ( ex: https<secure> or http<not secure> )
  - open sourced API
  - feedback section
  - see other keys that are stored on the openkey database.
