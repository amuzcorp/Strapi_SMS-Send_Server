'use strict';

/**
 * request-deposit service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::request-deposit.request-deposit');
