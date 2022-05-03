'use strict';

/**
 * post service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post.post' ,({strapi}) => ({
    async find(params) {
        const { results, pagination } = await super.find(params);
        // const entries = await strapi.db.query('api::post.post').findMany({
        //     select: ['*'],
        //     where: {
        //         userid: '4'
        //     },
        // })
        // console.log('entries',entries)
        return { results, pagination };
    },
    async create(params, ctx) {
        console.log("글 쓰기", ctx)
        const { results, pagination } = await super.create(params);
        return { results, pagination };
    },
    async delete(params) {
        const { results, pagination } = await super.delete(params);
        console.log('삭제', params)
        return { results, pagination };
    },
    async findByUserId(param) {
        console.log('findByUserId')
        const { results, pagination } = await super.find(params);
    }
}));

