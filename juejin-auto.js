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
let checkTodayStatus = 'https://api.juejin.cn/growth_api/v1/get_today_status'

    (function () {

        // 查询今日是否已签到
        const checkSignInStatus = async () => {
            let options = {
                method: 'GET',
                headers: {
                },
            }
            const res = await fetch(checkTodayStatus, options)
            console.log('------------', res);
        }
        checkSignInStatus()
        // 签到

        // 查询今日是否有免费抽奖机会


        // 抽奖

    })()