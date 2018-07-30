import { get, post } from "../../utils/network.js"

let util = require('../../utils/util.js'); 
let app = getApp()
let currentImage = '';
const globalStoryManager = app.globalStoryManager;

Page({
  data: {
    currentTab: 0,
    vip: 'no', // 是否需要vip资格
    audioList: [],
    enableCharge: 'no'
  },
  /**
   * options获取url中的参数
   * enableCharge: 是否启用收费
   * vip：是否是高级版音频
   */
  onLoad: function (options) {
    // globalStoryManager.audioList = this.data.audioList;
    this.setData({
      enableCharge: globalStoryManager.chargeStatus,
      vip: options.vip
    });
    wx.setNavigationBarTitle({
      title: options.storyName
    });
    globalStoryManager.audioList = [];
    
    let self = this;
    this.getAudioList(function (audioList) {
      console.log(audioList);
      self.setData({
        audioList: audioList
      });
    });
  },

  getAudioList: function (callFun){
    post('/sugar_beans/AudioServlet.do', { methodName: 'findAudioList', type: '' }).then(
      reqRes => {
        console.log('AudioServlet reqRes', reqRes)
        if (reqRes.data) {
          if (reqRes.data.result) {
            let value = reqRes.data.value;
            let audioList = value.audioList;
            if (audioList && audioList.length > 0) {
              audioList.reverse();
              for (var i = 0; i < audioList.length; i++) {
                audioList[i].mode = "aspectFit";
                audioList[i].vip = this.data.vip;
                audioList[i].dt = util.stampFormatTime(audioList[i].dt.time);
                globalStoryManager.audioList.push(audioList[i]);
              }
              callFun(audioList);
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
  },
  
  /**
   * 播放某个故事
   */
  toPlayAudio: function(event){
    // wx.navigateTo({
    //   url: '../playStory/playStory'
    // })

    let id = event.currentTarget.id;
    console.log('id:', id);
    for (var audio of globalStoryManager.audioList) {
      if (audio.id == id) {
        globalStoryManager.currentAudio = audio;
      }
    }
    // console.log('globalStoryManager.currentAudio:', globalStoryManager.currentAudio);
    util.playAudio();
  },


  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (e.target.dataset.current === '1') {
      this.setData({
        swiperHeight: 80 * 12 + 55
      })
    } else {
      this.imageLoad(currentImage);
    }
  },
  imageLoad: function (e) {
    currentImage = e;
    var imageSize = util.imageUtil(e);
    this.setData({
      imageWidth: imageSize.imageWidth,
      imageHeight: imageSize.imageHeight,
      swiperHeight: imageSize.imageHeight + 186
    })
  },
  //点击底部试听按钮
  toListen: function () {
    this.setData({
      currentTab: 1
    })
  }
});