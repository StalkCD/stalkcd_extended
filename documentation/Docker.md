# Run Tests in Docker
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

* The ```--rm``` command deletes the container after it is finished.
* The ```-v``` gives information that a volume is mounted to the container. It takes one parameter the mapping from the local folder (absolute path) to the folder in the container. The two paths are separated by a colon. 