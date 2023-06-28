# Use official node alpine image as the base image
FROM node:14-alpine

# Create app directory in Docker
WORKDIR /usr/src/app

# Install canvas and python dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev 

# Copy package.json and package-lock.json
COPY package*.json ./

# If you have python2 and python3 both, then use python3 for npm packages
RUN npm config set python /usr/bin/python3

# Install all required packages
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app listens on port 8080, so you need to expose this port
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "api.js" ]
