# installs the application
FROM node as stalkcd-application
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
COPY docker/run.sh ./
RUN npm install typescript --save-dev
CMD ["./run.sh"]

#CMD ["echo", "Image created successfully / tests complete"]