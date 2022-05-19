'use strict';

/**
 *  phone-book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::phone-book.phone-book', ({strapi}) => ({
    async find(ctx) {
        const res = await strapi.db.query('api::phone-book.phone-book').findMany({
            select: ['*'],
            where: {
                userId: ctx.state.user.id
            }
        })
        return res;
    },
    async create(ctx) {
        const datas = ctx.request.body;
        console.log('create',datas)
        const res = await strapi.db.query('api::phone-book.phone-book').create({
            data: {
                phoneInformation: ctx.request.body,
                userId: ctx.state.user.id
            }
        })
        return res;
    },
    async findManyById(ctx) {
        const datas = ctx.request.body;
        console.log('findmany',datas)
        return "200"
        // const res = await strapi.db.query('api::phone-book.phone-book').findMany({
        //     select: ['*'],
        //     where: {
        //         id: datas
        //     }
        // })
        // return res;
    }
}));
