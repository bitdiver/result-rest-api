FROM alpine:3.4

# File Author / Maintainer
LABEL authors="Makele Ghebebreamlak <makeleg@gmail.com>"

# Update & install required packages
RUN apk add --update nodejs bash git

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# set your port
ENV EXPRESS_PORT 3000
ENV ARANGO_HOSTNAME localhost
ENV ARANGO_PORT 8529
ENV ARANGO_DBNAME _system
ENV ARANGO_USERNAME root
ENV ARANGO_PASSWORD

# expose the port to outside world
EXPOSE  3000

# start command as per package.json
CMD ["npm", "start"]
