# Business Logic Subsystem

This repository contains the source code and configuration of the business logic subsystem (including a Nginx reverse
proxy) to be deployed on a server. The different components of the subsystem is run in Docker containers and
orchestration by the [Docker Compose tool](https://docs.docker.com/compose/).  
A UML component diagram illustrating all components and their dependencies is shown below:
![Component overview](./docs/business-logic-subsystem-component-diagram.png)

## Application

### Ports

A frontend application (served by the _Main App_ component) is accessible on the following ports depending on the
environment:

-   Production: 80
-   Development: 8080

## Prerequisites

In order to build and run the application locally on your machine, the following requirements must be met:

-   **OS**: macOS or Linux (tested on macOS 15.05.5 and Ubuntu 18.04.4)
-   **Software**:
    -   [GNU Make](https://www.gnu.org/software/make/) (version >= 3.81)
    -   [Docker](https://docs.docker.com/install/) (version >= 19.03.8)
    -   [Docker Compose](https://docs.docker.com/compose/install/) (version >= 1.26.0)
    -   (Optionally) [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) (version >= 2.0)
        for pushing artifacts to this project's Docker image registry.
    -   (Optionally) [s3cmd](https://s3tools.org/s3cmd) (version >= 2.1.0)
        for pushing artifacts to this project's object storage.

## Connecting to Persistence and Logging subsystem

This setup can automatically connect to the [Persistence](https://github.com/gucl-bachelor-project/db-access-app)
and [Logging](https://github.com/gucl-bachelor-project/logging-app) subsystems, while running it locally on your
machine, as external Docker network references is set up to the other setups.

## Developing Locally

Execute the following command in this directory to build, setup, and start the application: `make dev`.  
[Nodemon](https://github.com/remy/nodemon), that is enabled by default, automatically restarts the application when
file changes in the directory are detected. Thus, there is no need to rerun the `make dev` command whenever changes
are made to application code.

## Build and Publish Artifacts

Execute the following commands in this directory to build and publish the artifacts for production use:
`make prod-build` and `make prod-push`.  
As of now, the artifacts are published to this project's Docker image registry and object storage.
