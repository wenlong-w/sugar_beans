const util = require('../../utils/util.js');
import { get, post } from "../../utils/network.js"
import { doRequest } from "../../utils/wxRequest.js"

//获取应用实例
const app = getApp();
const globalStoryManager = app.globalStoryManager;

Page({
  data: {
    imgUrls: [
      '../image/index/listenToMe.jpg',
      // '../image/doPraise.jpg',
      '../image/index/diary.jpg'
      // '../image/listenToMe.jpg',
      // 'http://image-1255464404.file.myqcloud.com/%E7%99%BD%E9%9B%AA%E5%85%AC%E4%B8%BB.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    storyList: [

    ]
  },
  onShow: function () {
    console.log('index onshow');
    wx.setNavigationBarTitle({
      title: '糖豆妈妈睡前故事'
    });
    globalStoryManager.storyList = [];
    let self = this;
    this.getStoryList(function (storyList) {
      // console.log(storyList);
      self.setData({
        storyList: storyList
      });
    });
  },
  onLoad: function () {
    console.log('index onLoad');
  },
  
  /**
   * 获取storyList
   * 先从缓存获取storyList，缓存有并且不是今天set的，查后台；缓存无，查后台；否则直接用缓存数据
   */
  getStoryList: function (callFun) {
    let nowDate = util.getDate();
    let cacheDate; //缓存某天的日期 例如：2018-01-16
    let storyList = [];
    try {
      cacheDate = wx.getStorageSync('now_date');
      if (cacheDate) {
        // console.log("cacheDate:",cacheDate);
      }
    } catch (e) {

    }
    try {
      storyList = wx.getStorageSync('story_list');
      if (storyList && storyList != null && storyList != 'null'
        && storyList != 'undefined' && storyList != undefined
        && storyList != '') {
        storyList = storyList;
      } else {
        storyList = [];
      }
    } catch (e) {
      console.log('storyList catch:', e);
      storyList = [];
    }
    // cacheDate = 1;
    if (cacheDate == nowDate && storyList.length > 0) {
      // console.log('storyList直接用缓存的');
      for (let m = 0; m < storyList.length; m++) {
        globalStoryManager.storyList.push(storyList[m]);
      }
      callFun(storyList);
    } else {
      console.log('storyList 后台');
      post('/sugar_beans/StoryServlet.do', { methodName: 'findStoryList', type: '' }).then(
        reqRes => {
          console.log('StoryServlet reqRes', reqRes)
          if(reqRes.data){
            if(reqRes.data.result){
              let value = reqRes.data.value;
              let storyList = value.storyList;
              if (storyList && storyList.length > 0) {
                for (var i = 0; i < storyList.length; i++) {
                  storyList[i].mode = "aspectFit";
                  storyList[i].dt = util.stampFormatTime(storyList[i].dt.time);
                  globalStoryManager.storyList.push(storyList[i]);
                }
                wx.setStorageSync('story_list', storyList);
                wx.setStorageSync('now_date', nowDate);
                callFun(storyList);
              } else {
                callFun([]);
              }
            }
          }
        },
        reqErr => {
          console.log('StoryServlet reqErr', reqErr);
        }
      );

      /**
       * 
      doRequest('/suger_beans/StoryServlet.do', { methodName: 'findStoryList', type: '' }).then(
        res => {
          console.log('storyList         res:', res);
          if (res.success) {
            let storyList = res.result.storyList;
            if (storyList && storyList.length > 0) {
              for (var i = 0; i < storyList.length; i++) {
                storyList[i].mode = "aspectFit";
                storyList[i].dt = util.stampFormatTime(storyList[i].dt.time);
                globalStoryManager.storyList.push(storyList[i]);
              }
              wx.setStorageSync('story_list', storyList);
              wx.setStorageSync('now_date', nowDate);
              callFun(storyList);
            } else {
              callFun([]);
            }
          } else {
            callFun([]);
          }
        }
      );
      */
    }
  },
  /**
   * 跳转到故事详情介绍页
   */
  toStoryInfo: function (event) {
    let id = event.currentTarget.id;
    let vip = 'no';
    let storyName = '糖豆妈妈睡前故事';
    let storyList = globalStoryManager.storyList;
    for (let i= 0; i < storyList.length; i++){
      let story = storyList[i];
      if(story.storyStr === id){
        vip = story.vip;
        storyName = story.storyName;
        break;
      }
    }
    wx.navigateTo({
      url: '../storyInfo/storyInfo?storyStr=' + id + '&vip=' + vip + '&storyName=' + storyName
    })
  },
  toMoreStory: function(){
    wx.navigateTo({
      url: '../moreStroy/moreStory'
    })
  },
  onShareAppMessage: function (res) {
    // console.log('转发回调',res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '糖豆妈妈讲故事',
      path: "pages/index/index",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
