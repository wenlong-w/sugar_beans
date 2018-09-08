import { get, post } from "./utils/network.js"
App({
  globalStoryManager: {
    currentAudio: {},
    audioList: [],
    storyList: [],
    singleStoryList: [],
    shareImage: [
      'http://td-image-1255464404.file.myqcloud.com/%E5%8D%96%E7%81%AB%E6%9F%B4%E7%9A%84%E5%B0%8F%E5%A5%B3%E5%AD%A9.jpg',
      'http://td-image-1255464404.file.myqcloud.com/%E7%99%BD%E9%9B%AA%E5%85%AC%E4%B8%BB.jpg',
      'http://td-image-1255464404.file.myqcloud.com/%E5%86%9C%E5%A4%AB%E5%92%8C%E8%9B%87.jpg',
      'http://td-image-1255464404.file.myqcloud.com/%E5%B0%8F%E9%A9%AC%E8%BF%87%E6%B2%B3.jpg'
      
    ]
  },
  userInfo: null,
  globalBgAudioManager: wx.getBackgroundAudioManager(),

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting   res:', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log('getUserInfo  res:', res)
              // 可以将 res 发送给后台解码出 unionId
              this.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            error: err => {
              console.log('getUserInfo  error:', error)
            }
          })
        }
      },
      error: err => {
        console.log('getSetting err:', err)
      }
    })

  },
  onShow: function (options) {
    // console.log('app onShow')
  }
})