import reqwest from 'reqwest'

const EASTMONEY_URL = 'https://fundgz.1234567.com.cn/js'

export const getFundByCode = code =>
  reqwest({
    url: `${EASTMONEY_URL}/${code}.js?rt=${Date.now()}`,
    type: 'jsonp',
    jsonpCallbackName: 'jsonpgz'
  })
