'use strict';

/**
 * address-book router.
 */

 module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/address-book',
            handler: 'address-book.findById',
        },
        {
            method: 'POST',
            path: '/address-book',
            handler: 'address-book.create',
        },
        {
            method: 'POST',
            path: "/address-book-phone",
            handler: 'address-book.findByAddressId',
        },
        {
            method: 'DELETE',
            path: '/address-book',
            handler: 'address-book.deleteById',
        },
    ]
}
