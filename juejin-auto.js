

import { getTodayStatus, setCheckIn, getLottery, setLotteryDraw, getUser, getCounts } from './service/juejinService.js'

const message = {
  userName: '', // 用户名
  msg: '', // 消息
  checkedIn: false, // 是否已签到
  incrPoint: 0, // 签到获得矿石数
  sumPoint: 0, // 总矿石数
  contCount: 0, // 连续签到天数
  sumCount: 0, // 累计签到天数
  // dippedLucky: false, // 是否沾喜气
  dipValue: 0, // 幸运值
  luckyValue: 0, // 总幸运值
  freeCount: 0, // 免费抽奖次数
  freeDraw: false, // 是否免费抽奖
  lotteryName: '', // 奖品名称
  // collectedBug: false, // 是否收集 Bug
  // collectBugCount: 0, // 收集 Bug 的数量
}

  (function () {

    // 登陆
    const login = async () => {
      const { err_no, err_msg, data } = await getUser().json()
      if (err_no === 0) {
        message.userName = data.user_name
        checkStatus();
      } else {
        message.msg = "登陆失败，检查cookie是否过期"
      }
    }

    // 查询今日是否已签到
    const checkStatus = async () => {
      const { err_no, err_msg, data } = await getTodayStatus().json();
      console.log("是否签到", { err_no, err_msg, data });
      message.checkedIn = data
      // 如果没签到去签到
      if (!data && err_no === 0) {
        signIn();
      }
    };

    // 签到
    const signIn = async () => {
      const { err_no, err_msg, data } = await setCheckIn().json();
      message.incrPoint = data.incr_point
      message.sumPoint = data.sum_point
      if (err_no === 0) {
        getCount();
        checkFree();
      }
    };

    // 签到天数
    const getCount = async () => {
      const { data } = await getCounts()
      message.contCount = counts.cont_count
      message.sumCount = counts.sum_count
    }

    // 查询今日是否有免费抽奖机会
    const checkFree = async () => {
      const { err_no, err_msg, data } = await getLottery().json();
      console.log("免费抽奖机会", data.free_count); // 签到得的矿石
      if (data.free_count >= 1 && err_no === 0) {
        draw();
      }
    };

    // 抽奖
    const draw = async () => {
      const { err_no, err_msg, data } = await setLotteryDraw().json();
      if (err_no === 0) {
        console.log('抽中的奖品', data.lottery_name);
      }
    };

    const message = (data) => {
      return {
        'user': {
          'value': data.userName
        },
        'mes': {
          'value': data.mes
        }
      }
    }

    login()

  })();
