// import got from "got";

// /**
//  * 给微信公众号推送消息
//  * @description:
//  */
// export const sendMessage = () => {
//   let wxUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${ACCESS_TOKEN}`
//   const options = {
//     hooks: {
//       beforeRequest: [
//         options => {
//           Object.assign(options.headers, HEADERS);
//         },
//       ],
//     },
//   };

//   const { err_no, err_msg, data } = await got.post(wxUrl, options).json();

// }