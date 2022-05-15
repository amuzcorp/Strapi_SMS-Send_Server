'use strict';

/**
 * message-component router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::message-component.message-component');
