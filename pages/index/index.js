const util = require('../../utils/util.js');
import { get, post } from "../../utils/network.js"
import { doRequest } from "../../utils/wxRequest.js"

//获取应用实例
const app = getApp();
const globalStoryManager = app.globalStoryManager;
const singleStoryList = globalStoryManager.singleStoryList;

Page({
  data: {
    imgUrls: [
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1200,
    storyList: [],
    albumList: []
  },
  onShow: function () {
    console.log('globalStoryManager1', globalStoryManager);
    wx.setNavigationBarTitle({
      title: '快乐儿童故事'
    });
    globalStoryManager.storyList = [];
    let self = this;
    this.getStoryList(function (storyList) {
      let list1 = []; //只展示最新的四个故事
      let list2 = []; //只展示四个专辑故事
      let list3 = []; //从专辑故事中挑选3个作为顶部轮播
      for (var story of storyList){
        if(story.count!='0'){
          list2.push(story);
        }
        if(list2.length === 4){
          break;
        }
      }
      for (var story of storyList) {
        if (story.count != '0' && story.type==='0') {
          list3.push(story);
        }
        if (list3.length === 3) {
          break;
        }
      }
      let topImgUrl = [];
      console.log('list3', list3);
      for(var story of list3){
        topImgUrl.push(story.imgUrl);
      }
      storyList.slice(1);
      list1 = storyList.slice(0, 4);

      self.setData({
        storyList: list1,
        albumList: list2,
        imgUrls: topImgUrl
      });

      for (var story of storyList) {
        if (story.count === '0') {
          singleStoryList.push(story);
        }
      }
    });
  },
  onReady: function () {
    
  },
  
  /**
   * 获取storyList
   * 先从缓存获取storyList，缓存有并且不是今天set的，查后台；缓存无，查后台；否则直接用缓存数据
   */
  getStoryList: function (callFun) {
    let nowDate = util.getDate();
    let cacheDate; //缓存某天的日期 例如：2018-08-11
    let storyList = [];
    try {
      cacheDate = wx.getStorageSync('td_now_date');
      if (cacheDate) {
        // console.log("cacheDate:",cacheDate);
      }
    } catch (e) {

    }
    try {
      storyList = wx.getStorageSync('td_story_list');
      if (storyList) {
        storyList = storyList;
      } else {
        storyList = [];
      }
    } catch (e) {
      console.log('storyList catch:', e);
      storyList = [];
    }
    // cacheDate = 2;
    if (cacheDate == nowDate && storyList.length > 0) {
      // console.log('storyList直接用缓存的');
      for (let m = 0; m < storyList.length; m++) {
        globalStoryManager.storyList.push(storyList[m]);
      }
      callFun(storyList);
    } else {
      console.log('storyList 后台');
      doRequest('/ChildrenStory/TDStoryServlet.do', { methodName: 'findStoryList', type: '' }).then(
        reqRes => {
          console.log('StoryServlet reqRes', reqRes)
          if(reqRes.success){
            if(reqRes.result){
              let value = reqRes.result;
              let storyList = value.storyList;
              if (storyList && storyList.length > 0) {
                for (var i = 0; i < storyList.length; i++) {
                  storyList[i].mode = "aspectFit";
                  storyList[i].dt = util.stampFormatTime(storyList[i].dt.time);
                  globalStoryManager.storyList.push(storyList[i]);
                }
                wx.setStorageSync('td_story_list', storyList);
                wx.setStorageSync('td_now_date', nowDate);
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
    }
  },
  /**
   * 跳转到故事详情介绍页
   */
  toStoryInfo: function (event) {
    let id = event.currentTarget.id;
    let storyName = '';
    let storyList = globalStoryManager.storyList;
    let story;
    for (let i= 0; i < storyList.length; i++){
      story = storyList[i];
      if(story.id == id){
        storyName = story.storyName;
        break;
      }
    }
    if(story.count=='0'){
      globalStoryManager.currentAudio = story;
      util.playAudio();
    }else{
      wx.navigateTo({
        url: '../storyInfo/storyInfo?nameStr=' + story.nameStr + '&storyName=' + storyName
      })
    }
  },
  /**
   * 更多所有故事
   */
  toMoreStory: function(){
    wx.navigateTo({
      url: '../moreStroy/moreStory?type=all'
    })
  },
  /**
   * 更多专辑故事
   */
  toMoreAlbumStory: function () {
    wx.navigateTo({
      url: '../moreStroy/moreStory?type=album'
    })
  },
  /**
   * 分享
   */
  onShareAppMessage: function (res) {
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
  },
  /**
   * 顶部轮播跳转
   */
  topDo: function (e) {
    console.log(e.target.id);
    console.log(globalStoryManager)
    let storyList = globalStoryManager.storyList;
    let currStory;
    for(var story of storyList){
      if (e.target.id===story.imgUrl){
        currStory = story;
        break;
      }
    }
    wx.navigateTo({
      url: '../storyInfo/storyInfo?nameStr=' + currStory.nameStr + '&storyName=' + currStory.storyName
    })
  },
})
