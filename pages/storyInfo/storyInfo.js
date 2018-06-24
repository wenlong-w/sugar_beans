var util = require('../../utils/util.js'); 
let app = getApp()
let currentImage = '';
Page({
  data: {
    currentTab: 0,
    audioList: [
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%976.m4a",
        content: "阿里巴巴和四十大盗1",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B46.jpg",
        id: 1,
        playNum:2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗2",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%975.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B45.jpg",
        id: 2,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗4",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗5",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 3,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗6",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%975.m4a",
        content: "阿里巴巴和四十大盗5",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B45.jpg",
        id: 4,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗5",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 5,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗3",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%975.m4a",
        content: "阿里巴巴和四十大盗5",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B45.jpg",
        id: 6,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗5",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 7,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗3",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%975.m4a",
        content: "阿里巴巴和四十大盗5",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B45.jpg",
        id: 8,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗5",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 9,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗3",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 10,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗10",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%975.m4a",
        content: "阿里巴巴和四十大盗5",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B45.jpg",
        id: 11,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗5",
        mode: "aspectFit"
      },
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%973.m4a",
        content: "阿里巴巴和四十大盗3",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B43.jpg",
        id: 12,
        playNum: 2342,
        praiseNum: 223,
        storyName: "阿里巴巴和四十大盗3",
        mode: "aspectFit"
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.getImageInfo({
      src: '../image/test.jpg',
      success: function (res) {
        console.log(res);
      }
    }) 
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
    console.log('eee',e);
    if (e.target.dataset.current === '1'){
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
  toListen: function (){
    this.setData({
      currentTab: 1
    })
  }
});