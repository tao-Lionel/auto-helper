import { getJDBeanDetail, setCheckIn } from "./service/jdService.js";
import { sendMessage } from "./sendMessage.js";
import { USER_ID, TEMPLATE_ID } from "./ENV.js";

(function () {
  const message = {
    userName: "", // 用户名
    msg: "", // 消息
    checkedIn: false, // 是否已签到
    incrPoint: 0, // 签到获得矿石数
    sumPoint: 0, // 总矿石数
    contCount: 0, // 连续签到天数
    sumCount: 0, // 累计签到天数
    dippedLucky: false, // 是否沾喜气
    dipValue: 0, // 幸运值
    luckyValue: 0, // 总幸运值
    freeCount: 0, // 免费抽奖次数
    freeDraw: false, // 是否免费抽奖
    lotteryName: "" // 奖品名称
  };

  // 登陆
  async function login() {
    const res = await setCheckIn().json();
    console.log(res);
  }

  login();
})();
