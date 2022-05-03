'use strict';

/**
 *  post controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::post.post', ({ strapi }) =>  ({
    async find(ctx) {
        console.log(ctx)
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
    async create(ctx) {
        const response = await super.create(ctx);
        console.log('유저', ctx.state.user.id);

        
        return response;
    },
    async index(ctx, next) {
        const entries = await strapi.db.query('api::post.post').findMany({
            select: ['userid'],
            where: {
                userid: 4
            },
        })
        console.log('entries',entries)
        const response = await super.find(ctx);
        return response;
    }
}));