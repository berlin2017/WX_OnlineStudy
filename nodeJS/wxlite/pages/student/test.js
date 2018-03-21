var tabs = [
  {
    name: "热门视频"
  },
  {
    name: "比赛集锦"
  },
  {
    name: "你懂专栏"
  },
  {
    name: "天下足球"
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0//页面除去头部Tabbar后，内容区的总高度，计算得到
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  }
})