'use strict';

/**
 * message service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message.message', ({strapi}) => ({
    async create() {
        strapi.log.info("메시지 생성")
    } 
}));
