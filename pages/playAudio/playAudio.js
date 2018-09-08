import { doRequest } from '../../utils/wxRequest.js'

let app = getApp()
let globalBgAudioManager = app.globalBgAudioManager; //全局播放对象
let globalStoryManager = app.globalStoryManager; //全局故事列表，包含：故事列表、当前播放的故事
const singleStoryList = globalStoryManager.singleStoryList; //单个故事集合
let audioList = []; //音频列表
let storyList = []; //故事列表
// console.log('page--',audioList.length);
let currentAudio; //当前播放的故事
let currentCollectIds = [];//当前已经收藏的故事数组

Page({
  initCurrentBgAudio: function (currentAudio){
  },
  data: {
    collectDisplay: 'none'
  },
  onReady: function (e) {
    globalStoryManager = app.globalStoryManager;
    audioList = globalStoryManager.audioList;
    storyList = globalStoryManager.storyList;
    currentAudio = globalStoryManager.currentAudio; //点击的故事
    this.currentAudioInfo();

    globalBgAudioManager.onTimeUpdate(
      ()=>{
        // 在move的时候，不要更新进度条控件
        if (!this.data.isMovingSlider && globalBgAudioManager.src == currentAudio.audioUrl) {
          // console.log('全局src', globalBgAudioManager.src == currentAudio.audioUrl)
          
          this.setData({
            currentProcess: this.getAudioCurrentTime(),
            totalProcess: this.getAudioDuration(),
            sliderValue: Math.floor(globalBgAudioManager.currentTime),
            sliderMax: globalBgAudioManager.duration
          });
        }
      }
    )
    let self = this;
    globalBgAudioManager.onEnded(
      stopRes=>{
        self.toNextAudio();
        console.log('播放结束');
      }
    )
    this.getCollect();
  },

  getCollect: function () {
    doRequest('/ChildrenStory/TDUserCollectServlet.do', { id: currentAudio.id, methodName: 'findCollect' }).then(
      res => {
        if (res.success) {
          console.log('findCollect ', res);
          let collects = res.result;
          let idsArr = collects.split(',');
          // console.log('idsArr ', idsArr);
          if (collects != '' && idsArr.length > 0) {
            currentCollectIds = idsArr;
          }

          let flag = false;
          let collectDisplay = 'none';
          let preCollectDisplay = '';
          

          console.log('kk', globalStoryManager);
          if (audioList.length > 1){
            let flag = true;
            for(let i=0; i<storyList.length && flag; i++){
              for(let id of idsArr){
                console.log('专辑 ', storyList[i].nameStr, currentAudio.nameStr);
                if (storyList[i].id == id && storyList[i].nameStr==currentAudio.nameStr) {
                  console.log('d ', id);
                  collectDisplay = '';
                  preCollectDisplay = 'none';
                  flag = false;
                  break;
                }
              }
            }
          } else {
            for (let m = 0; m < idsArr.length; m++) {
              console.log('单个 ', idsArr[m], currentAudio.id);
              if (idsArr[m] == currentAudio.id) {
                // console.log('有重复');
                collectDisplay = '';
                preCollectDisplay = 'none';
                break;
              }
            }
          }

          this.setData({
            collectDisplay: collectDisplay,
            preCollectDisplay: preCollectDisplay
          });
        }
      }
    )
  },
  
  /**
   * 当前页面需要播放故事的信息
   * 1、首次进入页面，播放音频
   * 2、点击播放上一首、下一首音频
   */
  currentAudioInfo: function(){
    let ca = globalStoryManager.currentAudio;
    wx.setNavigationBarTitle({
      title: ca.storyName?ca.storyName:ca.audioName
    })
    this.toPlayAudio();
    this.setData({
      imgUrl: currentAudio.imgUrl,
      currentProcess: '00:00',
      totalProcess: '00:00',
      sliderMax: 100,
      sliderValue: 0,
      playNum: currentAudio.playNum,
      playTime: currentAudio.playTime,
      dt: currentAudio.dt,
      audioTitle: currentAudio.storyName ? currentAudio.storyName : currentAudio.audioName,
      audioSrc: currentAudio.audioUrl,
      isMovingSlider: false,
      playAudioDisplay: 'none',
      pauseAudioDisplay: '',
    })
  },
  toPreAudio: function(){
    if (currentAudio.count === '0') {
      for (let index in singleStoryList) {
        if (singleStoryList[index].id == currentAudio.id) {
          index = index == 0 ? singleStoryList.length - 1 : parseInt(index) - 1;
          currentAudio = singleStoryList[index];
          globalStoryManager.currentAudio = currentAudio;
          break;
        }
      }
    } else {
      for (let index in audioList) {
        if (audioList[index].id == currentAudio.id) {
          index = index == 0 ? audioList.length - 1 : parseInt(index) - 1;
          currentAudio = audioList[index];
          globalStoryManager.currentAudio = currentAudio;
          break;
        }
      }
    }  
    
    this.currentAudioInfo();
  },
  /**
   * 播放
   */
  toPlayAudio: function (e) {
    // globalBgAudioManager.src = this.data.audioSrc;
    this.setData({
      playAudioDisplay: 'none',
      pauseAudioDisplay: ''
    })
    currentAudio = globalStoryManager.currentAudio;
    globalBgAudioManager.title = currentAudio.storyName;
    globalBgAudioManager.epname = currentAudio.storyName;
    globalBgAudioManager.singer = '糖豆妈妈';
    globalBgAudioManager.coverImgUrl = currentAudio.imgUrl;
    
    if (currentAudio.audioUrl == globalBgAudioManager.src) {
      globalBgAudioManager.play();
    }else{
      globalBgAudioManager.src = currentAudio.audioUrl;
    }

    if (globalBgAudioManager.src != currentAudio.audioUrl){
      let servletName = '', method = '';
      if (currentAudio.count === '0'){
        servletName = 'TDStoryServlet.do', method = 'playStory';
      } else {
        servletName = 'AudioServlet.do', method = 'playAudio';
      }
      doRequest('/ChildrenStory/' + servletName, { id: currentAudio.id, methodName: method }).then(
        playRes=>{
          if (playRes.success) {
            currentAudio.playNum = parseInt(currentAudio.playNum) + 1;
            this.setData({ playNum: currentAudio.playNum });
            if(currentAudio.count==='0'){
              for (var index in storyList){
                if (storyList[index].id===currentAudio.id){
                  storyList[index].playNum = currentAudio.playNum + '';
                  wx.setStorage({
                    key: 'td_story_list',
                    data: storyList,
                  })
                }
              }
            }
          }
        }
      );
    }
  },
  toPauseAudio: function(){
    globalBgAudioManager.pause();
    this.setData({ 
      playAudioDisplay: '',
      pauseAudioDisplay: 'none'
    })
  },
  /**
   * 下一个音频故事
   */
  toNextAudio: function () {
    console.log('666', currentAudio);
    if(currentAudio.count==='0'){
      for (let index in singleStoryList) {
        if (singleStoryList[index].id == currentAudio.id) {
          index = index == singleStoryList.length - 1 ? 0 : parseInt(index) + 1;
          if (singleStoryList[index].count != '0') {
            continue;
          } else {
            currentAudio = singleStoryList[index];
            globalStoryManager.currentAudio = currentAudio;
            break;
          }
        }
      }
    }else{
      for (let index in audioList) {
        if (audioList[index].id == currentAudio.id) {
          index = index == audioList.length - 1 ? 0 : parseInt(index) + 1;
          currentAudio = audioList[index];
          globalStoryManager.currentAudio = currentAudio;
          break;
        }
      }
    }
    
    this.currentAudioInfo();
  },

  /**
   * 收藏动作
   */
  tdCollect: function () {
    console.log('globalStoryManager', globalStoryManager);
    
    let currentAudio = globalStoryManager.currentAudio;
    let id = currentAudio.id;
    let audioList = globalStoryManager.audioList;
    let storyList = globalStoryManager.storyList;
    if (audioList.length>1){
      let nameStr = audioList[0].nameStr;
      for (let i=0; i<storyList.length; i++){
        console.log('666',storyList[i]);
        if(storyList[i].nameStr == nameStr){
          id = storyList[i].id;
        }
      }
    }
    console.log('currentCollectIds', currentCollectIds);
    console.log('dangqian', currentAudio);

    let flag = false;
    for(let i=0; i<currentCollectIds.length; i++){
      if (currentCollectIds[i] == id){
        flag = true;
        break;
      }
    }
    if(flag) return;
    let self = this;
    var fun = function(){
      currentCollectIds.unshift(id+'');
      let ids = '';
      for (let m = 0; m < currentCollectIds.length; m++){
        ids += currentCollectIds[m];
        if(m!=currentCollectIds.length-1){
          ids += ',';
        }
      }
      doRequest('/ChildrenStory/TDUserCollectServlet.do', { storyIds: ids, methodName: 'doCollect' }).then(
        res=>{
          console.log('收藏结果 res', res);
          if(res.success){
            wx.showToast({
              title: res.message,
              duration: 2000
            })
            self.setData({
              preCollectDisplay: 'none',
              collectDisplay: ''
            });
          }
        }
      );
    }
    fun();
  },
  /**
   * 计算音频当前播放进度
   */
  getAudioCurrentTime: function () {
    var currentPlace = globalBgAudioManager.currentTime;
    return this.formatAudioTime(currentPlace);
  },
  /**
   * 计算音频总时间
   */
  getAudioDuration: function () {
    var durationPlace = globalBgAudioManager.duration;
    return this.formatAudioTime(durationPlace);
  },
  /**
   * 格式化音频播放时间
   */
  formatAudioTime: function (value) {
    //分钟  
    var minute = value / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    //秒  
    var second = value % 60;
    var seconds = parseInt(second);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var allTime = "" + minutes + "" + ":" + "" + seconds + ""
    return allTime;
  },
  /**
   * 完成一次拖动后触发的事件
   */
  hanleSliderChange: function (e) {
    const position = e.detail.value;
    this.seekCurrentAudio(position);
  },
  /**
   * 手动改变进度条后，音频随之改变
   */
  seekCurrentAudio: function (position) {
    const page = this;
    const pauseStatusWhenSlide = globalBgAudioManager.paused;
    if (pauseStatusWhenSlide) {
      globalBgAudioManager.play();
    }
    globalBgAudioManager.seek(Math.floor(position));

    // globalBgAudioManager.seek = seek(options) {
    //   wx.seekBackgroundAudio(options);  // 这样实现，就可以配置success回调了
    // } 


    // globalBgAudioManager.seek({
    //   position: Math.floor(position),
    //   success: () => {
    //     console.log('111 ok');
    // page.setData({
    //   currentProcess: this.formatAudioTime(position),
    //   sliderValue: Math.floor(position)
    // });
    //     if (pauseStatusWhenSlide) {
    //       globalBgAudioManager.pause();
    //     }
    //     console.log(`The process of the audio is now in ${globalBgAudioManager.currentTime}s`);
    //   },
    //   error:(err) => {
    //     console.log('111 error',err);
    //   }
    // });
  },
  handleSliderMoveStart: function () {
    this.setData({
      isMovingSlider: true
    });
  },
  handleSliderMoveEnd: function () {
    this.setData({
      isMovingSlider: false
    });
  },
  /**
   * 转发
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
  goBack: function(){
    // console.log('back');
    wx.navigateBack({
      delta: 1
    })
  }
})