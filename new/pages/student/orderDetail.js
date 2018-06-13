// pages/teacher/orderDetail.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    btn_color: null,
    btn_text: null,
    order: {},
    isShowDialog: false,
    id: null,
    jiajiaInfo: {},
    currentIndex: 0,
    showChat: false,
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
      mask: true,
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

          if (Date.parse(new Date()) - parseInt(res.data.info.end_time) * 1000 < 7 * 24 * 3600 * 1000 || that.data.id=='36') {
            that.setData({
              showChat: true
            });
          }
          res.data.info.end_time_value = res.data.info.end_time;
          res.data.info.end_time = util.formatTime(new Date(parseInt(res.data.info.end_time) * 1000));
        }
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
      mask: true,
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
      mask: true,
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

  previewImage: function () {
    var that = this;
    wx.previewImage({
      urls: [that.data.order.indent_pic],
    })
  },

  comfirm: function () {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
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

  update: function () {
    var color = null;
    var btn_text = null;
    var that = this;
    switch (this.data.order.state) {
      case '0':
        color = '#7647a0';
        btn_text = '加价并发布';
        break;
      case '2':
        if (that.data.order.directional == '0') {
          color = '#7647a0';
          btn_text = '进入聊天室';
        }

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
  jump: function (e) {
    var that = this;
    if (that.data.order.state == '0') {
      // wx.navigateTo({
      //   url: 'sendQuestion',
      // })
      that.requestJiaJia();
    } else if (that.data.order.state == '1') {

    } else if (that.data.order.state == '2') {
      wx.navigateTo({
        url: '../test/chating' + '?id=' + that.data.order.teachers[0].openid + '&type=2' + '&orderId=' + that.data.id,
      })
    } else if (that.data.order.state == '3') {
      
    }

  },

  toChat:function(){
    var that = this;
    wx.navigateTo({
      url: '../test/chating' + '?id=' + that.data.order.teacher_openid + '&type=2' + '&orderId=' + that.data.id,
    })
  },

  comment:function(){
    var that = this;
    wx.navigateTo({
      url: 'comment' + '?id=' + that.data.order.teachers[0].openid + '&indent_id=' + that.data.id,
    })
  },

  confirmTeacher: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    var teacherid = that.data.order.teachers[that.data.currentIndex].openid;
    wx.request({
      url: 'https://weixin.ywkedu.com/App/confirm_teacher',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        teacher_openid: teacherid,
        form_id: e.detail.formId,
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
          // that.sendMsg(e, teacherid);
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

  sendMsg: function (e, id) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx72667dd95df8c05d&secret=d91961063b0948f5607319523f2376b8',
      success: function (res) {
        var token = res.data.access_token;
        var d = {
          touser: id,
          template_id: 'AnAV2i1TpSQwyp0_so6Sco3OOklPdy032foGZPv85V4',//这个是1、申请的模板消息id，  
          form_id: e.detail.formId,
          data: {//测试完发现竟然value或者data都能成功收到模板消息发送成功通知，是bug还是故意？？【鄙视、鄙视、鄙视...】 下面的keyword*是你1、设置的模板消息的关键词变量  

            "keyword1": {
              "value": '已接单',
              "color": "#4a4a4a"
            },
            "keyword2": {
              "value": util.formatTime(new Date()),
              "color": "#9b9b9b"
            },
            "keyword3": {
              "value": that.data.order.student_name,
              "color": "#9b9b9b"
            },
            "keyword4": {
              "value": that.data.order.order_num,
              "color": "#9b9b9b"
            },
          },
          color: '#ccc',
          emphasis_keyword: 'keyword1.DATA'
        }
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token,
          method: 'POST',
          data: d,
          success: function (res) {
            wx.hideLoading();
            console.log(res);
          },
          fail: function (res) {
            wx.hideLoading();
            console.log(res);
          },
        })
      },
    })
  },

  commit: function (e) {
    var money = e.detail.value.money_input;
    console.log(money);


    var that = this;
    if (!money) {
      wx.showToast({
        title: '请填写金额',
      })
      return;
    }
    if (!that.data.jiajiaInfo.min_money || that.data.jiajiaInfo.min_money == 0) {
      that.data.jiajiaInfo.min_money = 5;
    }

    if (parseInt(money) < parseInt(that.data.jiajiaInfo.min_money)) {
      wx.showToast({
        title: '最低加价 ' + that.data.jiajiaInfo.min_money,
      })
      return;
    }

    wx.showLoading({
      title: '',
      mask: true,
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