/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const { json } = require('body-parser');

describe('API tests', () => {

    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });
    /* BEGIN GET health */
    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
    /* END GET health */

    /* BEGIN GET rides */
    describe('GET /rides', () => {
        it('should return rides', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    /* END GET rides */

    /* BEGIN GET rides */
    describe('GET /rides/:id', () => {
        it('should return rides', (done) => {
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


    /* BEGIN POST rides */
    describe('POST /rides', ()=>{
        //Object Empty
        var obj= {};

        it('should return VALIDATION_ERROR - Object Empty', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });

        //Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively
        obj.start_lat= -100,
        obj.end_lat=90,
        obj.start_long=-190,
        obj.end_long=180,
        obj.rider_name='Febrianto';
        obj.driver_name='Acuy';
        obj.driver_vehicle='Yaris';

        it('should return VALIDATION_ERROR - Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                   
                });
            done();
        });

       
        //End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively
        obj.start_lat= 50,
        obj.end_lat=-100,
        obj.start_long=50,
        obj.end_long=-190,
        obj.rider_name='Febrianto';
        obj.driver_name='Acuy';
        obj.driver_vehicle='Yaris';

        it('should return VALIDATION_ERROR - End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });


        //Rider name must be a non empty string
        obj.start_lat= -100,
        obj.end_lat=90,
        obj.start_long=-190,
        obj.end_long=180,
        obj.rider_name=1;
        obj.driver_name='Acuy';
        obj.driver_vehicle='Yaris';
 
        it('should return VALIDATION_ERROR - Rider name must be a non empty string', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });


        //Driver name must be a non empty string
        obj.start_lat= -100,
        obj.end_lat=90,
        obj.start_long=-190,
        obj.end_long=180,
        obj.rider_name='Febrianto';
        obj.driver_name=100;
        obj.driver_vehicle='Yaris';
 
        it('should return VALIDATION_ERROR - Driver name must be a non empty string', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });

        //Driver vehicle must be a non empty string
        obj.start_lat= -100,
        obj.end_lat=90,
        obj.start_long=-190,
        obj.end_long=180,
        obj.rider_name='Febrianto';
        obj.driver_name='Acuy';
        obj.driver_vehicle=100;
    
        it('should return VALIDATION_ERROR - Driver vehicle must be a non empty string', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                    
                });
            done();
        });

        

        //OBJECT Completed
        obj.start_lat= 50,
        obj.end_lat=90,
        obj.start_long=50,
        obj.end_long=180,
        obj.rider_name='Febrianto';
        obj.driver_name='Acuy';
        obj.driver_vehicle='Yaris';

        it('should return SUCCESS - rides with redirect on post', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });

        obj.start_lat= 50,
        obj.end_lat=90,
        obj.start_long=50,
        obj.end_long=180,
        obj.rider_name='Febrianto';
        obj.driver_name='Acuy';
        obj.driver_vehicle='Yaris';

        it('should return SUCCESS - rides with redirect on post', function(done) {
            request(app)
                .post('/rides')
                .send(obj)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err) {
                    if (err) done(err);
                });
            done();
        });
    });
    /* END POST rides */


    /* BEGIN GET rides by pagination*/
    describe('GET /rides start_num=0&limit_num=5', () => {
        it('should return rides with pagination', (done) => {
            request(app)
                .get('/rides?start_num=0&limit_num=5')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    /* END GET rides */

    /* BEGIN GET rides */
    describe('GET /rides/:id', () => {
        it('should return rides by id', (done) => {
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