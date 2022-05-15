'use strict';

/**
 * phone-book service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::phone-book.phone-book');
