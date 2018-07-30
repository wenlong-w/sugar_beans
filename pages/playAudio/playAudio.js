import { doRequest } from '../../utils/wxRequest.js'
import { post } from '../../utils/network.js'


let app = getApp()
let globalBgAudioManager = app.globalBgAudioManager; //全局播放对象
let globalStoryManager = app.globalStoryManager; //全局故事列表，包含：story列表、audio列表、当前播放的故事
let audioList = []; //故事列表
// console.log('page--',audioList.length);
let currentAudio; //当前播放的故事
let currentCollectIds = [];//当前已经收藏的故事数组

Page({
  onReady: function (e) {
    audioList = globalStoryManager.audioList;
    currentAudio = globalStoryManager.currentAudio; //点击的故事

    if (globalBgAudioManager.src) {
      if (globalBgAudioManager.paused) { //播放的故事暂停或终止了，进入页面就再次播放
        console.log('当前播放的音乐暂停了');
        this.currentAudioInfo();
      } else {
        console.log('当前有播放的音乐 忽略');
        let playFlag = 'none';
        let pauseFlag = '';
        if (globalBgAudioManager.src != currentAudio.audioUrl) {
          playFlag = '';
          pauseFlag = 'none';
        }
        this.setData({
          imgUrl: currentAudio.imgUrl,
          currentProcess: '00:00',
          totalProcess: '00:00',
          sliderMax: 100,
          sliderValue: 0,
          playNum: currentAudio.playNum,
          dt: currentAudio.dt,
          audioTitle: currentAudio.audioName,
          audioSrc: currentAudio.audioUrl,
          isMovingSlider: false,
          playAudioDisplay: 'none',
          pauseAudioDisplay: '',
        })
      }
    } else {
      // console.log('没有故事');
      this.currentAudioInfo();
    }

    globalBgAudioManager.onTimeUpdate(
      () => {
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

    /**
     * 自动播放下一个故事
     */
    let self = this;
    globalBgAudioManager.onEnded(
      stopRes => {
        self.toNextAudio();
        console.log('播放结束');
      }
    )
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
   * 当前页面需要播放故事的信息
   * 1、首次进入页面，播放音频
   * 2、点击播放上一首、下一首音频
   */
  currentAudioInfo: function () {
    wx.setNavigationBarTitle({
      title: currentAudio.audioName
    })
    this.toPlayAudio();
    this.setData({
      imgUrl: currentAudio.imgUrl,
      currentProcess: '00:00',
      totalProcess: '00:00',
      sliderMax: 100,
      sliderValue: 0,
      playNum: currentAudio.playNum,
      dt: currentAudio.dt,
      audioTitle: currentAudio.audioName,
      audioSrc: currentAudio.audioUrl,
      isMovingSlider: false,
      playAudioDisplay: 'none',
      pauseAudioDisplay: '',
    })
  },
  /**
   * 播放
   */
  toPlayAudio: function (e) {
    this.setData({
      playAudioDisplay: 'none',
      pauseAudioDisplay: ''
    })
    currentAudio = globalStoryManager.currentAudio;
    globalBgAudioManager.title = currentAudio.audioName;
    globalBgAudioManager.epname = currentAudio.audioName;
    globalBgAudioManager.singer = '糖豆妈妈';
    globalBgAudioManager.coverImgUrl = currentAudio.imgUrl;
    if (currentAudio.audioUrl == globalBgAudioManager.src) {
      globalBgAudioManager.play();
    } else {
      globalBgAudioManager.src = currentAudio.audioUrl;
    }

    // if (globalBgAudioManager.src != currentAudio.audioUrl) {
    if (false) {
      doRequest('/ChildrenStory/StoryServlet.do', { id: currentAudio.id, methodName: 'playAudio' }).then(
        playRes => {
          if (playRes.success) {
            currentAudio.playNum = currentAudio.playNum + 1;
            this.setData({ playNum: currentAudio.playNum });
            for (var index in audioList) {
              if (audioList[index].id == currentAudio.id) {
                // console.log('赋值成功');
                audioList[index].playNum = currentAudio.playNum;
                // console.log('length', audioList.length);
                wx.setStorage({
                  key: 'audio_list',
                  data: JSON.stringify(audioList),
                })
                break;
              }
            }
          }
        }
      );
    }
  },
  beforeStory: function () {
    console.log('上一首');
  },
  nextStory: function () {
    console.log('下一首');
  },
  toCollect: function () {
    console.log('收藏');
  },

  toPraise: function () {
    console.log('赞赏');
  },

  toSetTime: function () {
    console.log('设置时间');
  },

  toShare: function(){
    console.log('转发');
  },
});