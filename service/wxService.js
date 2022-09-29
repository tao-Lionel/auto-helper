import { http } from '../utils/http.js'

/**
 * @description: 给测试微信公众号发消息 测试版
 */
export function sendWxApi(data, access_token) {
  const _options = {
    searchParams: {
      access_token,
    },
    body: JSON.stringify(data)
  }
  return http.post(`https://api.weixin.qq.com/cgi-bin/message/template/send`, _options)
}

export function getAccessTokenApi(appId, appSecret) {
  return http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)
}