let app = getApp()
Page({
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