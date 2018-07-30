import { get, post } from "./utils/network.js"
App({
  globalStoryManager: {
    chargeStatus: 'no',
    currentAudio: {},
    audioList: [],
    storyList: []
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
        // console.log('getSetting   res:', res)
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

    this.getChargeStatus();
  },
  /**
   * 读取收费状态
   */
  getChargeStatus: function (callFun) {
    post('/sugar_beans/CommonServlet.do', { methodName: 'findChargeStatus', type: '' }).then(
      reqRes => {
        let data = reqRes.data
        if (data && data.result) {
          let value = data.value;
          let msg = value.msg;
          this.globalStoryManager.chargeStatus = msg.msgVal;
        }
      },
      reqErr => {
        console.log('StoryServlet reqErr', reqErr);
      }
    );
  },
  onShow: function (options) {
    // console.log('app onShow')
  }
})