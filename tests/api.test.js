/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const { json } = require('body-parser');
const app = require('../src/app')(db);
const buildSchemas = require('../db/schemas');
const dummy = require('../db/dummy');

describe('API tests', () => {

    /**
     * @description test connect db & create Rides 
     */
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }
            buildSchemas(db);

            done();
        });
    });

    /**
     * @description test api GET health 
     * @method GET /health
     * @type {Text} Content-Type
     * @response status 200 OK
     */
    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    /**
     * @description test api GET rides  
     * @method GET /health
     * @type {JSON} Content-Type
     * @response status 400 BAD REQUEST
     */
    describe('GET /rides', () => {
        it('should return BAD REQUEST - RIDES_NOT_FOUND_ERROR', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    /**
     * @description test api GET rides by rides id
     * @method GET /health
     * @type {JSON} Content-Type
     * @response status 400 BAD REQUEST
     */
    describe('GET /rides/:id', () => {
        it('should return BAD REQUEST - RIDES_NOT_FOUND_ERROR', (done) => {
            request(app)
                .get('/rides/100')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });
 

    /**
     * @description test api post rides
     * @param {Object{}} data The list of rides Object
     * @param {integer} data[].start_lat The start latitude
     * @param {integer} data[].start_long The start longitude
     * @param {integer} data[].end_lat The end latitude
     * @param {integer} data[].end_long The end longitude
     * @param {string}  data[].rider_name The rider name
     * @param {string}  data[].driver_name The driver name
     * @param {string}  data[].driver_vehicle The vehicle type
     * @method POST /health
     * @type {JSON} Content-Type
     * @response status 422 Unprocessable Entity
     * @response status 422 Unprocessable Entity
     * @response status 201 Created
     */
    describe('POST /rides', ()=>{

        //Object Empty
        let data1 = {};
        it('should return Unprocessable Entity - (VALIDATION_ERROR Object Empty)', function(done) {
            request(app)
                .post('/rides')
                .send(data1)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });

        //Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively
        let data2 = dummy.data(1)[0];
        data2.start_lat= -100,
        data2.start_long=-190,
        it('should return Unprocessable Entity - VALIDATION_ERROR (Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively)', function(done) {
            request(app)
                .post('/rides')
                .send(data2)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                   
                });
            done();
        });

       
        //End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively
        let data3 = dummy.data(1)[0];
        data3.end_lat=-100,
        data3.end_long=-190,
        it('should return Unprocessable Entity - VALIDATION_ERROR (End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively)', function(done) {
            request(app)
                .post('/rides')
                .send(data3)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });


        //Rider name must be a non empty string
        let data4 = dummy.data(1)[0];
        data4.rider_name=1;
        it('should return Unprocessable Entity - VALIDATION_ERROR (Rider name must be a non empty string)', function(done) {
            request(app)
                .post('/rides')
                .send(data4)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });


        //Driver name must be a non empty string
        let data5 = dummy.data(1)[0];
        data5.driver_name=100;
        it('should return Unprocessable Entity - VALIDATION_ERROR (Driver name must be a non empty string)', function(done) {
            request(app)
                .post('/rides')
                .send(data5)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });

        //Driver vehicle must be a non empty string
        let data6 = dummy.data(1)[0];
        data6.driver_vehicle=100;
        it('should return Unprocessable Entity - VALIDATION_ERROR (Driver vehicle must be a non empty string)', function(done) {
            request(app)
                .post('/rides')
                .send(data6)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });

    
        //Data Completed
        let data7 = dummy.data(1)[0];
        it('should return Created - rides with redirect on post', function(done) {
            request(app)
                .post('/rides')
                .send(data7)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });
    });


    /**
     * @description test api GET rides
     * @param {integer} page of pagination
     * @param {integer} limit of pagination
     * @method GET /rides
     * @type {JSON} Content-Type
     * @response status 200 OK
     */
    describe('GET /rides with pagination', () => {
        it('should return OK - list rides', (done) => {
            request(app)
                .get('/rides?page=1&limit=5')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });
   

    /**
     * @description test api GET rides/:id  
     * @response status 200 OK
     */
    describe('GET /rides/:id', () => {
        it('should return OK - list one rides', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    /* END GET rides */
    
});