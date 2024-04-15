FROM node:20-slim

WORKDIR client
COPY . .
RUN yarn

EXPOSE 5173
CMD [ "yarn","dev" ]