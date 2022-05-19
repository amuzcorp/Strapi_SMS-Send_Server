'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    try {
      let count = 0; // 회차
      let answer; // 홀짝 결과
      let betTimeout; // 베팅 시간
      let users = [];
      let betList = [];

      const jwt_decode = require("jwt-decode");
      let Koa = require('koa');
      let app = new Koa();
      let server = require('http').createServer(app.callback());
      let io = require('socket.io')(server,{
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      
      setInterval(() => {
        io.to("room1").emit('betTimeout', betTimeout);
        betTimeout--;
      }, 1000)
      
      setInterval(() => {
        betTimeout = 9;
        answer = parseInt(Math.random()*2);
        let admin = {
          count: count++,
          answer: answer,
          username: "게임결과"
        }
        io.to("room1").emit('getMsg', admin); // 게임 결과
        ;
        if(betList !== []) {
          betList.forEach(async (user) => {
            const userOne = await strapi.db.query("plugin::users-permissions.user").findMany({
              where: {
                username: user.username
              },
            })
            if(user.betSelect == answer) {
              await strapi.db.query("plugin::users-permissions.user").update({
                where: {
                  username: user.username
                },
                data: {
                  hasMoney: parseInt(userOne[0].hasMoney) + parseInt(user.betValue)
                }
              })
            } else {
              await strapi.db.query("plugin::users-permissions.user").update({
                where: {
                  username: user.username
                },
                data: {
                  hasMoney: parseInt(userOne[0].hasMoney) - parseInt(user.betValue)
                }
              })
            }
            
          })
        }
        betList = []
      }, 10000);

      

      io.on('connection', async (socket) => {
          
          let conData = {
            msg: {
              msg: socket.id
            },
          }

        socket.on('room1', async () => {
          let decoded = jwt_decode(socket.handshake.headers.authorization);
          const userId = decoded.id;
          let user = await strapi.plugins["users-permissions"].services.user.fetch({
            id: userId,
          });
          // console.log('con', user.username, users, users.indexOf(user.username))
          if(users.indexOf(user.username) == -1) {
            users.push(user.username);
          } else {
            // let index = users.indexOf(user.username);
            // users.pop(index);
          }

          socket.join("room1");
          io.to("room1").emit("joinUser", users);
        })

        socket.on('bet', async (data) => {
          let decoded = jwt_decode(socket.handshake.headers.authorization);
          const userId = decoded.id;
          let user = await strapi.plugins["users-permissions"].services.user.fetch({
            id: userId,
          });
          let betData = {
            username: user.username,
            betValue: data.betValue,
            betSelect: data.betSelect
          };
          if(betData.betValue <= user.hasMoney) {
            betList.push(betData);
            io.to("room1").emit('getBet', betList);
          }
          
        })

        socket.on('disconnection', async () => {
          let decoded = jwt_decode(socket.handshake.headers.authorization);
            const userId = decoded.id;
            let disUser = await strapi.plugins["users-permissions"].services.user.fetch({
              id: userId,
            });
            let index = users.indexOf(disUser.username);
            console.log('dis', users.pop(index));
            io.to("room1").emit("joinUser", users)
        })
        
      });
      server.listen(3000, () => {
        console.log('Application is starting on port 3000')
      });
    } catch (error) {
      console.log("error")
    }
  },
};