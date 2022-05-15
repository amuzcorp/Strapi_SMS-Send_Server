'use strict';

/**
 * phone-book router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::phone-book.phone-book', {
    routes: [
        {
            method: 'GET',
            path: '/phone-books',
            handler: 'phone-book.find',
        },
          {
            method: 'POST',
            path: '/phone-books',
            handler: 'phone-book.create',
          },
          {
            method: 'DELETE',
            path: '/phone-books',
            handler: 'phone-book.delete',
            // config: {
            //   policies: ['post']
            // }
          }
        ]
});
