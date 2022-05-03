'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('game-monitoring')
      .service('myService')
      .getWelcomeMessage();
  },
};
