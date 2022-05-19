'use strict';

/**
 * A set of functions called "actions" for `game`
 */

module.exports = {
  userList: async(ctx, next) => {
    const entries = await strapi.db.query('plugin::users-permissions.user').findMany({
      select: ['id', 'username', 'hasMoney', 'createdAt'],
      populate: {
        betLog: true,
      },
    })
    // console.log(ctx.request.header)
    // console.log('entries',entries)
    return entries;
},
  exampleAction: async (ctx, next) => {
    try {
      const express = require('express');
    const app = express();

    const port = 1338;

    app.get("/sse", (req, res) => {
      res.setHeader("Content-Type", 'text/event-stream');
      res.setHeader("Access-Control-Allow-Origin", '*');

      const intervalId = setInterval(() => {
        const date = new Date().toDateString();
        res.write(`data: ${date}\n\n`)
      }, 1000)

      res.on("close", () => {
        strapi.log.info("Close");
        clearInterval(intervalId);
        res.end();
      })
      
    })

    app.listen(port, () => {
      strapi.log.info("Server Run", port)
    })
    
    strapi.log.info("strapi")
    } catch (err) {
      ctx.body = err;
    }
  },
  holzzakBetting: async(ctx, next) => {
    const axios = require("axios");
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
        let hasMoney = ctx.state.user.hasMoney;
        let gameResult;
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
          ctx.body = gameResult = '이득';
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
          ctx.body = gameResult = '손실';
          
        }

        // bet log
        // const res = await strapi.db.query('plugin::users-permissions.user').update({
        //   populate: {
            
        //   },
        //   data: {
        //     gameName: 'asd',
        //     result: null, 
        //     hasMoneied: '12323',
        //     betValue: '123'
        //   },
        //   where: {
        //     id: ctx.state.user.id
        //   }
        // })
        console.log(res)
      }
      
    } catch (err) {
        console.log(err);
        ctx.body = err; 
    }
  }
};