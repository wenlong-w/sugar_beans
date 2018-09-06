const app = getApp()
const util = require('../../../utils/util.js')
import { doRequest } from '../../../utils/wxRequest.js'
const globalStoryManager = app.globalStoryManager;
let storyList = []; //故事列表
let collectList = [];//已经收藏的故事列表

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    collectList = [];
    storyList = globalStoryManager.storyList;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    doRequest('/ChildrenStory/TDUserCollectServlet.do', { methodName: 'findCollect' }).then(
      res => {
        console.log('findCollect ', res);
        if (res.success) {
          
          let collects = res.result;
          let idsArr = collects.split(',');
          // console.log('idsArr ', idsArr);
          let currentCollectIds = [];
          if (collects != '' && idsArr.length > 0) {
            currentCollectIds = idsArr;
          }
          
          for (let m = 0; m < currentCollectIds.length; m++) {
            for(let n=0; n<storyList.length; n++){
              if (currentCollectIds[m] == storyList[n].id){
                collectList.push(storyList[n]);
              }
            }
          }
          console.log('ddd', collectList);
          this.setData({ storyList: collectList });
        }
      }
    )
  },
  toPlayAudio: function (event) {
    let id = event.currentTarget.id;
    let storyName = '';
    let storyList = globalStoryManager.storyList;
    let story;
    for (let i = 0; i < storyList.length; i++) {
      story = storyList[i];
      if (story.id == id) {
        storyName = story.storyName;
        break;
      }
    }
    console.log('story--', story);
    if (story.count == '0') {
      globalStoryManager.currentAudio = story;
      util.playAudio();
    } else {
      wx.navigateTo({
        url: '../../storyInfo/storyInfo?nameStr=' + story.nameStr + '&storyName=' + storyName
      })
    }
  },
  goBack: function () {
    // console.log('back');
    wx.switchTab({
      url: '../mine'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })
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