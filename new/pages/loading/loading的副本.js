// pages/loading/loading.js
var app = getApp();
var TIME = 1000;
var JMessage = require('../../jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('../../jpush/md5.js')
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showButton: false,
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
    var that = this;
    if (!app.globalData.res) {
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          app.globalData.res = res
          that.init(app.globalData.res);
        },
        fail: res => {
          console.log(res);
          that.setData({
            showButton: true
          });
        }
      })
    } else {
      that.init(app.globalData.res);
    }
  },

  onGetUserinfo: function () {
    wx.showLoading({
      title: '',
      mask:true,
    })
    var that = this;
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        app.globalData.res = res
        that.init(app.globalData.res);
      }
    })
  },

  // auth:function(){
  //   var that = this
  //   wx.authorize({
  //     scope: 'scope.userInfo',
  //     success() {
  //       wx.getUserInfo({
  //         success: res => {
  //           // 可以将 res 发送给后台解码出 unionId
  //           this.globalData.userInfo = res.userInfo
  //           this.globalData.res = res
  //           that.init(app.globalData.res);
  //         }
  //       })
  //     },
  //     fail(e){
  //       console.log(e);
  //     },
  //   })
  // },

  // requestAuth:function(){
  //   var that = this
  //   if (wx.openSetting) {
  //     wx.openSetting({
  //       success: function (res) {
  //         //尝试再次登录
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             app.globalData.userInfo = res.userInfo
  //             app.globalData.res = res
  //             that.init(app.globalData.res);
  //           },
  //           fail: res => {
  //             console.log(res);
  //             // that.requestAuth();
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '授权提示',
  //       content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
  //     })
  //   }
  // },

  initJpush: function () {
    var that = this;
    //jpush
    var jim = new JMessage({
      // debug : true
    });
    var time = Date.parse(new Date());
    var random_str = "022cd9fd995849b";
    var s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
    var signature = md5.hexMD5(s);
    jim.init({
      "appkey": "20a1f8331c8e462116c4d24e",
      "random_str": random_str,
      "signature": signature,
      "timestamp": time,
      "flag": 1,
    }).onSuccess(function (data) {
      //TODO
      console.log('im初始化成功');
      app.globalData.jim = jim;
      that.init();
    }).onFail(function (data) {
      //TODO
      console.log('im初始化失败');
      that.initJpush();
    });

    jim.onDisconnect(function () {
      console.log("一掉线");
      var that = this;
      var new_time = Date.parse(new Date());
      var new_random_str = "022cd9fd995849b";
      var new_s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
      var new_signature = md5.hexMD5(new_s);
      jim.init({
        "appkey": "20a1f8331c8e462116c4d24e",
        "random_str": new_random_str,
        "signature": new_signature,
        "timestamp": new_time,
        "flag": 1,
      }).onSuccess(function (data) {
        //TODO
        console.log('im初始化成功');
        that.globalData.jim = jim;
        jim.login({
          'username': that.globalData.myUser.openId,
          'password': 'ah123456'
        }).onSuccess(function () {
          // wx.showToast({
          //   title: '登录成功',
          // })
          console.log("登录成功");
        }).onFail(function (data) {
          //同上
          console.log(data);
          // wx.showToast({
          //   title: '登录失败',
          // })
          console.log("登录失败");
        });
      }).onFail(function (data) {
        //TODO
        console.log('im初始化失败');
      });
    });

  },

  regist: function () {
    var that = this;
    app.globalData.jim.register({
      'username': result.data.openId,
      'password': 'ah123456',
      'is_md5': false,
      'nickname': app.globalData.userInfo.nickName,
      'media_id': app.globalData.userInfo.avatarUrl,
    }).onSuccess(function (data) {
      //data.code 返回码
      //data.message 描述
      app.globalData.jim.login({
        'username': result.data.openId,
        'password': 'ah123456'
      }).onSuccess(function () {
        wx.showToast({
          title: '登录成功',
        })
        that.toMain();
      }).onFail(function (data) {
        //同上
        console.log(data);
        wx.showToast({
          title: '登录失败',
        })
        that.toMain();
      });
    }).onFail(function (data) {
      // 同上
      if (data.code == 882002) {
        app.globalData.jim.login({
          'username': result.data.openId,
          'password': 'ah123456'
        }).onSuccess(function () {
          wx.showToast({
            title: '登录成功',
          })
          that.toMain();
        }).onFail(function (data) {
          //同上
          console.log(data);
          wx.showToast({
            title: '登录失败',
          })
          that.toMain();
        });
      } else {
        console.log('注册失败');
      }
    });
  },

  init: function () {
    var that = this;
    var iv = app.globalData.res.iv;
    var encryptedData = app.globalData.res.encryptedData;
    wx.login({
      success: info => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: 'https://weixin.ywkedu.com/App/code',
          data: {
            'code': info.code,
            'encryptedData': encryptedData,
            'iv': iv
          },
          success: function (result) {
            console.log(result);
            if (!result.data.openId) {
              // setTimeout(function () {
              //   wx.redirectTo({
              //     url: '../main/main2',
              //   })
              // }, TIME);


              that.init();
              console.log('iv:' + iv);
              console.log('encryptedData:' + encryptedData);
              console.log('code:' + info.code);
              return;
            }
            app.globalData.myUser = result.data;
            console.log(app.globalData.jim.isInit());
            if (!app.globalData.jim || !app.globalData.jim.isInit()) {
              that.initJpush();
            }
            app.globalData.jim.register({
              'username': result.data.openId,
              'password': 'ah123456',
              'is_md5': false,
              'nickname': app.globalData.userInfo.nickName,
              'media_id': app.globalData.userInfo.avatarUrl,
            }).onSuccess(function (data) {
              //data.code 返回码
              //data.message 描述
              app.globalData.jim.login({
                'username': result.data.openId,
                'password': 'ah123456'
              }).onSuccess(function () {
                wx.showToast({
                  title: '登录成功',
                })
                that.getMessage();

              }).onFail(function (data) {
                //同上
                console.log(data);
                wx.showToast({
                  title: '登录失败',
                })
                that.toMain();
              });
            }).onFail(function (data) {
              // 同上
              if (data.code == 882002) {
                app.globalData.jim.login({
                  'username': result.data.openId,
                  'password': 'ah123456'
                }).onSuccess(function () {
                  wx.showToast({
                    title: '登录成功',
                  })
                  that.getMessage();
                }).onFail(function (data) {
                  //同上
                  console.log(data);
                  wx.showToast({
                    title: '登录失败',
                  })
                  that.toMain();
                });
              } else {
                console.log('注册失败');
              }
            });
          },
        })
      }
    })
  },

  toMain: function () {
    wx.hideLoading();
    setTimeout(function () {
      wx.redirectTo({
        url: '../main/main2',
      })
    }, TIME);
  },

  getMessage: function () {
    var that = this;
    app.globalData.jim.onSyncConversation(function (data) {
      console.log("离线消息");
      console.log(data);
      wx.setStorageSync("allMessage", data);
      that.toMain();
    });
    // that.toMain();
  },

  handlerMessage: function (data) {
    var that = this;
    wx.clearStorageSync();
    if (data.length == 0) {
      that.toMain();
      return;
    }

    that.handleText(data);

  },



  handleText: function (data) {
    var that = this;
    for (var index2 in data) {
      for (var index in data[index2].msgs) {
        var item = data[index2].msgs[index];
        try {
          if (!item.content.hasOwnProperty("msg_body") || !item.content.msg_body.extras || !item.content.msg_body.extras.hasOwnProperty("orderId")) {
            continue;
          }
        } catch (e) {
          continue;
        }

        var orderId = item.content.msg_body.extras.orderId;
        item.from_username = item.content.from_id;
        if (orderId) {
          var history = wx.getStorageSync(orderId);
          if (!history || history == '') {
            history = [];
          } else {
            history = history;
          }
          item.content.create_time = util.formatTime(new Date(item.content.create_time));

          history.push(item);
          wx.setStorageSync(orderId, history);
          // console.log('------订单' + orderId + '总消息-----');
          // console.log(history);

        }
      }
      that.toMain();
    }
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