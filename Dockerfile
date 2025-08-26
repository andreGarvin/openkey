FROM node:18-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_NAME=openkey
ENV PORT=3000

# install dependencies
FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm set progress=false
RUN npm install --omit=dev
RUN cp -R node_modules prod_node_modules
RUN npm install

# build app
FROM base AS build
COPY --from=dependencies /app/node_modules /app/node_modules
COPY . /app
RUN npm run build

# development release
FROM base AS development
COPY . .
COPY --from=dependencies /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["npm", "run", "dev"]

# production release
FROM base AS production
COPY --from=dependencies /app/prod_node_modules /app/node_modules
COPY --from=dependencies /app/package.json /app/package.json
COPY --from=build /app/next.config.js /app/next.config.js
COPY --from=build /app/build /app/build

EXPOSE 3000

# Running the app
CMD ["npm", "run", "start"]
