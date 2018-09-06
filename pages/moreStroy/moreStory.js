const util = require('../../utils/util.js');

const app = getApp();
const globalStoryManager = app.globalStoryManager;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioList: []
  },

  /**
   * 跳转到故事详情介绍页
   */
  toPlayAudio: function (event) {
    let id = event.currentTarget.id;
    let storyList = globalStoryManager.storyList;
    for (let story of storyList) {
      if(story.id==id){
          if(story.count==='0'){
            globalStoryManager.currentAudio = story;
            util.playAudio();
          } else {
            wx.navigateTo({
              url: '../storyInfo/storyInfo?nameStr=' + story.nameStr + '&storyName=' + story.storyName
            })
          }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let storyList = globalStoryManager.storyList;
    let albumList = [];
    if (options.type === 'album') {
      for (var story of storyList) {
        if (story.count != '0') {
          albumList.push(story);
        }
      }
      this.setData({ audioList: albumList });
    } else {
      this.setData({ audioList: storyList });
    }
  },

  goBack: function () {
    // console.log('back');
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    wx.setNavigationBarTitle({
      title: '更多故事'
    });
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
  
  }
})