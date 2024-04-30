# Xplor - Url Shortner Service
This service is responsible for mapping any long url to a short url and forwarding the requests to the long url when received request.

## Pre-requisites
Below is the list of services you need in order to run this service.
- [Mongo DB Instance](https://www.mongodb.com/) to manage data.

## Installation

### Clone or fork this Project

```bash
 git clone REPOSITORY_LINK
```
    
### Setup Environment Variables(.env)
You need to setup the values for the environment variables. Below is the list of required .env variables

```bash
MONGODB_URL=
SERVICE_BASE_URL=
GRAFANA_SERVICE_URL=
```
### Run service using Docker
Make sure you've the latest version of the docker installed in-order to run the application. Run the service with the following command

```bash
 docker compose --build
```


    
## Running Tests

The service has test cases for each module's service functions which you will get triggered on pushing the code to remote. You can run the test with the following command as well:

```bash
  npm test
```

## API Documentation
To view the Swagger API Docs for the service, you can start the service and hit
```{BASE_URL}/api/v1/```. This will open the proper API Documentation of this service.

## Configuration

System setup revolves around environment variables for ease of configuration. Key points include database settings, authentication parameters, and logging specifics. The `.env.example` file lists all necessary variables.

```bash
MONGODB_URL=
SERVICE_BASE_URL=
GRAFANA_SERVICE_URL=
```

## Deployment

Deploying the Url Shortner service can be achieved through:

- **Docker**: Create a Docker image and launch your service.
- **Kubernetes**: Use Kubernetes for scalable container management.
- **CI/CD**: Automate deployment with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.

## Contributing

Contributions are welcomed! Please follow these steps to contribute:

#### 1. Fork the project.
#### 2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
#### 3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
#### 4. Push to the branch (`git push origin feature/AmazingFeature`).
#### 5. Open a pull request.

## License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

## Acknowledgments

- Kudos to all contributors and the NestJS community.
- Appreciation for anyone dedicating time to enhance open-source software.
