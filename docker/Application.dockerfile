# installs the application
FROM node as stalkcd-application
WORKDIR /usr/app
COPY src ./src
COPY res ./res
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install typescript --save-dev
RUN npx tsc
CMD ["node", "./dist/main/stalk-cd.js", "evaluate-jenkins2stalkcd"]

#CMD ["echo", "Image created successfully / tests complete"]