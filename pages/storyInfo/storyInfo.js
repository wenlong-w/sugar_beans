import { get, post } from "../../utils/network.js"
import { doRequest } from "../../utils/wxRequest.js"

let util = require('../../utils/util.js'); 
let app = getApp()
let currentImage = '';
let contImg = '';
const globalStoryManager = app.globalStoryManager;

Page({
  data: {
    currentTab: 1,
    audioList: [],
    storyName:'',
    nameStr: '',
    count: 1
  },
  /**
   * options获取url中的参数
   */
  onLoad: function (options) {
    console.log('optionsoptions', options);
    wx.setNavigationBarTitle({
      title: options.storyName
    });
    globalStoryManager.audioList = [];
    
    let storyList = globalStoryManager.storyList;
    for(var story of storyList){
      if (story.nameStr === options.nameStr){
        this.data.count = parseInt(story.count);
        console.log('story:', story);
        contImg = story.contImg;
      }
    }
    
    let self = this;
    this.getAudioList(options.nameStr,function (audioList) {
      console.log('audioList-', audioList);

      self.setData({
        audioList: audioList,
        storyName: options.storyName,
        imgUrl: audioList[0]['imgUrl'],
        nameStr: options.nameStr,
        contImg: contImg
      });
    });
  },

  getAudioList: function (nameStr,callFun){
    console.log('参数 ', nameStr)
    doRequest('/ChildrenStory/AudioServlet.do', { methodName: 'findAudioList', nameStr: nameStr }).then(
      reqRes => {
        console.log('AudioServlet reqRes', reqRes)
        if (reqRes.success) {
          if (reqRes.result) {
            let value = reqRes.result;
            let audioList = value.audioList;
            if (audioList && audioList.length > 0) {
              audioList.reverse();
              for (var i = 0; i < audioList.length; i++) {
                audioList[i].mode = "aspectFit";
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
    if (e.detail.current===1){
      let count = this.data.count;
      this.setData({
        swiperHeight: 80 * count + 10
      })
    }else{
      this.imageLoad(currentImage);
    }
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
    console.log('e.target.dataset.current', e.target.dataset.current);
    if (e.target.dataset.current === '1') {
      let count = this.data.count;
      this.setData({
        swiperHeight: 80 * count + 10
      })
    } else {
      this.imageLoad(currentImage);
    }
  },
  imageLoad: function (e) {
    currentImage = e;
    var imageSize = util.imageUtil(e);
    let tabHeight = 0;
    if (this.data.currentTab===1){
      tabHeight = this.data.count * 80 + 10;
    } else {
      tabHeight = imageSize.imageHeight;
    }
    this.setData({
      imageWidth: imageSize.imageWidth,
      imageHeight: imageSize.imageHeight,
      swiperHeight: tabHeight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    
  },
  onShow: function () {
    console.log('globalStoryManager1', globalStoryManager);
  },
  goBack: function () {
    // console.log('back');
    globalStoryManager.audioList = [];
    wx.navigateBack({
      delta: 1
    })
  }
});