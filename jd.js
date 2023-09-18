import { getJDBeanDetail, setCheckIn } from "./service/jdService.js";
import { sendMessage } from "./sendMessage.js";
import { USER_ID, TEMPLATE_ID_JD } from "./ENV.js";

(function () {
  const message = {
    // userName: "", // 用户名
    title: "", // 消息
    beanCount: 0, // 签到获得京豆数
    totalUserBean: 0, // 总京豆数
    continuousDays: 0, // 连续签到天数
    error: ""
  };

  // 签到
  async function signBean() {
    const { data, code, errorMessage } = await setCheckIn().json();
    console.log(data);
    console.log("code", code);
    console.log("errorMessage", errorMessage);
    if (code == 0) {
      const { dailyAward, totalUserBean, continuousDays, status, continuityAward } = data;
      let title = "";
      let beanCount = "";
      if (dailyAward) {
        title = dailyAward.title;
        beanCount = dailyAward.beanAward?.beanCount;
      } else if (continuityAward) {
        title = continuityAward.title;
        beanCount = continuityAward.beanAward?.beanCount;
      }
      message.title = title;
      message.beanCount = beanCount;
      message.totalUserBean = totalUserBean;
      message.continuousDays = continuousDays;
    } else {
      message.error = data;
    }

    formatMessage();
  }

  // 格式化要发送的消息
  function formatMessage() {
    let _message = {};
    // 字体颜色
    let colorObj = {
      beanCount: "#E37815",
      totalUserBean: "#E37815",
      continuousDays: "#E37815"
    };

    for (let key in message) {
      _message[key] = {
        value: message[key],
        color: colorObj[key] ? colorObj[key] : ""
      };
    }

    console.log("_message", _message);

    // 整理推送的消息
    const data = {
      touser: USER_ID,
      template_id: TEMPLATE_ID_JD,
      url: "",
      topcolor: "#2C68FF",
      data: _message
    };

    sendMessage(data);
  }

  signBean();
})();
