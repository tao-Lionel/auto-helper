import { http } from '../utils/http.js'

// server酱

export function sendMsgApi(data) {
    const _options = {
        json: data
    }
    return http.post(`https://sctapi.ftqq.com/SCT224282TM1DYkLQELr5Oq9k9dl0zhE4S.send`, _options)
}

