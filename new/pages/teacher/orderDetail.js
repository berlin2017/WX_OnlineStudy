// pages/teacher/orderDetail.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    title_bg: '#268746',
    userInfo: {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg',
    },
    order_type: 0,
    btn_color: null,
    btn_text: null,
    id: null,
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  requestDetail: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/student_indentXQ',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.info.start_time) {
          res.data.info.start_time = util.formatTime(new Date(parseInt(res.data.info.start_time) * 1000));
        }

        if (res.data.info.end_time) {
          res.data.info.end_time = util.formatTime(new Date(parseInt(res.data.info.end_time) * 1000));
        }
        that.setData({
          order: res.data.info
        });
        that.update();
      },
    })
  },

  finish:function(){
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/class_is_over',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        openId:app.globalData.myUser.openId
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.requestDetail();
      },
    })
  },


  update: function () {
    var color = null;
    var btn_text = null;
    switch (this.data.order.state) {
      case '0':
        color = '#7647a0';
        btn_text = '抢单';
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
    this.requestDetail();
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
      currentIndex: 0
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
  jump: function () {
    var that = this;
    if (that.data.order.state == '0') {
      // wx.navigateTo({
      //   url: 'sendQuestion',
      // })
      that.confirmOrder();
    } else if (that.data.order.state == '1') {

    } else if (that.data.order.state == '2') {
      wx.navigateTo({
        url: '../test/chating' + '?id=' + that.data.order.openid + '&type=1',
      })
    } else if (that.data.order.state == '3') {

      wx.navigateTo({
        url: 'comment' + '?id=' + that.data.order.teachers[0].openid + '&indent_id=' + that.data.id,
      })
    }
  },
 

  confirmOrder: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })

    wx.request({
      url: 'https://weixin.ywkedu.com/App/up_indent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        openId: app.globalData.myUser.openId
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          wx.showToast({
            title: '抢单成功',
          })
          that.requestDetail();
        } else {
          wx.showToast({
            title: res.data.data,
          })
        }

      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },


  confirmTeacher: function () {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/confirm_teacher',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        teacher_openid: that.data.order.teachers[that.data.currentIndex].openId
      },
      success: function (res) {
        console.log(res);
        if (res.data.msg == 1) {
          wx.showToast({
            title: '成功',
          })
          that.setData({
            isShowDialog: false
          });
          that.requestDetail();
        } else {
          wx.showToast({
            title: res.data.data,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

  commit: function (e) {
    var money = e.detail.value.money_input;
    console.log(money);


    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/update_premium',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        price: parseInt(that.data.order.price),
        jiajia: parseInt(money),
      },
      success: function (res) {
        if (res.data.msg == 1) {
          wx.showToast({
            title: '加价成功',
          })
          that.setData({
            isShowDialog: false
          });
          that.requestDetail();
        } else {
          wx.showToast({
            title: res.data.data,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

  dismiss: function () {
    this.setData({
      isShowDialog: false
    });
  },

  radioChange: function (e) {
    this.setData({
      currentIndex: e.detail.value
    });
  },


  toTeacherDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var teacher = this.data.order.teachers[index];
    wx.navigateTo({
      url: 'teacherDetail' + '?openId=' + teacher.openid,
    })
  },
})