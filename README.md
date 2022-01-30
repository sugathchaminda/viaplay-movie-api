# viaplay-serverless-movie-api

A Lambda project to handle ALB requests for Viaplay movie API

## Offline Usage

To get the project running locally you should do the following:

1. Make sure you have node installed (preferably using nvm): see: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
2. Make sure you can run docker locally. ex for osx and windows you can use the desktop app: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
3. Clone this repository. `https://github.com/sugathchaminda/viaplay-movie-api.git`
4. CD into the new local repo. `cd viaplay-movie-api`
5. Make sure you are using the node version specified in `.nvmrc` if using nvm run `nvm use`
6. Install all dependencies. `npm install`
7. Start the docker services using docker compose. `docker compose up`
8. Open a new terminal window and start serverless offline. `npm start`
9. Now you can test the api manually on `http://localhost:3001`

## Unit tests

Unit tests do not require the local env to be running, as oposed to integration tests. To run the tests run `npm test`

# API Documentation

## Indices
* [Movie](#post)
  * [Get movie info](#1-get-movie-info)

--------

## Movie
### 1. Get movie info - (Local running endpoint - localhost:3001/api/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016)


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/trailer
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |


***Query:***

```js        
{
	"url": "https://content.viaplay.se/pc-se/film/arrival-2016"
}

```
# Note
Application written with serverless approach, with AWS lambda and api gateway. 

# Future Work
## How to handle heavy load

1.) Best way to conatianerize the applicaiton and use kubernets or AWS fargate, Even the current approach can build the docker image(using lambda)
You can package your Lambda function code and dependencies as a container image, using tools such as the Docker CLI. You can then upload the image to your container registry hosted on Amazon Elastic Container Registry (Amazon ECR).

2.) As a improvements in future(production ready), we can cache all API requests. We can use Redis or fast caching Service.

3.) If not supposed to use AWS lambda approach one can use the node cluster module or PM2

## Security
Can use some AWS services for the security,host the application proper cloud environment with load balancer for proper rate limiting and TLS termination

## Improvements
1.) Write more unit tests, also with the integration tests can verify the application flow.