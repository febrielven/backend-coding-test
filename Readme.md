# MASTER RIDER PROJECT
The project rider master is the rider master API, with an API that makes it easy for a developer to build a custom Rider app for any platform. This project is made with node js and is equipped with Unit testing, documentation, toolling, security and load testing.
# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installing Requirements
1. Install Node js `(node >8.6 and <= 10)` and `npm`
2. Install GIT (Version Control System) from `https://git-scm.com`
2. Install eslint to global run`npm install eslint -g`

## Setup & Development
1. Download / clone Source Code Project backend-coding-test. 
    
    example: `git clone https://github.com/febrielven/backend-coding-test.git`
2. Ensure `node (>8.6 and <= 10)` and `npm` are installed
3. Run `npm install` to install the library / package
4. IF install sqlite3 fails, then run `npm install sqlite3`
5. Install library tooling eslint in global, run `npm install eslint -g`
6. create forder name `/filelog/` in directory backend-coding-test. There is a console log in there and all errors should be logged as well
6. Run `npm run lint` 
5. Run `npm test`
6. Run `npm run coverage`
6. Run `npm start`


## Its  Project / API features are:
1. [GET Health](#get-health)
1. [POST Rides](#post-rides)
2. [GET Rides List](#get-rides-list)
3. [Get Rides by ID](#get-rides-by-id)

## Here is the API documentation:

### GET Health
   ##### GET /health
    example `http://localhost:8010/health`
   ##### HEADERS
    Content-Type: text
    
   ##### RESULT 
    
    Code: 200
    String : Healthy
    
### POST Rides
   ##### POST /rides
    example `http://localhost:8010/rides`
   ##### HEADERS
    Content-Type: application/json

   ##### PATH Parameter
   - **start_lat** `integer`  `required`
   - end_lat `integer`  `required`
   - **start_long** `integer`  `required`
   - **end_long** `integer`  `required`
   - **rider_name** `string`  `required`
   - **driver_name** `string`  `required`
   - **driver_vehicle** `string`  `required`
   ###### BODY  `raw`
        {
            "start_lat":1,
            "end_lat":90,
            "start_long":1,
            "end_long":180,
            "rider_name":"FEBRIANTO",
            "driver_name":"Acuy",
            "driver_vehicle":"Yaris"
        }


 ##### RESULT 
    
    Code: 200
    {
        "rideID": 1,
        "startLat": 1,
        "startLong": 1,
        "endLat": 90,
        "endLong": 180,
        "riderName": "FEBRI",
        "driverName": "Acuy",
        "driverVehicle": "Yaris",
        "created": "2020-08-19 03:22:14"
    }


### GET Rides
   ##### GET /rides
    example `http://localhost:8010/rides`
   ##### HEADERS
    Content-Type: application/json
  

 ##### RESULT 
    
    Code: 200
    [
            {
            "rideID": 1,
            "startLat": 1,
            "startLong": 1,
            "endLat": 90,
            "endLong": 180,
            "riderName": "FEBRI",
            "driverName": "Acuy",
            "driverVehicle": "Yaris",
            "created": "2020-08-19 03:22:14"
        }
    ]

### GET Rides by ID
   ##### GET /rides/:id
    example `http://localhost:8010/rides/1`
   ##### HEADERS
    Content-Type: application/json
  

 ##### RESULT 
    
    Code: 200
    [
            {
            "rideID": 1,
            "startLat": 1,
            "startLong": 1,
            "endLat": 90,
            "endLong": 180,
            "riderName": "FEBRI",
            "driverName": "Acuy",
            "driverVehicle": "Yaris",
            "created": "2020-08-19 03:22:14"
        }
    ]


