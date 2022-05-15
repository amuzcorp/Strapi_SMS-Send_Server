'use strict';

/**
 *  user-bet-log controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-bet-log.user-bet-log', ({strapi}) => ({
    async findByUserId(ctx) {
        const entries = await strapi.db.query('api::user-bet-log.user-bet-log').findMany({
            select: ['*'],
            where: {
                userId: ctx.state.user.id
            },
        });
        return entries;
    },
    async findAll(ctx) {
        const entries = await strapi.db.query('api::user-bet-log.user-bet-log').findMany({
            select: ['userId','result'],
        });
        return entries;
    }
}))
