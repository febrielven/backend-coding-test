'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const paginate =  require('../src/utils/pagination').paginate;
describe('Utils tests', () => {
    /**
         * @description test Func pagination
         * @param {integer} page of pagination
         * @param {integer} limit of pagination
         * @returns {Object[]} return object pagination
        */
    describe('Func Pagination Utils', () => {
        let page ;
        let limit;
        it('Test function pagination default should return object values skip & limit  ', (done)  => {   
            const pagination = paginate(page, limit);
            assert.deepEqual(pagination, {skip:0,limit:10});
            done();
        });

        it('Test function pagination should return object values skip & limit  ', (done)  => { 
            page = 2;
            limit= 5;
            const pagination = paginate(page, limit);
            assert.deepEqual(pagination, {skip:5,limit:5});
            done();
        });
    });

});