'use strict';

/**
 *  address-book controller
 */

module.exports = {
    create: async(ctx, next) => {
        const entries = await strapi.db.query('api::address-book.address-book').create({
            data: {
                userId: ctx.state.user.id,
                AddressInformation: ctx.request.body
            }
        })
        return entries;
    },
    findById: async(ctx) => {
        const data = await strapi.db.query('api::address-book.address-book').findMany({
            where: {
                userId: ctx.state.user.id,
            },
            select: ["*"]
        });
        console.log(ctx.request.body)
        return data;
    },
    findByAddressId: async(ctx) => {
        const data = await strapi.db.query('api::address-book.address-book').findMany({
            where: {
                id: ctx.request.body.data.id
            },
            select: ["AddressInformation"]
        });
        let numberList = data[0].AddressInformation.data.numberList;
        
        const res = await strapi.db.query('api::phone-book.phone-book').findMany({
            select: ['*'],
            where: {
                id: numberList
            }
        });
        return res;
    },
    deleteById: async(ctx) => {
        let userHasId = await strapi.db.query('api::address-book.address-book').findMany({
            where: {
                userId: ctx.state.user.id,
            },
            select: ["id"]
        });
        let data;
        let requestId = ctx.originalUrl.split("=")[1]
        
        let check_user = userHasId.filter(data => {
            if(data.id == requestId) return 1;
        });
        console.log(check_user)

        if(check_user) {
            data = await strapi.db.query('api::address-book.address-book').delete({
                where: {
                    id: check_user.id,
                },
            })
        } else {
            data = "권한 없음";
        }
        return data;
    }
}