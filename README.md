# StalkCD
This application has been developed as part of the master's thesis "Resilient Continuous Delivery Pipelines Based on BPMN" by Oliver Kabierschke.

More features where added by the study "Analysis and Integration of GitHub Actions into the StalkCD Ecosystem for Model-Based CI/CD Quality Assessment" by Clemens Kurz and Henning Möllers at the University of Hamburg.

# Notice
This document contains links to external sources.
We do and can not take responsibility for the content shown at external links.
The reader is advised to only click on links by their own judgement or not open a link at all.

## Prerequisites
To run the software, [Node.js](https://nodejs.org) is required as run-time environment. 

## Installation
In the directory of this repository, run the following command:

```shell
npm install
```

Now, compile the TypeScript code to JavaScript.

```shell
./node_modules/.bin/tsc
```

Or, if you have installed typescript globally (`npm -g i typescript`), just run:

```shell
tsc
```

## Execute Transformations
The application can be used 
* to transform Jenkinsfiles to BPMN and back.
* to transform Github Action Files to StalkCD and back.
* to transform Jenkinsfiles to Github Action Files (viá StalkCD)

You can get help on the usage of the tool by running `./stalkcd`.
For more detailed help, append '-h' to a command, e.g.: `./stalkcd jenkins2stalkcd -h`.

Some example commands:

```shell
./stalkcd jenkins2stalkcd -s ./Jenkinsfile -t ./Jenkinsfile.yml
./stalkcd stalkcd2bpmn -s ./Jenkinsfile.yml -t ./Jenkinsfile.bpmn
./stalkcd bpmn2stalkcd -s ./Jenkinsfile.bpmn -t ./Jenkinsfile.yml
./stalkcd stalkcd2jenkins -s ./Jenkinsfile.yml -t ./Jenkinsfile
./stalkcd evaluate-github2stalkcd
```

## 
./stalkcd download-ghafiles-and-logs -o hibernate -n hibernate-orm -w CodeQL -t "YOUR GitHub-Token"

## Run the Server
- run "npm install express @types/express nodemon"
- start server with "npm run dev"

## Further Information

* [Development](documentation/Development.md)
* [Download Files from Github](documentation/DownloadFiles.md)