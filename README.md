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

## Further Information

* [Development](documentation/Development.md)
* [Download Files from Github](documentation/DownloadFiles.md)
* [Docker](documentation/Docker.md)
* [CLI Commands](documentation/Commands.md)