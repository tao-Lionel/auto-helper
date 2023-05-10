import {
  getTodayStatus,
  setCheckIn,
  getLottery,
  setLotteryDraw,
  getUser,
  getCounts,
  getLotteryHistoryApi,
  getLuckyApi,
  getPointApi
} from "./service/juejinService.js";
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
    const { err_no, err_msg, data } = await getUser().json();
    if (err_no === 0) {
      message.userName = data.user_name;
      checkStatus();
    } else {
      message.userName = "cookie 过期";
      formatMessage();
    }
  }

  // 查询今日是否已签到
  async function checkStatus() {
    const { err_no, err_msg, data } = await getTodayStatus().json();
    console.log("是否签到", { err_no, err_msg, data });
    message.checkedIn = data;
    // 如果没签到去签到
    if (!data) {
      signIn();
    } else {
      await getPoint();
      await getCount();
      checkFree();
    }
  }

  // 签到
  async function signIn() {
    const { err_no, err_msg, data } = await setCheckIn().json();
    message.incrPoint = data.incr_point;
    message.sumPoint = data.sum_point;
    await getCount();
    checkFree();
  }

  // 查询今日是否有免费抽奖机会
  async function checkFree() {
    const { err_no, err_msg, data } = await getLottery().json();
    message.freeCount = data.free_count;
    console.log("免费抽奖机会", data.free_count);
    if (data.free_count >= 1) {
      message.freeDraw = true;
      draw();
    } else {
      getLotteryHistory();
    }
  }

  // 抽奖
  async function draw() {
    const { err_no, err_msg, data } = await setLotteryDraw().json();
    message.lotteryName = data.lottery_name;
    console.log("抽中的奖品", data.lottery_name);
    getLotteryHistory();
  }

  // 签到天数
  async function getCount() {
    const { data } = await getCounts().json();
    message.contCount = data.cont_count;
    message.sumCount = data.sum_count;
  }

  // 获取矿石数
  async function getPoint() {
    const { data } = await getPointApi().json();
    message.sumPoint = data;
  }

  // 获取围观大奖记录
  async function getLotteryHistory() {
    const { err_no, err_msg, data } = await getLotteryHistoryApi({ page_no: 1, page_size: 5 }).json();
    console.log(data.lotteries[0].history_id);
    getLucky(data.lotteries[0].history_id);
  }

  // 沾喜气
  async function getLucky(history_id) {
    const { data } = await getLuckyApi(history_id).json();
    console.log(data);
    message.dippedLucky = data.has_dip;
    message.dipValue = data.dip_value;
    message.luckyValue = data.total_value;
    formatMessage();
  }

  // 格式化要发送的消息
  function formatMessage() {
    let _message = {};
    let checkMsg = message.checkedIn ? `今日已签到` : `签到 +${message.incrPoint} 矿石`;
    let luckyMsg = message.dippedLucky ? "今日已经沾过喜气" : `沾喜气 +${message.dipValue} 幸运值`;
    let lotteryMsg = message.freeDraw ? `恭喜抽中 ${message.lotteryName}` : "今日已免费抽奖";
    // 单模板 无文字颜色的方案
    // _message.msg = {
    //   value: `Hello ${message.userName}
    //   ${checkMsg}
    //   当前矿石数：${message.sumPoint}
    //   连续签到天数：${message.contCount}
    //   累计签到天数：${message.sumCount}
    //   ${luckyMsg}
    //   当前幸运值：${message.luckyValue}
    //   免费抽奖次数：${message.freeCount}
    //   ${lotteryMsg}`,
    //   color: ""
    // }
    message.checkMsg = checkMsg;
    message.luckyMsg = luckyMsg;
    message.lotteryMsg = lotteryMsg;
    // 字体颜色
    let colorObj = {
      checkMsg: "#E37815",
      luckyMsg: "#E37815",
      lotteryMsg: "#E37815",
      luckyValue: "#2C68FF",
      sumPoint: "#2C68FF"
    };

    for (let key in message) {
      _message[key] = {
        value: message[key],
        color: colorObj[key] ? colorObj[key] : ""
      };
    }

    //   你好：{{ userName.DATA }}
    //   {{ checkMsg.DATA }}
    //   当前矿石数：{{ sumPoint.DATA }}
    //   连续签到天数：{{ contCount.DATA }} 天
    //   累计签到天数：{{ sumCount.DATA }} 天
    //   {{ luckyMsg.DATA }}
    //   当前幸运值：{{ luckyValue.DATA }}
    //   免费抽奖次数：{{ freeCount.DATA }}
    //  {{ lotteryMsg.DATA }}

    console.log("_message", _message);

    // 整理推送的消息
    const data = {
      touser: USER_ID,
      template_id: TEMPLATE_ID,
      url: "",
      topcolor: "#2C68FF",
      data: _message
    };

    // 发送消息
    sendMessage(data);
  }

  login();
  // formatMessage()
})();
