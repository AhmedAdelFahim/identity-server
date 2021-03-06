# Identity Server

Authentication and Authorization Server.

## Getting Started

These steps will get you a copy of the project up and running for development and testing purposes.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Install  **mongoDB** _latest stable version_
4.  Install  **redis** _latest stable version_
5. _Optional Step_ ⇒ You can install **MongoDB Compass** [any user interface application for MongoDB] as it offers a user interface for dealing with the database
6.  Clone the Project
7.	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
8. write required variables in .env

## Usage

1. for running localy
  ```
  npm run start
  ```
2. for testing
  ```
  npm run test
  ```
  
## Running Using Docker
1. write required variables in docker-compose.yml
2. Run the following commands:
  ```
  docker-compose up
  ```

## [API Documentation](https://documenter.getpostman.com/view/20985353/UyxjFksf)

## Built With

1. [Nodejs](https://nodejs.org/en/)
2. [Redis](https://github.com/redis/node-redis)
3. [Mongodb](https://docs.mongodb.com/)

## Server Features
- [X] We can create user.
- [X] We can give user permissions on specific action.
- [X] We can revoke permissions from user on specific action.
- [X] Server can authenticate user to access a system.
- [X] Server can check user's permissions before do an action.
- [X] Server can force user to be logout from system.
## Todo
- [ ] increase test coverage
- [ ] handle owasp vulnerabilities
- [ ] deploy app
- [X] dockerize app
- [ ] secure creation services
- [ ] implement refresh token
- [ ] convert postman documentation to swagger documentation
