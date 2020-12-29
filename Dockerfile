
FROM node:10.15.0-alpine as base
WORKDIR /app

# installing dependencies
FROM base AS dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm set progress=false
RUN npm install --production
RUN cp -R node_modules prod_node_modules
RUN npm install

# building the backend
FROM base AS backend
COPY --from=dependencies /app/node_modules /app/node_modules
COPY ./tsconfig.json .
COPY ./package.json .
COPY ./backend .
RUN npm run server:build

# building frontend
FROM base AS frontend
COPY --from=dependencies /app/node_modules /app/node_modules
COPY ./webpack.config.js .
COPY ./package.json .
COPY ./public .
RUN npm run


ARG COMMIT_SHA
ENV COMMIT_SHA $COMMIT_SHA

ENV IS_DOCKER_CONTAINER true

# copying any resoruces needed
COPY --from=dependencies /app/prod_node_modules /app/node_modules
COPY --from=dependencies /app/package.json /app/package.json
COPY --from=backend /app/build /app/build
COPY --from=frontent /app/dist /app/dist

# exposing the container port
EXPOSE 8000

CMD ["npm", "run", "start"]