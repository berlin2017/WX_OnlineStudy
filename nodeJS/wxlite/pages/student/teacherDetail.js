// pages/student/teacherDetail.js
var tabs = [
  {
    name: "老师介绍"
  },
  {
    name: "在售班课"
  },
  {
    name: "学员评价"
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:null,
    name:null,
    info:null,
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    comments: [],
    nomore:false,
    pageIndex:1,
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
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

    console.log(options);
    that.setData({
      image:options.image,
      name: options.name,
      info: options.info,
    });

    this.requestComments();
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
    this.requestComments();
  },

  requestComments:function(){
    var list = [
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 0 },
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 1 },
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 2 },
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 3 },
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 4 },
      { image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', name: '小明', time: '2018-03-21 14:30:00', content: '老师真的很棒，让我体验了做学生的乐趣!!!', score: 5 }
    ];
    if (list.length <= 0) {
      this.setData({
        nomore: true
      });
    }
    var array = this.data.comments.concat(list);
    this.setData({
      comments: array,
      pageIndex:this.data.pageIndex+1
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
  },

  toSend:function(){

  }

})