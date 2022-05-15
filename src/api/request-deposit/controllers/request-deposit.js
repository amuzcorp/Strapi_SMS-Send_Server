'use strict';

/**
 *  request-deposit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::request-deposit.request-deposit', ({strapi}) => ({
    async findByUserId(ctx) {
        const entries = await strapi.db.query('api::request-deposit.request-deposit').findMany({
            select: ['*'],
            where: {
                userId: ctx.state.user.id
            },
        });
        return entries;
    },
    async create(ctx) {
        let userId = `${ctx.state.user.id}`;
        let title = ctx.request.body.data.title;
        let requestMoney = ctx.state.user.requestMoneyValue;

        ctx.request.body.data = {
            title: title,
            userId: userId,
            requestMoney: requestMoney
        }

        const response = await super.create(ctx);
        return response;
    }
}));
