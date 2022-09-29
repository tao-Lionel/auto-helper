import { http } from '../utils/http.js'
// import { JUEJIN_COOKIE } from './ENV.js'

const baseURL = 'https://api.juejin.cn'
const HEADERS = {
  cookie: '_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227077739706088621606%2522%252C%2522web_id%2522%253A%25227077739706088621606%2522%252C%2522timestamp%2522%253A1664439477090%257D; MONITOR_WEB_ID=1d1acddf-49b1-49d8-be4b-e0dc24945652; _ga=GA1.2.1068361274.1664439684; _gid=GA1.2.1566326486.1664439684; passport_csrf_token=df68c2ae4a17f1d6afeaf932ee6d7cfb; passport_csrf_token_default=df68c2ae4a17f1d6afeaf932ee6d7cfb; _tea_utm_cache_2018=undefined; n_mh=Q7CRYBs9iZc8FopTp17xPyWZs3aVnUJNrmgDODTzImk; passport_auth_status=9e4e0d9a6838b5396ba20175c54f3935%2C80ae61feba908a9e8443f3aaeb863abe; passport_auth_status_ss=9e4e0d9a6838b5396ba20175c54f3935%2C80ae61feba908a9e8443f3aaeb863abe; sid_guard=bb4ded9d4a1622c164f59f534ca4d03a%7C1664440232%7C31535999%7CFri%2C+29-Sep-2023+08%3A30%3A31+GMT; uid_tt=2c29f6bfc2dfae9287e1a74dbbb83bc2; uid_tt_ss=2c29f6bfc2dfae9287e1a74dbbb83bc2; sid_tt=bb4ded9d4a1622c164f59f534ca4d03a; sessionid=bb4ded9d4a1622c164f59f534ca4d03a; sessionid_ss=bb4ded9d4a1622c164f59f534ca4d03a; sid_ucp_v1=1.0.0-KGJjMGU0ZDE5YmVjY2ZlZmUzNGI0ODFiYTA5NWEzYWUzNmZlNTIxZDkKFgjtjNCoio0EEKiv1ZkGGLAUOAJA8QcaAmxmIiBiYjRkZWQ5ZDRhMTYyMmMxNjRmNTlmNTM0Y2E0ZDAzYQ; ssid_ucp_v1=1.0.0-KGJjMGU0ZDE5YmVjY2ZlZmUzNGI0ODFiYTA5NWEzYWUzNmZlNTIxZDkKFgjtjNCoio0EEKiv1ZkGGLAUOAJA8QcaAmxmIiBiYjRkZWQ5ZDRhMTYyMmMxNjRmNTlmNTM0Y2E0ZDAzYQ',
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
export function getLotteryHistory({ page_no = 1, page_size = 5 }) {
  return this.http.post(`${baseURL}/growth_api/v1/lottery_history/global_big`, { page_no, page_size })
}