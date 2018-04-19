// pages/teacher/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    btn_color: null,
    btn_text: null,
    order: {},
    isShowDialog:false,
    id:null,
    jiajiaInfo:{},
    teachers: [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' },],
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestDetail();
  },

  requestDetail:function(){
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/premium',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        indent_id:that.data.id
      },
      success: function (res) {
        wx.hideLoading();
        res.data.info.state = '2';
        that.setData({
          order: res.data.info
        });
        that.update();
      },
    })
  },

  requestJiaJia: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/premium',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          jiajiaInfo: res.data.info
        });
        that.setData({
          isShowDialog: true
        });
      },
    })
  },

  cancel: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/delete_indent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.msg == 1){
          wx.showToast({
            title: '取消成功',
          })
          wx.navigateBack({
            
          })
        }else{
          wx.showToast({
            title: '取消失败',
          })
        }
      },
    })
  },

  comfirm:function(){
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/delete_indent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.msg == 1) {
          wx.showToast({
            title: '取消成功',
          })
          wx.navigateBack({

          })
        } else {
          wx.showToast({
            title: '取消失败',
          })
        }
      },
    })
  },

  update:function(){
    var color = null;
    var btn_text = null;
    switch (this.data.order.state) {
      case '0':
        color = '#7647a0';
        btn_text = '加价并发布';
        break;
      case '2':
        color = '#7647a0';
        btn_text = '进入聊天室';
        break;
      case '3':
        color = 'orangered';
        btn_text = '立即评价';
        break;
    }
    this.setData({
      order: this.data.order,
      btn_color: color,
      btn_text: btn_text
    });
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
    this.setData({
      currentIndex:0
    });
    this.requestDetail();
    wx.stopPullDownRefresh();
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
  back: function () {
    wx.navigateBack({

    })
  },
  jump:function(){
    var that = this;
    if (that.data.order.state == '0'){
      // wx.navigateTo({
      //   url: 'sendQuestion',
      // })
      that.requestJiaJia();
    }else if (that.data.order.state == '2') {
      wx.navigateTo({
        url: '../test/chating',
      })
    }else if (that.data.order.state == '3'){
  
        wx.navigateTo({
          url: 'comment' + '?image=' + that.data.order.teacher_icon + '&name=' + that.data.order.teacher + '&info=' + that.data.order.teacher_info+'&star='+that.data.order.star ,
      })
    } 
  },

  commit:function(e){
    var money = e.detail.value.money_input;
    console.log(money);
    this.setData({
      isShowDialog: false
    });
  },

  dismiss:function(){
    this.setData({
      isShowDialog: false
    });
  },

  radioChange:function(e){
    this.setData({
      currentIndex:e.detail.value
    });
  },
  
})