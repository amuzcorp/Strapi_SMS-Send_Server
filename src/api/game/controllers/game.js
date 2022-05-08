'use strict';

/**
 * A set of functions called "actions" for `game`
 */

module.exports = {
  userList: async(ctx, next) => {
    const entries = await strapi.db.query('plugin::users-permissions.user').findMany({
        select: ['id', 'username', 'hasMoney', 'createdAt'],
    })
    // console.log(ctx.request.header)
    // console.log('entries',entries)
    return entries;
},
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  holzzakBetting: async(ctx, next) => {
    try {
      let answer = Math.floor(Math.random() * 2 + 1);
      // console.log(ctx.request.body.data.betValue, '원 베팅');
      // console.log(ctx.request.body.data.bettingValue == 1 ? "홀" : "짝");
      // console.log('정답: ', answer);
      if(ctx.request.body.data.bettingValue !== 1 && ctx.request.body.data.bettingValue !== 2 || ctx.request.body.data.betValue <= 0) {
        console.log(ctx.request.body)
        ctx.body = "오류"
      }
      else if(ctx.state.user.hasMoney < ctx.request.body.data.betValue) {
        ctx.body = "금액 부족"
      } 
      else {
        if(answer === ctx.request.body.data.bettingValue) {
          await strapi.db.query('plugin::users-permissions.user').update({
            select: ['hasMoney'],
            where: {
              username: ctx.state.user.username
            },
            data: {
              hasMoney: parseInt(ctx.state.user.hasMoney) + parseInt(ctx.request.body.data.betValue)
            }
          })
          ctx.body = '이득';
        } else {
          await strapi.db.query('plugin::users-permissions.user').update({
            select: ['hasMoney'],
            where: {
              username: ctx.state.user.username
            },
            data: {
              hasMoney: parseInt(ctx.state.user.hasMoney) - parseInt(ctx.request.body.data.betValue)
            }
          })
          ctx.body = '손실';
        }
      }
    } catch (err) {
        console.log(err);
        ctx.body = err; 
    }
  }
};
