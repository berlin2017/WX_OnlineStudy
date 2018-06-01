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
    showChat:false,
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
        indent_id: that.data.id,
        openId:app.globalData.myUser.openId,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.info.start_time) {
          res.data.info.start_time = util.formatTime(new Date(parseInt(res.data.info.start_time) * 1000));
        }

        if (res.data.info.end_time) {
          console.log(new Date().getTime);
          console.log(parseInt(res.data.info.end_time) * 1000);
          if (Date.parse(new Date()) - parseInt(res.data.info.end_time) * 1000 < 7 * 24 * 3600 * 1000) {
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

  previewImage: function () {
    var that = this;
    wx.previewImage({
      urls: [that.data.order.indent_pic],
    })
  },

  finish:function(e){
    if (this.data.order.directional == '1'){
      this.reject();
      return;
    }
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
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
        // that.sendMsg(e,1);
        that.requestDetail();
      },
    })
  },

  reject: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/pick_no',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        price: that.data.order.price
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        // that.sendMsg(e,1);
        if(res.data.msg == 1){
          wx.showToast({
            title: '已拒绝',
          })
          setTimeout(function () {
            wx.navigateBack({
              
            })
          }, 1000);
        }else{
          wx.showToast({
            title: res.data.data.data,
          })
        }
        
        
      },
    })
  },


  update: function () {
    var color = null;
    var btn_text = null;
   
    switch (this.data.order.state) {
      case '2':
        color = '#7647a0';
        btn_text = '进入聊天室';
        break;
      case '3':
        color = 'orangered';
        btn_text = '立即评价';
        break;
    }
    if (this.data.order.end_time) {
      if (Date.parse(new Date()) - parseInt(this.data.order.end_time_value) * 1000 < 7 * 24 * 3600 * 1000) {
        color = '#7647a0';
        btn_text = '进入聊天室';
      }
    }
    if (this.data.order.msg == 1 && (this.data.order.state == 0 || this.data.order.state == 1)) {
      color = '#7647a0';
      btn_text = '抢单';
    }

    if (this.data.order.state == '2' && this.data.order.directional == '1'){
      color = '#7647a0';
      btn_text = '确认接单';
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
    app.globalData.isInChatPage = false;
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
    app.globalData.isInChatPage = false;
    wx.navigateBack({

    })
  },
  jump: function (e) {
    var that = this;
    if (that.data.order.state == '0' || that.data.order.state == '1') {
      // wx.navigateTo({
      //   url: 'sendQuestion',
      // })
      if(that.data.order.msg=='1'){
        that.confirmOrder(e);
      }
      
    } else if (that.data.order.state == '2' && that.data.order.directional == '0') {
      wx.navigateTo({
        url: '../test/chating' + '?id=' + that.data.order.student_openid + '&type=1' + '&orderId=' + that.data.id,
      })
    } else if (that.data.order.state == '3') {

      wx.navigateTo({
        url: 'comment' + '?id=' + that.data.order.teachers[0].openid + '&indent_id=' + that.data.id,
      })
    } else if (that.data.order.directional == '1'){
      that.acceptOrder();
    }
  },

  toChat:function(){
    var that = this;
    wx.navigateTo({
      url: '../test/chating' + '?id=' + that.data.order.student_openid + '&type=1' + '&orderId=' + that.data.id,
    })
  },

  acceptOrder:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })

    wx.request({
      url: 'https://weixin.ywkedu.com/App/pick_yes',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          wx.showToast({
            title: '确认成功',
          })
          setTimeout(function () {
            that.requestDetail();
            // that.sendMsg(e, 0);
          }, 1000);

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
 

  confirmOrder: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })

    wx.request({
      url: 'https://weixin.ywkedu.com/App/up_indent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        indent_id: that.data.id,
        openId: app.globalData.myUser.openId,
        form_id:e.detail.formId,
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          wx.showToast({
            title: '抢单成功',
          })
          setTimeout(function(){
            that.requestDetail();
            // that.sendMsg(e, 0);
          },1000);
         
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
  

  sendMsg: function (e,msg_type) {
    console.log(e);
    var title = '已接单';
    if(msg_type == 1){
      title = '已结束';
    }
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
          touser: app.globalData.myUser.openId,
          template_id: 'AnAV2i1TpSQwyp0_so6Sco3OOklPdy032foGZPv85V4',//这个是1、申请的模板消息id，  
          form_id: e.detail.formId,
          data: {//测试完发现竟然value或者data都能成功收到模板消息发送成功通知，是bug还是故意？？【鄙视、鄙视、鄙视...】 下面的keyword*是你1、设置的模板消息的关键词变量  

            "keyword1": {
              "value": title,
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