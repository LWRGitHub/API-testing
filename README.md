# API Testing
This is code writen to test an API for messages.


## Tecnologies Used
- Node.js
- JavaScript
- Chia
- Mocha
- nodemon
- espress
- mongoose
- dotenv
- cors


## Install/Setup

```
npm install
npm test
``` 


## Endpoints:

#### Messages 

| Route | Method | Description |
| ----------- | ----------- | ----------- |
|http://localhost:3000/messages |GET | Gets all messagess |
|http://localhost:3000/messages/{messageId} |GET | Get one message by id|
|http://localhost:3000/messages | POST | add a new message |
|http://localhost:3000/messages/{messageId}| PUT | update an exisiting message|
|http://localhost:3000/messages/{messageId} | DELETE | delete a message |

{messageId} = Route parameter = `:messageId`
#### Users

| Route | Method  | Description |
| ----------- | ----------- | ----------- |
|http://localhost:3000/users/ | GET | get all users |
|http://localhost:3000/users/{userId} |GET | Get one user by id|
|http://localhost:3000/users | POST | add a new user to the database |
|http://localhost:3000/users/{userId}| PUT | update an exisiting user|
|http://localhost:3000/users/{userId} | DELETE | delete a user |

{userId} = Route parameter = `:userId`