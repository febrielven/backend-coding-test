'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../db/schemas');
const dummy = require('../db/dummy');
const models =  require('../src/models/rides');
const paginate =  require('../src/utils/pagination').paginate;
describe('Models async tests', () => {

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
     * @description test models rides
     */
    describe('Run Query in models', () => {
        
        /**
         * @description test Run Query save rides
         * @param {Array[]} args The list of rides Object
         * @param {integer} data.start_lat The start latitude
         * @param {integer} data.start_long The start longitude
         * @param {integer} data.end_lat The end latitude
         * @param {integer} data.end_long The end longitude
         * @param {string}  data.rider_name The rider name
         * @param {string}  data.driver_name The driver name
         * @param {string}  data.driver_vehicle The vehicle type
         * @param {db} connect database sqlite3
         * @returns {Object{}}  Object Error Query
        */
        it('Run Save Query should return object Error', (done)  => {
            var args = [
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null
            ];
            const rows = models.save(args, db);
            rows
                .then(res => {
                    done();
                })
                .catch(error => {
                    done();
                });
        });

        /**
         * @description test Run Query save rides
         * @param {Array[]} args The list of rides Object
         * @param {integer} data.start_lat The start latitude
         * @param {integer} data.start_long The start longitude
         * @param {integer} data.end_lat The end latitude
         * @param {integer} data.end_long The end longitude
         * @param {string}  data.rider_name The rider name
         * @param {string}  data.driver_name The driver name
         * @param {string}  data.driver_vehicle The vehicle type
         * @param {db} connect database sqlite3
         * @returns {Object{}}  Object lastID
        */
        it('Run Save Query should return object lastID ', (done)  => {
            const data = dummy.data(1)[0];
            var args = [
                data.start_lat, 
                data.start_long, 
                data.end_lat, 
                data.end_long, 
                data.rider_name, 
                data.driver_name, 
                data.driver_vehicle
            ];
            const rows = models.save(args, db);
            rows
                .then(res => {
                    assert.deepEqual(res, { lastID: 1 });
                    done();
                })
                .catch(error => {
                    done(error);
                });
        });

        


        /**
         * @description test Run Query getAll of rides
         * @param {integer} pagination.skip of pagination
         * @param {integer} pagination.page of pagination
         * @param {db} connect database sqlite3
         * @returns {Array[]} return array list rides
        */
        it('Run getAll Query should return list rides ', (done)  => {
            
            let page =  1;
            let limit= 5;
            const pagination = paginate(page, limit);
            const rows = models.getAll(
                pagination.skip, 
                pagination.limit, 
                db
            );
            rows
                .then(res => {
                    assert.deepEqual(res[0].rideID, 1);
                    done();
                })
                .catch(error => {
                    done(error);
                });
        });


        /**
         * @description test Run Query findByID of rides
         * @param {integer} rideID of rides
         * @param {db} connect database sqlite3
         * @returns {Array[]} return array list rides
        */
        it('Run findByID Query should return list rides ', (done)  => {
            
            const rideID =1;
            const rows = models.findByID(
                rideID,
                db
            );
            rows
                .then(res => {
                    assert.deepEqual(res[0].rideID, 1);
                    done();
                })
                .catch(error => {
                    done(error);
                });
        });
    });

});