// pages/moreStroy/moreStory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioList: [
      {
        audioUrl: "http://audio-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4%E5%92%8C%E5%9B%9B%E5%8D%81%E5%A4%A7%E7%9B%976.m4a",
        content: "阿里巴巴和四十大盗1",
        dt: "2018-06-02",
        imgUrl: "http://image-1255464404.file.myqcloud.com/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B46.jpg",
        id: 1,
        playNum: 2342,
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

  /**
   * 跳转到故事详情介绍页
   */
  toStoryInfo: function () {
    wx.navigateTo({
      url: '../storyInfo/storyInfo'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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