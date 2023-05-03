# Commands

This file comprise different possibilities to connect to the CLI of StalkCD.

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
```

## Run full evaluation

This command allows to run all evaluations which are possible within StalkCd including the tests which are against the code itself.

```shell
./stalkcd evaluate-github2stalkcd
```