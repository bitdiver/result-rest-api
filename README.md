[![npm](https://img.shields.io/npm/v/@bitdiver/result-rest-api.svg)](https://www.npmjs.com/package/@bitdiver/result-rest-api)
[![minified size](https://badgen.net/bundlephobia/min/@bitdiver/result-rest-api)](https://bundlephobia.com/result?p=@bitdiver/result-rest-api)
[![downloads](http://img.shields.io/npm/dm/@bitdiver/result-rest-api.svg?style=flat-square)](https://npmjs.org/package/@bitdiver/result-rest-api)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/bitdiver/result-rest-api.git)

Result Rest API
==================================

This is a REST APIs for the providing the bitdiver testframework. It uses a Arrango Database which can be configured through ENV variables.


Getting Started
---------------

```sh
# clone it
git clone git@github.com:bitdiver/result-rest-api.git
cd result-rest-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
EXPRESS_PORT=3000 ARANGO_HOSTNAME=localhost ARANGO_PORT=8529 ARANGO_DBNAME=_system ARANGO_USERNAME=root ARANGO_PASSWORD= npm run dev

# Start production server:
EXPRESS_PORT=3000 ARANGO_HOSTNAME=localhost ARANGO_PORT=8529 ARANGO_DBNAME=_system ARANGO_USERNAME=root ARANGO_PASSWORD= npm start

```
Docker Support
------
```sh
cd result-rest-api


# Build your docker
docker build -t bitdiver/result-rest-api .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 bitdiver/result-rest-api
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port

```
