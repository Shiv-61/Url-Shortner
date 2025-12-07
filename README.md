# URL SHORTENER PROJECT

A simple and efficient URL Shortener web application built using Node.js and Express.js.  
This project allows users to convert long URLs into short, easy-to-share links and automatically redirects users to the original URL when the shortened link is accessed.

This project is ideal for learning:
- Backend development using Node.js
- REST API creation
- Routing with Express
- Database integration
- Full-stack project structure

--------------------------------------------

## FEATURES

- Convert long URLs into short links  
- Automatic redirection to original URL  
- REST API support  
- JSON data handling  
- Environment variable support using dotenv  
- Clean MVC folder structure  
- Beginner-friendly backend project  

--------------------------------------------

## TECH STACK

- Node.js  
- Express.js  
- JavaScript  
- MongoDB
- Postman for API testing  

--------------------------------------------

## PROJECT SETUP

Follow the steps below to run this project on your local machine:

1. Download or clone the project repository  
2. Open the project folder in VS Code  
3. Open terminal inside the project  
4. Install dependencies using:

   npm install

5. Start the backend server using:

   node app.js  
   OR  
   nodemon app.js

6. Server will start on the defined PORT inside your environment variable or default port

--------------------------------------------

## API USAGE

### 1. Generate Short URL

Method: POST  
Endpoint: /generate  
Body (JSON):

{
  "longUrl": "https://www.geeksforgeeks.org/node-js/rest-api-introduction/"
}

Response:

{
  "shortUrl": "https://example.xyz/abc123"
}

--------------------------------------------

### 2. Redirect Using Short URL

Method: GET  
Endpoint:

/abc123

The browser will automatically redirect to the original website.

--------------------------------------------

## PROJECT STRUCTURE

Root Folder  
│  
├── Controller  
│   └── UserRoutes.js  
│  
├── Model  
│   └── URLModel.js  
│  
├── node_modules  
│  
├── .env  
├── app.js  
├── package.json  
├── package-lock.json  
└── README.md  

--------------------------------------------

## COMMON ERRORS HANDLED

- Port mismatch fixed 
- Invalid route handling  
- JSON middleware configuration  
- Invalid method request errors  
- Body parsing errors  

--------------------------------------------

## FUTURE IMPROVEMENT AND SCALING

- Add Redis for caching.
- Capable of 10K requests.  

--------------------------------------------

## Key Learning

This project helps understand:
- How APIs work
- How redirection works in web servers
- How URLs are stored in databases
- How full-stack projects are structured

--------------------------------------------
