const MOBILE_REG = /^1[2-9][0-9]{9}$/;
const EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/;
const MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
const NAME_REG = /^([\u4e00-\u9fa5][\u4e00-\u9fa5·]+|[a-zA-Z·]+){1,10}$/;
// /^([\u4e00-\u9fa5][\u4e00-\u9fa5]+|[a-zA-Z]+|[·]+){1,10}$/
// const NAME_REG = /^[^~!@#$%^*+|}{"?/'\\=`]*$/;
// const NAME_REG = /[\u4e00-\u9fa5A-Za-z·]{1,10}/;

const BIRTH_REG = /^[A-Z]{1}\d{9}$/;
const CH_NAME_REG = /[\u4e00-\u9fa5][\u4e00-\u9fa5]+/;
const PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/;
const HKMACAO_REG = /^[A-Za-z0-9()]{8,16}$/;  // 港澳通行证
const TAIWAN_REG = /^[A-Z0-9()]{9,15}$/;  // 台湾通行证
const PASSPORT_REG = /^[a-zA-Z0-9/()]{5,20}$/;// 护照
const GAINLAND_REG = /^[A-Za-z0-9/()]{8,15}$/;   // 港澳居民来往内地通行证
const TAIWANINLAND_REG = /^[a-zA-Z0-9/()]{5,24}$/;   // 台湾居民来往内地通行证
const UA = window.navigator.userAgent.toLowerCase();

function isRule(regText: any, value: any) {
  if (!value || value.length === 0) return true;

  const reg = new RegExp(regText);
  if (!reg.test(value)) {
    return false;
  }
  return true;
}

const validate = {
  isIos: () => {
    const { userAgent } = navigator;
    const IsiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return IsiOS;
  },
  isFromWeixin: () => {
    return UA.match(/MicroMessenger/i);
  },

  isMobile: (mobile: any) => {
    return isRule(MOBILE_REG, mobile);
  },

  isEmail: (email: any) => {
    return isRule(EMAIL_REG, email);
  },

  isMoney: (money: any) => {
    return isRule(MONEY_REG, money);
  },
  isChName: (name: any) => isRule(CH_NAME_REG, name),
  isUsername: (name: any) => {
    return isRule(NAME_REG, name);
  },
  isNotEmpty: (data: any) => {
    return data && (data.length > 0);
  },
  isEmpty: (data: any) => {
    return !(data && (data.length > 0));
  },
  isPwd: (pwd: any) => {
    return isRule(PWD_REG, pwd);
  },
  isSame: (data1: any, data2: any) => {
    return data1 === data2;
  },
  isHKMacao: (val: any) => {
    return isRule(HKMACAO_REG, val);
  },
  isTaiwan: (val: any) => {
    return isRule(TAIWAN_REG, val);
  },
  isPassport: (val: any) => {
    return isRule(PASSPORT_REG, val);
  },
  isTaiwanInland: (val: any) => {
    return isRule(TAIWANINLAND_REG, val);
  },
  isGaInland: (val: any) => {
    return isRule(GAINLAND_REG, val);
  },
  isBirth: (val: any) => {
    return isRule(BIRTH_REG, val);
  },
  isIdCard: (card: any) => {
    if (!card) return false;
    // let num = card.toUpperCase();
    let num = card;
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    let re;
    let birthday; let sex;
    const len = num.length;
    if (len === 15) {
      // 获取出生日期
      birthday = `19${card.substring(6, 8)}-${card.substring(8, 10)}-${card.substring(10, 12)}`;
      // 获取性别
      sex = parseInt(card.substr(14, 1), 10) % 2 === 1 ? 'M' : 'F';

      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      const arrSplit = num.match(re);

      // 检查生日日期是否正确
      const dtmBirth = new Date(`19${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
      const bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]));
      if (!bGoodDay) {
        return false;
      }
      // 将15位身份证转成18位
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let nTemp = 0;
      let i;

      num = `${num.substr(0, 6)}19${num.substr(6, num.length - 6)}`;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      num += arrCh[nTemp % 11];
    } else if (len === 18) {
      // 获取出生日期
      birthday = `${card.substring(6, 10)}-${card.substring(10, 12)}-${card.substring(12, 14)}`;
      // 获取性别
      sex = parseInt(card.substr(16, 1), 10) % 2 === 1 ? 'M' : 'F';

      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      const arrSplit = num.match(re);

      // 检查生日日期是否正确
      const dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
      dtmBirth.setDate(arrSplit[4]);
      const bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]));
      if (!bGoodDay) {
        return false;
      }
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let nTemp = 0;
      let i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      const valnum = arrCh[nTemp % 11];
      if (valnum !== num.substr(17, 1)) {
        return false;
      }
    }
    return {
      birthday,
      sex,
    };
  },

};


export default validate;
