module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/sms-auth',
     handler: 'sms-auth.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
