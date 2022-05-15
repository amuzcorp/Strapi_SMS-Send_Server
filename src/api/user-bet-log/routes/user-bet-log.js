'use strict';

/**
 * user-bet-log router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
        {
          method: 'GET',
          path: '/user-bet-logs',
          handler: 'user-bet-log.findByUserId',
        },
        {
            method: 'GET',
            path: '/user-bet-log',
            handler: 'user-bet-log.findAll',
        },
    ],
};

