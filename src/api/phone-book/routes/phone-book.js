'use strict';

/**
 * phone-book router.
 */
module.exports = {
    routes: [
        {
          method: 'GET',
          path: '/phone-books',
          handler: 'phone-book.find',
        },
        {
          method: 'GET',
          path: '/phone-books-id',
          handler: 'phone-book.findManyById',
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
};
