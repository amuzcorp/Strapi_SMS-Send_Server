'use strict';

/**
 * message-component service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message-component.message-component');
