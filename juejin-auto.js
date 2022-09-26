/* 
* 今日是否已签到
*  https://api.juejin.cn/growth_api/v1/get_today_status
* GET
 */


/* 
* 签到接口
* /growth_api/v1/check_in
* POST
*/

/* 
* 查询今日免费抽奖机会
* 	/growth_api/v1/lottery_config/get
* GET
*
*/

/* 
* 抽奖
*	/growth_api/v1/lottery/draw
* GET
*/

/* 
* cookie 
*/

// 今日是否已签到接口


import got from 'got';
(function () {
    let checkTodayStatusUrl = 'https://api.juejin.cn/growth_api/v1/get_today_status'


    // 查询今日是否已签到
    const checkStatus = async () => {
        let cookie_val = ''

        // const options = {
        //     method: 'GET',
        //     cookieJar
        // }

        const HEADERS = {
            cookie: cookie_val,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67'
        }

        const data = await got('https://api.juejin.cn/growth_api/v1/get_today_status', {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, HEADERS)
                    }

                ]
            }
        }).json()
        console.log(data);

    }
    checkStatus()


    // 签到

    // 查询今日是否有免费抽奖机会


    // 抽奖

})()