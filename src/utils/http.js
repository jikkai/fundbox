import reqwest from 'reqwest'

const BASE_URL = 'https://fundgz.1234567.com.cn/js'

export const getFundByCode = code =>
  new Promise(resolve => {
    reqwest({
      url: `${BASE_URL}/${code}.js?rt=${Date.now()}`,
      type: 'jsonp',
      jsonpCallbackName: 'jsonpgz',
      success (resp) {
        resolve(resp)
      }
    })
  })
