

import { sendWxApi, getAccessTokenApi } from './service/wxService.js'
import { APP_ID, APP_SECRET } from './ENV.js'

/**
 * 给微信公众号推送消息
 * @description:
 */
export const sendMessage = async (message) => {
    const res = await sendWxApi(message, await getAccessToken()).json();
    console.log(res);
}

/**
 * @description: 获取access_token
 */
async function getAccessToken() {
    const { access_token } = await getAccessTokenApi(APP_ID, APP_SECRET).json()
    return access_token
}
