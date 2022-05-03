
module.exports = {
  
  // ...
  'game-monitoring': {
    enabled: true,
    resolve: './src/plugins/game-monitoring'
  },
  "io": {
    "enabled": true,
    "config": {
      "IOServerOptions" :{
        "cors": { "origin": "http://localhost:8080", "methods": ["GET"] },
      },
      "contentTypes": {
        "message": "*",
        "chat":["create"]
      },
      "events":[
        {
          "name": "connection",
          "handler": ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
            strapi.$io.emit("api::message.message.create", 'test');
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
          "handler": async ({ strapi }, socket) => {
            try {
              strapi.log.info(JSON.stringify(socket));
              // let query = strapi.services.message.create(JSON.stringify(socket))
              
              // strapi.$io.emit('getChat', "create", query);
            } catch(err) {
              console.log(err);
            }
          },
        },
      ]
    },
  },
  // ...
}
