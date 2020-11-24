FROM node:12-alpine

ARG PORT=3000

ARG MAXMIND_LICENSE_KEY

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

RUN yarn && yarn build

EXPOSE ${PORT}

CMD [ "yarn", "start" ]
