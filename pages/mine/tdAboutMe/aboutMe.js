const util = require('../../../utils/util.js');
const app = getApp()
let globalStoryManager = app.globalStoryManager; //全局故事列表，包含：故事列表、当前播放的故事
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '关于作者'
    })
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  goPraise: function () {
    util.doPraise();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const randomImage = Math.floor((Math.random() * (globalStoryManager.shareImage.length)));
    return {
      title: '快乐儿童故事',
      desc: '重温经典，带孩子走进一个美丽的故事世界。',
      path: '/pages/index/index',
      imageUrl: globalStoryManager.shareImage[randomImage],
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})