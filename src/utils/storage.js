export default {
  get (key) {
    return new Promise(resolve => {
      chrome.storage.sync.get(key, result => resolve(result))
    })
  },
  set (key, value) {
    return chrome.storage.sync.set({
      [key]: value
    })
  }
}
