

import { getTodayStatus, setCheckIn, getLottery, setLotteryDraw, getUser, getCounts, getLotteryHistoryApi, getLuckyApi } from './service/juejinService.js'
import { sendMessage } from './sendMessage.js'
import { USER_ID, TEMPLATE_ID } from './ENV.js'

(function () {
  const message = {
    userName: '', // 用户名
    msg: '', // 消息
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
    lotteryName: '', // 奖品名称
  }

  // 登陆
  async function login() {
    const { err_no, err_msg, data } = await getUser().json()
    if (err_no === 0) {
      message.userName = data.user_name
      checkStatus();
    } else {
      message.msg = "登陆失败，检查cookie是否过期"
      formatMessage()
    }
  }

  // 查询今日是否已签到
  async function checkStatus() {
    const { err_no, err_msg, data } = await getTodayStatus().json();
    console.log("是否签到", { err_no, err_msg, data });
    message.checkedIn = data
    // 如果没签到去签到
    if (!data) {
      signIn();
    }
  };

  // 签到
  async function signIn() {
    const { err_no, err_msg, data } = await setCheckIn().json();
    message.incrPoint = data.incr_point
    message.sumPoint = data.sum_point
    getCount();
    checkFree();

  };

  // 签到天数
  async function getCount() {
    const { data } = await getCounts()
    message.contCount = data.cont_count
    message.sumCount = data.sum_count
  }

  // 查询今日是否有免费抽奖机会
  async function checkFree() {
    const { err_no, err_msg, data } = await getLottery().json();
    message.freeCount = data.free_count
    console.log("免费抽奖机会", data.free_count);
    if (data.free_count >= 1) {
      draw();
    }
  };

  // 抽奖
  async function draw() {
    const { err_no, err_msg, data } = await setLotteryDraw().json();
    message.lotteryName = data.lottery_name
    console.log('抽中的奖品', data.lottery_name);
    getLotteryHistory()
  };

  // 获取围观大奖记录
  async function getLotteryHistory() {
    const { err_no, err_msg, data } = await getLotteryHistoryApi({ page_no: 1, page_size: 5 }).json()
    console.log(data.lotteries[0].history_id);
    getLucky(data.lotteries[0].history_id)
  }

  // 沾喜气
  async function getLucky(history_id) {
    const { data } = await getLuckyApi(history_id).json()
    console.log(data);
    message.dippedLucky = data.has_dip
    message.dipValue = data.dip_value
    message.luckyValue = data.total_value
    formatMessage()
  }

  // 格式化要发送的消息
  function formatMessage() {
    let _message = {}
    for (let key in message) {
      _message[key] = {
        value: message[key]
      }
    }
    // 你好：{{ userName.DATA }}
    // {{ msg.DATA }}
    // 是否已签到：{{ checkedIn.DATA }}
    // 签到获得矿石数：{{ incrPoint.DATA }}
    // 当前总矿石数：{{ sumPoint.DATA }}
    // 连续签到天数：{{ contCount.DATA }}
    // 累计签到天数：{{ sumCount.DATA }}
    // 是否沾喜气：{{ dippedLucky.DATA }}
    // 幸运值：{{ dipValue.DATA }}
    // 总幸运值：{{ luckyValue.DATA }}
    // 免费抽奖次数：{{ freeCount.DATA }}
    // 是否免费抽奖：{{ freeDraw.DATA }}
    // 奖品名称：{{ lotteryName.DATA }}

    const data = {
      touser: USER_ID,
      template_id: TEMPLATE_ID,
      url: '',
      topcolor: '#FF0000',
      data: _message,
    }

    // 发送消息
    sendMessage(data)
  }

  login()
  // formatMessage()



})();
