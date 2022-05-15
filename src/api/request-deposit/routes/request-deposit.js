'use strict';

module.exports = {
    routes: [
        {
          method: 'GET',
          path: '/request-deposits',
          handler: 'request-deposit.findByUserId',
        },
        {
            method: 'POST',
            path: '/request-deposits',
            handler: 'request-deposit.create',
        },
    ],
};
