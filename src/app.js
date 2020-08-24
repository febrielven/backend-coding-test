'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const log = require('./utils/logger');
const { validationResult } = require('express-validator');
const errorMsg = require('./utils/errorMsg').errorMsg;
const validate =  require('./utils/validation').validate;
const handleError = require('./utils/handleError').handleError;
const models =  require('./models/rides');

module.exports = (db) => {

    
    /**
     * @description api GET health  
     * @response status 200 OK
     */
    app.get('/health', (req, res) => res.send('Healthy'));

    /**
     * @description func api post rides
     * @param {Object{}} req.body The list of rides Object
     * @param {integer} req.body.start_lat The start latitude
     * @param {integer} req.body.start_long The start longitude
     * @param {integer} req.body.end_lat The end latitude
     * @param {integer} req.body.end_long The end longitude
     * @param {string}  req.body.rider_name The rider name
     * @param {string}  req.body.driver_name The driver name
     * @param {string}  req.body.driver_vehicle The vehicle type
     * @method POST /rides
     * @respose status 422 Unprocessable Entity @returns {Object} return VALIDATION_ERROR
     * @respose status 500 Internal Server Error @returns {object} return SERVER_ERROR
     * @respose status 200 OK @returns {Array} return list rides
     */
    app.post('/rides',
        jsonParser,
        validate.postRide, 
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    error_code: 'VALIDATION_ERROR',
                    detail: errors.array()
                });
            }

            var args = [
                req.body.start_lat, 
                req.body.start_long, 
                req.body.end_lat, 
                req.body.end_long, 
                req.body.rider_name, 
                req.body.driver_name, 
                req.body.driver_vehicle
            ];
        
            try {
                let rows = await models.save(args, db);
                rows = await models.findByID(rows.lastID, db);
                if (rows.length === 0) {
                    return res.status(422).send(
                        handleError('RIDES_NOT_FOUND_ERROR',errorMsg.errRides)
                    );
                }

                res.send(rows);

        
            } catch (err)  {
                log.error(err);
                return res.status(500).send(
                    handleError('SERVER_ERROR',errorMsg.errUnknown)
                );
            }
        }
    );
    
    /**
     * @description func api GET rides  
     * @param {Object{}} req.query The with pagination
     * @param {integer} req.query.page of pagination
     * @param {integer} req.query.limit of pagination
     * @method GET /rides
     * @respose status 422 Unprocessable Entity @returns {Object} return VALIDATION_ERROR
     * @respose status 500 Internal Server Error @returns {object} return SERVER_ERROR
     * @respose status 200 OK @returns {Array} return list rides
     */
    app.get('/rides', validate.getRide,async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error_code: 'VALIDATION_ERROR',
                detail: errors.array()
            });
        }
        let page =  Number(req.query.page) || 1;
        let limit= Number(req.query.limit) || 10;
        const skip= (page - 1 ) * limit;  
        try {
            const rows = await models.getAll(skip,limit, db);
            if (rows.length === 0) {
                return res.status(422).send(
                    handleError('RIDES_NOT_FOUND_ERROR',errorMsg.errRides)
                );
            }
            res.send(rows);
      
        } catch (err)  {
            log.error(err);
            return res.status(500).send(
                handleError('SERVER_ERROR',errorMsg.errUnknown)
            );
        }
    
    });


    /**
     * @description func api GET rides  
     * @param {Object{}} req.params The Rides object
     * @param {integer} req.query.id of rides object
     * @method GET /rides/:id
     * @respose status 422 Unprocessable Entity @returns {Object} return VALIDATION_ERROR
     * @respose status 500 Internal Server Error @returns {object} return SERVER_ERROR
     * @respose status 200 OK @returns {Array} return list rides
     */
    app.get('/rides/:id', async(req, res) => {
        const rideID = req.params.id;
        try {
            const rows = await models.findByID(rideID, db);
            if (rows.length === 0) {
                return res.status(422).send(
                    handleError('RIDES_NOT_FOUND_ERROR',errorMsg.errRides)
                );
            }
            res.send(rows);
      
        } catch (err)  {
            log.error(err);
            return res.status(500).send(
                handleError('SERVER_ERROR',errorMsg.errUnknown)
            );
        }
    });

    return app;
};
