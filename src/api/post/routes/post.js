'use strict';

/**
 * post router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;                       

// module.exports = createCoreRouter('api::post.post');
module.exports = createCoreRouter('api::post.post',{
    routes: [
    {
        method: 'GET',
        path: '/posts',
        handler: 'post.find',
        // config: {
        //     policies: ['post']
        // }
    },
      {
        method: 'POST',
        path: '/posts',
        handler: 'post.create',
        config: {
          policies: ['post']
        }
      },
      {
        method: 'DELETE',
        path: '/posts',
        handler: 'post.delete',
        // config: {
        //   policies: ['post']
        // }
      }
    ]
  });