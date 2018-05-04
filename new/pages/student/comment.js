// pages/student/comment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'评价老师',
      image: null,
      name: null,
      info: null,
      star: 10,
      starMap: [
        '非常差',
        '差',
        '一般',
        '好',
        '非常好',
      ],
      myStar:5,
      detail:{},
      id:null,
      indent_id:null,
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      myStar: star,
    });
  },

  requestDetail: function () {
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
      url: 'https://weixin.ywkedu.com/App/pingjia_info',
      data: {
        'teacher_openid': that.data.id,
        'student_openid':app.globalData.myUser.openId,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          detail: res.data
        });
        wx.hideLoading();
      },
    })
  },

confirm:function(e){
  var str = e.detail.value.input;
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
    url: 'https://weixin.ywkedu.com/App/add_pingjia',
    data: {
      'teacher_openid': that.data.id,
      'student_openid': app.globalData.myUser.openId,
      'student_name': that.data.detail.student_info.realname,
      'comment':str,
      'score': that.data.myStar,
      'indent_id': that.data.indent_id,
    },
    success: function (res) {
      console.log(res);
      wx.hideLoading();
      if(res.data.msg==1){
        wx.showToast({
          title: '感谢你的评价',
        })
        setTimeout(function(){
          wx.navigateBack({

          })
        },2000);
      }else{
        wx.showToast({
          title: res.data.data,
        })
      }
    },
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      id:options.id,
      indent_id: options.indent_id
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestDetail();
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

  back:function(){
    wx.navigateBack({
      
    })
  },
})