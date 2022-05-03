module.exports = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;
        strapi.controller('api::post.asdasd');

        strapi.log.info('post-lifecycle-BC',JSON.stringify(data));
    },
    beforeDelete(event) {
        console.log('bD',event)
    }
};