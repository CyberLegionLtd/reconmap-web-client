FROM node:14-bullseye-slim

ENV DISABLE_OPENCOLLECTIVE true

WORKDIR /home/node/reconmap
ENV PATH /home/node/reconmap/node_modules/.bin:$PATH
