
module.exports = {
  
  // ...
  'game-monitoring': {
    enabled: true,
    resolve: './src/plugins/game-monitoring'
  },
  "io": {
    "enabled": false,
    "config": {
      "contentTypes": {
        "message": "*",
        "chat":["create"]
      },
      "events":[
        {
          "name": "connection",
          "handler": async ({ strapi }, socket, ctx ) => {
            try {
              strapi.log.info(`[io] new connection with id ${socket.id}`);
              // strapi.log.info(Object.keys(ctx));
            // strapi.$io.emit("api::message.message.create",;
            } catch (error) {
              strapi.log.info(error);
            }
            
          },
        },
        {
          "name": "disconnection",
          "handler": ({ strapi }, socket) => {
            strapi.log.info(`연결해제 ${socket}`);
          },
        },
        {
          "name": "chatSend", 
          "handler": async ({ strapi }, ctx) => {
            try {
              // strapi.log.info('id')
              strapi.log.info(ctx.msg);
              // let query = strapi.services.message.create(JSON.stringify(socket))
              
              // strapi.log.info('id', ctx.state.user.id);
              const data = { data: {userId: 4, msg: ctx.msg} }
              // strapi.log.info(await strapi.$io.emit("_getStrapiRooms"));
              await strapi.$io.emit("api::message.message", data);
            } catch(err) {
              strapi.log.info(err);
            } 
          },
        },
      ]
    },
  },
  // ...
}
