FROM node:20-slim

WORKDIR server
COPY . .
RUN yarn

EXPOSE 3000
CMD [ "yarn","dev" ]