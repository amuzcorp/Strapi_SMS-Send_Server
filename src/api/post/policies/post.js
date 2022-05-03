'use strict';

/**
 * `post` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
    // Add your own logic here.
    let datas = policyContext;
    // for(let data in datas) {
    //   for(let data2 in data) {
    //     try {
    //       strapi.log.info(data2);
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // }
    // strapi.log.info(JSON.stringify(policyContext.state.user))
    
    // const userID = JSON.stringify(policyContext.state.user.id);
    // const postList = JSON.stringify(policyContext.state.posts);

    // const policiesList = Object.keys(policyContext.request.params);

    

    console.log('정책');
    // console.log(Object.keys(policyContext[policiesList[8]]))

    // for(let i=0; i<policiesList.length; i++) {
    //   try {
    //     console.log(`======${policiesList[i]}=======`)
    //     console.log(Object.keys(policyContext[policiesList[i]]));
    //   } catch (error) {
        
    //   }
    // }


    // console.log('request', Object.keys(policyContext.request.app));
    // console.log('request', JSON.stringify(policyContext.request.app));
    const PassDelete = true;
    
    if (PassDelete) {
      return true;
    }

    return false;
};
