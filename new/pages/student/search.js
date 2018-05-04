// pages/student/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '搜索',
    title_bg: '#7647a0',
    teachers: [],
    inputShowed: false,
    inputVal: ""
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      // teachers: [

      // ],
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      // teachers: [

      // ],
    });
  },
  inputTyping: function (e) {
    console.log(e);
    this.setData({
      inputVal: e.detail.value,
      // teachers: []
    });
    console.log(e.detail.value);
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
  
  },

  bindinput:function(e){
    var keyword = e.detail.value;
    console.log(keyword);
    // this.setData({
    //   teachers: [
    //     { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
    //     { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
    //     { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
    //     { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
    //     { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, }
    //   ]
    // })
  },

  back: function () {
    wx.navigateBack({

    })
  },

  toDetail:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var teacher = this.data.teachers[index];
    // wx.navigateTo({
    //   url: 'teacherDetail' + '?openId=' + teacher.openid,
    // })
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      teacher: teacher,
    });
    wx.navigateBack({//返回
      delta: 1
    })
  },

  search: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/search_teacher',
      data: {
        'name': e.detail.value
      },
      success: function (res) {
        that.setData({
          teachers: res.data
        });
        wx.hideLoading();
      },
    })
  },

})