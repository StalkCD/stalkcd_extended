#!/bin/bash
#npm install json-schema-to-typescript --save
#npm install @types/yaml-to-json
#npm install ajv
#npm install typescript --save-dev
npx tsc
node ./dist/main/stalk-cd.js evaluate-jenkins2stalkcd