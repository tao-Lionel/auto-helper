import { http } from "../utils/http.js";
import { JD_COOKIE } from "../ENV.js";

const baseURL = "https://api.m.jd.com/client.action";
const HEADERS = {
  Cookie: JD_COOKIE,
  Host: "api.m.jd.com",
  Connection: "keep-alive",
  "User-Agent":
    "jdapp;android;12.0.10;;;M/5.0;appBuild/98875;ef/1;ep/%%7B%%22hdid%%22%%3A%%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%%3D%%22%%2C%%22ts%%22%%3A1692262711992%%2C%%22ridx%%22%%3A-1%%2C%%22cipher%%22%%3A%%7B%%22sv%%22%%3A%%22CJK%%3D%%22%%2C%%22ad%%22%%3A%%22ENSmDwHvDzDwCNLtZWYnYq%%3D%%3D%%22%%2C%%22od%%22%%3A%%22CNKmCNKmCNKjCNKmCM0mCNKmBJKmCNKjCNKmCNKmCNKmCNKm%%22%%2C%%22ov%%22%%3A%%22Ctu%%3D%%22%%2C%%22ud%%22%%3A%%22ENYnCJS1CNGnCtU2DJSzBJC0CtunCtqmCtq2Dm%%3D%%3D%%22%%7D%%2C%%22ciphertype%%22%%3A5%%2C%%22version%%22%%3A%%221.2.0%%22%%2C%%22appname%%22%%3A%%22com.jingdong.app.mall%%22%%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCT-AL10 Build/HUAWEIPCT-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36",
  Accept: "*/*",
  "X-Requested-With": "com.jingdong.app.mall",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Dest": "script",
  Referer: "https://h5.m.jd.com/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7,ja-CN;q=0.6,ja;q=0.5,en-US;q=0.4"
};
const options = {
  hooks: {
    beforeRequest: [
      (options) => {
        Object.assign(options.headers, HEADERS);
        // options.body = JSON.stringify({ body: { pageNo: 1, pageSize: 20 } });
      }
    ]
  }
};

/**
 * @description: 获取过期京豆
 */
export function getJDBeanDetail() {
  // let _options = {
  //   ...options,
  //   searchParams: {
  //   }
  // };
  // return http.post(`${baseURL}`, _options);
}

/**
 * @description: 签到
 */
export function setCheckIn() {
  let _options = {
    ...options,
    searchParams: {
      functionId: "signBeanAct",
      appid: "ld",
      client: "android",
      clientVersion: "12.0.10",
      networkType: "wifi",
      osVersion: 10,
      loginType: 2,
      screen: 360 * 687,
      d_model: "PCT-AL10"
    }
  };

  return http.get(`${baseURL}`, _options);
}
