import { http } from '../utils/http.js'

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8391 Flue',
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '*/*',
    Host: 'bmy.albatrip.cn',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    // 'Content-Length': 80,
    Referer: 'http://bmy.albatrip.cn/mreport/index.html'
};
const options = {
    hooks: {
        beforeRequest: [
            (options) => {
                Object.assign(options.headers, HEADERS);
            }
        ]
    }
};

export function getSurplusStockNum(date) {
    const _options = {
        // ...options,
        json: {
            date,
            orgId: "382e8c2221654eaa965cafaaabe3cd88"
        }
    }
    return http.post(`http://bmy.albatrip.cn/api/query/staggered-reservation-daily-info`, _options)
}


export function getList() {
    const _options = {
        // ...options,
        // searchParams: {
        //     reservationDate: "2023-10-05",
        //     orgId: "382e8c2221654eaa965cafaaabe3cd88"
        // },
        json: {
            orgId: "382e8c2221654eaa965cafaaabe3cd88",
            reservationDate: "2023-10-05"
        }
    }
    return http.post(`
    https://bmy.albatrip.cn/api/integration/wechatmini/staggered-reservation-daily/list`, _options)
}