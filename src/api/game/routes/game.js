module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/game/user',
      handler: 'game.userList',
    },
    {
      method: 'GET',
      path: '/game/test',
      handler: 'game.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
     method: 'POST',
     path: '/game/holzzak',
     handler: 'game.holzzakBetting',
    },
  ],
};
