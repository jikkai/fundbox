export default {
  get (key) {
    return new Promise(resolve => {
      chrome.storage.sync.get(key, result => resolve(result))
    })
    // return [
    //   {
    //     "key": "160631",
    //     "code": "160631",
    //     "name": "鹏华银行分级",
    //     "cost": "0.8980",
    //     "share": "1803.93",
    //     "price": "0.8210",
    //     "appraisal": ""
    //   },
    //   {
    //     "key": "161725",
    //     "code": "161725",
    //     "name": "招商中证白酒指数分级",
    //     "cost": "1.217",
    //     "share": "82.17",
    //     "price": "1.2158",
    //     "appraisal": ""
    //   }
    // ]
  },
  set (key, value) {
    return chrome.storage.sync.set({
      [key]: value
    })
  }
}
