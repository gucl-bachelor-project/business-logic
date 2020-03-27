# Business logic application

This project contains the full business logic application.

## High level overview of components

![Component overview](./docs/business-logic-component.png)

## Application

### Ports

A frontend application (provided by the 'Main app' component) is served on the following ports:

-   Production: 80
-   Development: 8080

## Prerequisites

In order to build and run the application locally on your machine, the following requirements must be met:

-   **OS**: macOS or Linux (tested on macOS 15.04 and Ubuntu 18.04.4)
-   **Software**:
    -   [GNU Make](https://www.gnu.org/software/make/) (version 3.81 =<)
    -   [Docker](https://docs.docker.com/install/) (version 19.03.8 =<)
    -   [Docker Compose](https://docs.docker.com/compose/install/) (version 1.25.3 =<)

## Connecting to DB access and logging applications

This setup can automatically connect to the [DB access](https://github.com/gucl-bachelor-project/db-access-app) and [logging](https://github.com/gucl-bachelor-project/logging-app) applications, while running it locally on your machine, as external Docker network references is set up to the other setups.

## Build and publish production build

Execute the following commands in this directory to build and publish artifacts for production use: `make prod-build` and `make prod-push`.  
As of now, the artifacts are published to this project's Docker image registry and object storage.
