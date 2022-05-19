'use strict';

/**
 * A set of functions called "actions" for "sms-auth`
 */
const axios = require("axios");

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const user = ctx.state.user;

      const phoneNum = JSON.stringify(ctx.request.body.phoneNum);
      // console.log(Object.keys(ctx.request.req), ctx.request.req)
      console.log(user.username, `의 요청 번호 `, phoneNum)
      // 코드 생성
      const code = module.exports.create4DigitCode();
      // // 레디스에 저장
      await module.exports.saveAuthCode(user.username, code);
      // // 문자 발송 함수 재활용
      // await sendMessageService(key, code);
      console.log(`문자 발송 완료!`,code);
      // return ctx.response.status(200).send({ message: "문자 발송 완료" });
    } catch (e) {
      console.log(e);
      // return ctx.response.status(500).send({ message: "문자 발송 실패 :(" });
    }
  },
  create4DigitCode: () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code + "";
  },
  
  // // redis에 key-value 형태로 저장
  saveAuthCode: async (key, code) => {
    const user = await strapi.db.query('api::user.user-permission').update({
      where: {
        username: key
      },
      data: {
        auth_key: code
      }
    });
  },
  
  // // 코드 일치 여부 확인
  // compareAuthCode: async (key, code) => {
  //   const result = await client.get(key);
  //   console.log(result);
  //   if (code === result) {
  //     await client.del(key);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
  
  // // NCP SENS를 이용하는 문자 전송 
  // sendMessageService: async (to, content) => {
  //   // const { to, content } = req.body;
  //   const timestamp = Date.now() + "";
  //   const signature = getSignature(SMS_ID, ACCESS_KEY, SECRET_KEY, timestamp);
  
  //   // 문자열 배열 || 문자열 에 대한 예외처리
  //   console.log(to instanceof Array);
  //   const messages =
  //     to instanceof Array
  //       ? to.map(
  //           (number) =>
  //             new Object({
  //               to: number,
  //             })
  //         )
  //       : [{ to: to }];
  
  //   const body = JSON.stringify({
  //     type: "SMS",
  //     countryCode: "82",
  //     from: "01027573860",
  //     content,
  //     messages,
  //   });
  
  //   const response = await fetch(
  //     `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_ID}/messages`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         "x-ncp-apigw-timestamp": timestamp,
  //         "x-ncp-iam-access-key": `${ACCESS_KEY}`,
  //         "x-ncp-apigw-signature-v2": signature,
  //       },
  //       body: body,
  //     }
  //   );
  
  //   const result = await response.json();
  
  //   if (result.statusCode === "202") {
  //     logger.info("문자 전송 성공");
  //     return 1;
  //   } else {
  //     logger.error("문자 전송 실패");
  //     return 0;
  //   }
  // },
  // codeValidationController: async (ctx, next) => {
  //   const { phoneNum, code } = ctx.body;
  //   const result = await compareAuthCode(phoneNum, code);
  //   return res.status(200).send(result);
  // }
  
};

