/*
 * 今日是否已签到
 *  https://api.juejin.cn/growth_api/v1/get_today_status
 * GET
 */

/*
 * 签到接口
 * /growth_api/v1/check_in
 * POST
 */

/*
 * 查询今日免费抽奖机会
 * 	/growth_api/v1/lottery_config/get
 * GET
 *
 */

/*
 * 抽奖
 *	/growth_api/v1/lottery/draw
 * GET
 */

import got from "got";
import { JUEJIN_COOKIE } from './ENV.js'
(function () {
  let checkTodayStatusApi = "https://api.juejin.cn/growth_api/v1/get_today_status";
  let signInApi = "https://api.juejin.cn/growth_api/v1/check_in";
  let checkFreeApi = "https://api.juejin.cn/growth_api/v1/lottery_config/get";
  let drawApi = "https://api.juejin.cn/growth_api/v1/lottery/draw";
  let cookie_val = JUEJIN_COOKIE
  console.log(cookie_val);
  const HEADERS = {
    cookie: cookie_val,
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
  };
  const options = {
    hooks: {
      beforeRequest: [
        options => {
          Object.assign(options.headers, HEADERS);
        },
      ],
    },
  };

  // 查询今日是否已签到
  const checkStatus = async () => {
    const { err_no, err_msg, data } = await got(checkTodayStatusApi, options).json();
    console.log("是否签到", data);
    // 如果没签到去签到
    if (!data && err_msg === "success") {
      signIn();
    }
  };

  // 签到
  const signIn = async () => {
    const { err_no, err_msg, data } = await got.post(signInApi, options).json();
    console.log("签到得的矿石", data.incr_point); // 签到得的矿石
    console.log("一共有多少矿石", data.sum_point); // 一共有多少矿石
    if (err_msg === "success") {
      checkFree();
    }
  };

  // 查询今日是否有免费抽奖机会
  const checkFree = async () => {
    const { err_no, err_msg, data } = await got(checkFreeApi, options).json();
    console.log("免费抽奖机会", data.free_count); // 签到得的矿石
    if (data.free_count >= 1 && err_msg === "success") {
      draw();
    }
  };

  // 抽奖
  const draw = async () => {
    const { err_no, err_msg, data } = await got(drawApi, options).json();
    if (err_msg === "success") {
      console.log("抽奖成功", data);
      console.log('抽中的奖品', data.lottery_name);
    }
  };

  checkStatus();
})();
