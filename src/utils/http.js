import reqwest from 'reqwest'

const EASTMONEY_URL = 'https://fundgz.1234567.com.cn/js'
const NETEASE_URL = 'https://8.163.com/wyfund'

export const getFundByCode = code =>
  reqwest({
    url: `${EASTMONEY_URL}/${code}.js?rt=${Date.now()}`,
    type: 'jsonp',
    jsonpCallbackName: 'jsonpgz'
  })

export const getFundDailyGainByCode = code =>
  reqwest({
    url: `${NETEASE_URL}/getFundDailyGain.htm?fundCode=${code}&page=1`,
    type: 'json'
  })
  .then(resp => resp.attach.gainDtoPage.result)
