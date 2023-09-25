import {
    getSurplusStockNum, getList
} from "./service/bmyService.js";
import { sendMsgApi } from './service/server.js'

function sleep(wait = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, wait)
    })
}


let i = 0
// 登陆
async function getSurplus() {

    const { code, data, error } = await getSurplusStockNum('2023-10-05').json();
    const { staggeredReservationDailyStockInfos } = data
    let surplusStockNum = 0
    let reservationBeginTime, reservationEndTime
    console.log(i++)
    for (const item of staggeredReservationDailyStockInfos) {
        if (item.surplusStockNum > 0) {
            surplusStockNum = item.surplusStockNum
            reservationBeginTime = item.reservationBeginTime
            reservationEndTime = item.reservationEndTime
            break
        }
    }

    if (surplusStockNum === 0) {
        await sleep(300000)
        getSurplus()
    } else {
        console.log('发送消息')
        await sendMsgApi({
            title: `有票了 ${surplusStockNum}张`,
        })
    }
}

getSurplus()