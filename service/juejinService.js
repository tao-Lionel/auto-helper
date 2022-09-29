import { http } from '../utils/http.js'
import { JUEJIN_COOKIE } from './ENV.js'

const baseURL = 'https://api.juejin.cn'
const HEADERS = {
  cookie: JUEJIN_COOKIE,
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
}
const options = {
  hooks: {
    beforeRequest: [
      options => {
        Object.assign(options.headers, HEADERS);
      },
    ],
  },
};

/**
 * @description: 获取用户信息
 */
export function getUser() {
  return http.get(`${baseURL}/user_api/v1/user/get`, options)
}

/**
 * @description: 获取今日签到状态
 */
export function getTodayStatus() {
  return http.get(`${baseURL}/growth_api/v1/get_today_status`, options)
}

/**
 * @description: 签到
 */
export function setCheckIn() {
  return http.post(`${baseURL}/growth_api/v1/check_in`, options)
}

/**
 * @description: 获取免费抽奖次数
 */
export function getLottery() {
  return http.get(`${baseURL}/growth_api/v1/lottery_config/get`, options)
}

/**
 * @description: 抽奖
 */
export function setLotteryDraw() {
  return http.post(`${baseURL}/growth_api/v1/lottery/draw`, options)
}

/**
 * @description: 签到天数
 */
export function getCounts() {
  return http.get(`${baseURL}/growth_api/v1/get_counts`, options)
}


/**
 * @desc 围观大奖记录
 * @param page_no
 * @param page_size
 */
export function getLotteryHistoryApi({ page_no = 1, page_size = 5 }) {
  const _options = {
    ...options,
    searchParams: {
      page_no,
      page_size,
    }
  }
  return http.post(`${baseURL}/growth_api/v1/lottery_history/global_big`, _options)
}

/**
 * @description: 沾喜气
 * @param {*} history_id
 */
export function getLuckyApi(history_id) {
  const _options = {
    ...options,
    searchParams: {
      lottery_history_id: history_id
    }
  }
  return http.post(`${baseURL}/growth_api/v1/lottery_lucky/dip_lucky`, _options)
}