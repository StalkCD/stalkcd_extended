# Development
As development environment, we recommend using Visual Studio Code, Webstorm or intelliJ IDEA.

## Start continuous compilation
The typescript compiler supports automatically compiling the sources upon changes to the source files.
Just run:

```bash
tsc -watch
```

## Important Packages and Classes
```
src/main/stalk-cd.ts
```
The class in which the project ist stared from and which holds the information on the CLI
___
```
src/main/model/pipeline Package
```
This Package contains the StalkCD model.
___
```
src/main/io Package
```
This Package contains the ```Jenkins --> StalkCD``` transformation.
And the ANTLR generated Files which are in ```src/main/io/jenkinsfile```.
___
```
src/main/model/GitHubActions Package
```
This Package contains the ```Github Actions --> StalkCD``` transformation (and back).
If you want to implement another Generator please make sure to use the Interface ```WorkflowGenerator.ts```.
In the Class ```GithubWorkflowBuilder.ts``` a generalized implementation to create Github Workflows is implemented.

For further information on the architecture refere to the study of Kurz and Möller "Analysis and Integration of GitHub Actions into the StalkCD Ecosystem for Model Based CI/CD Quality Assessment" from 2023.
___
```
src/main/Comparator.ts
```
This class is able to compare two Java-Script Objects deeply.
It will traverse over the two objects and register all differences.
Furthermore, it is possible to apply a lambda which allows for a semantic comparison.
___
```
src/test/* Packages
```
These packages contain the different tests for the transformations and supporting functionalities (e.g. download of files from github).
As of today there are three general transformations:
* Jenkins --> StalkCD --> BPMN
* Github Actions --> StalkCD
* Jenkins --> StalkCD --> Github Actions
___
```
src/test/TestUtils.ts
```
Provides some utility methods to run the currently implemented tests.
Interesting Methods:
* unzip - unzips the given file and also requires a lambda which accepts the data of the given file within the zip.
* validateJsonSchema - validated a json against the given schema
* removeDirectoryRecursively - removes the given directory and all subdirectories
* normalizeJenkinsfile - here you can see how the normalization for the Jenkinsfiles was done
* generateTypesFromJsonSchema - you can generate the types of the Github Action Types. For further information see the study of Kurz and Möller from 2023. 
___
```
src/test/GithubActionsEvaluationCLI.ts
```
This is a CLI which can be run by its own to test the results of the transformations:
* Github Actions --> StalkCD
* StalkCD --> Github Actions

As a basis the zip-file ```res/GithubActions.source.zip```.
This file contains 1182 Github Action workflow files.


## Run Tests in Docker
For the following steps the docker service needs to be provided.
You can download it from the [official website](https://www.docker.com/products/docker-desktop/).

To run the tests for StalkCD in a controlled environment a dockerfile was created:
```
docker/Application.dockerfile
```
To create the image navigate to the root folder of this project and run the following command:
```bash
docker build --target stalkcd-application --tag stalkcd-application:latest --file docker/Application.dockerfile .
```
It composes the `docker/run.sh` and some more files to be able to run the app into the image.
Files/Folders which might change often are excluded like the `src` and the `res` folders.
`src` and `res` have to be provided as volumes.
The test can be run with the following command:
```bash
docker run --rm -v "/absolute/path/to/folder/res:/usr/app/res" -v "/absolute/path/to/folder/src:/usr/app/src" stalkcd-application
```
Please provide the correct paths for the volumes on your local machine.

