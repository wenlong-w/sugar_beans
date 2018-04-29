const util = require('../../utils/util.js');
import { get, post } from "../../utils/network.js"
import { doRequest } from "../../utils/wxRequest.js"

//获取应用实例
const app = getApp();
const globalAudioListManager = app.courseAudioListManager;

Page({
  data: {
    motto: 'Hello World',
    rowLine: ['',''],
    imgUrls: [
      '../image/index/listenToMe.jpg',
      // '../image/doPraise.jpg',
      '../image/index/diary.jpg'
      // '../image/listenToMe.jpg',
      // '../image/topPraise.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    audioList: [

    ],
    albumAudioList: [

    ]
  },
  onShow: function () {
    console.log('index onshow');
    wx.setNavigationBarTitle({
      title: '糖豆妈妈讲故事'
    });
    globalAudioListManager.audioList = [];
    globalAudioListManager.albumAudioList = [];

    let self = this;
    this.getStoryList(function (storyList) {
      // console.log('globalAudioListManager.audioList:', globalAudioListManager.audioList);
      self.setData({
        audioList: storyList
      });
      // console.log('storyListstoryListstoryList', storyList);
    });
    this.getAlbumStoryList(function (albumStoryList) {
      // console.log('globalAudioListManager.audioList:', globalAudioListManager.audioList);
      self.setData({
        albumAudioList: albumStoryList
      });
      // console.log('storyListstoryListstoryList', storyList);
    });
  },
  onLoad: function () {
    
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
  },
  /**
   * 获取audioList
   * 先从缓存获取audioList，缓存有并且不是今天set的，查后台；缓存无，查后台；否则直接用缓存数据
   */
  getStoryList: function (callFun) {
    let nowDate = util.getDate();
    let cacheDate; //缓存某天的日期 例如：2018-01-16
    let audioList = [];
    try {
      cacheDate = wx.getStorageSync('now_date');
      if (cacheDate) {
        // console.log("cacheDate:",cacheDate);
      }
    } catch (e) {

    }
    try {
      audioList = wx.getStorageSync('audio_list');
      if (audioList && audioList != null && audioList != 'null'
        && audioList != 'undefined' && audioList != undefined
        && audioList != '') {
        audioList = audioList;
      } else {
        audioList = [];
      }
    } catch (e) {
      console.log('audioList catch:', e);
      audioList = [];
    }
    // cacheDate = 1;
    if (cacheDate == nowDate && audioList.length > 0) {
      // console.log('audioList直接用缓存的');
      for (let m = 0; m < audioList.length; m++) {
        globalAudioListManager.audioList.push(audioList[m]);
      }
      callFun(audioList);
    } else {
      // console.log('audioList 后台');
      doRequest('/ChildrenStory/StoryServlet.do', { methodName: 'findStoryList', type: '' }).then(
        res => {
          console.log('audioList         res:', res);
          if (res.success) {
            let audioList = res.result.storyList;
            // util.checkImgFileUrl(audioList);
            if (audioList && audioList.length > 0) {
              for (var i = 0; i < audioList.length; i++) {
                audioList[i].mode = "aspectFit";
                audioList[i].dt = util.stampFormatTime(audioList[i].dt.time);
                globalAudioListManager.audioList.push(audioList[i]);
              }
              wx.setStorageSync('audio_list', audioList);
              wx.setStorageSync('now_date', nowDate);
              callFun(audioList);
            } else {
              callFun([]);
            }
          } else {
            callFun([]);
          }
        }
      );
    }
  },
  /**
   * 获取audioList
   * 先从缓存获取audioList，缓存有并且不是今天set的，查后台；缓存无，查后台；否则直接用缓存数据
   */
  getAlbumStoryList: function (callFun) {
    let nowDate = util.getDate();
    let cacheDate; //缓存某天的日期 例如：2018-01-16
    let albumAudioList = [];
    try {
      cacheDate = wx.getStorageSync('now_date');
      if (cacheDate) {
        // console.log("cacheDate:",cacheDate);
      }
    } catch (e) {

    }
    try {
      albumAudioList = wx.getStorageSync('album_audio_list');
      if (albumAudioList && albumAudioList != null && albumAudioList != 'null'
        && albumAudioList != 'undefined' && albumAudioList != undefined
        && albumAudioList != '') {
        albumAudioList = albumAudioList;
      } else {
        albumAudioList = [];
      }
    } catch (e) {
      console.log('audioList catch:', e);
      albumAudioList = [];
    }
    // cacheDate = 1;
    if (cacheDate == nowDate && albumAudioList.length > 0) {
      // console.log('audioList直接用缓存的');
      for (let m = 0; m < albumAudioList.length; m++) {
        globalAudioListManager.albumAudioList.push(albumAudioList[m]);
      }
      callFun(albumAudioList);
    } else {
      // console.log('audioList 后台');
      doRequest('/ChildrenStory/StoryServlet.do', { methodName: 'findStoryList' }).then(
        res => {
          // console.log('audioList         res:', res);
          if (res.success) {
            let albumAudioList = res.result.storyList;
            // util.checkImgFileUrl(albumAudioList);
            if (albumAudioList && albumAudioList.length > 0) {
              for (var i = 0; i < albumAudioList.length; i++) {
                albumAudioList[i].mode = "aspectFit";
                albumAudioList[i].dt = util.stampFormatTime(albumAudioList[i].dt.time);
                globalAudioListManager.albumAudioList.push(albumAudioList[i]);
              }
              wx.setStorageSync('album_audio_list', albumAudioList);
              wx.setStorageSync('now_date', nowDate);
              callFun(albumAudioList);
            } else {
              callFun([]);
            }
          } else {
            callFun([]);
          }
        }
      );
    }
  },
})
