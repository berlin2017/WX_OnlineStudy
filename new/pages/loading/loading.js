// pages/loading/loading.js
var app = getApp();
var TIME = 1000;
var JMessage = require('../../jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('../../jpush/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var that = this;
    if (!app.globalData.res) {
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          app.globalData.res = res
          this.init(app.globalData.res);
        },
        fail: res=>{
          console.log(res);
          that.onReady();
        }
      })
    }else{
      this.init(app.globalData.res);
    }
    
  },

  initJpush:function(){
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
    
  },

  regist:function(){
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
        setTimeout(function () {
          wx.redirectTo({
            url: '../main/main2',
          })
        }, TIME);
      }).onFail(function (data) {
        //同上
        console.log(data);
        wx.showToast({
          title: '登录失败',
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '../main/main2',
          })
        }, TIME);
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
          setTimeout(function () {
            wx.redirectTo({
              url: '../main/main2',
            })
          }, TIME);
        }).onFail(function (data) {
          //同上
          console.log(data);
          wx.showToast({
            title: '登录失败',
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../main/main2',
            })
          }, TIME);
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
            if (!result.data.openId){
              // setTimeout(function () {
              //   wx.redirectTo({
              //     url: '../main/main2',
              //   })
              // }, TIME);


              that.init();
              console.log('iv:'+iv);
              console.log('encryptedData:' + encryptedData);
              console.log('code:' + info.code);
              return;
            }
            app.globalData.myUser = result.data;
            console.log(app.globalData.jim.isInit());
            if (!app.globalData.jim || !app.globalData.jim.isInit()){
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
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../main/main2',
                  })
                }, TIME);
              }).onFail(function (data) {
                //同上
                console.log(data);
                wx.showToast({
                  title: '登录失败',
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../main/main2',
                  })
                }, TIME);
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
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../main/main2',
                    })
                  }, TIME);
                }).onFail(function (data) {
                  //同上
                  console.log(data);
                  wx.showToast({
                    title: '登录失败',
                  })
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../main/main2',
                    })
                  }, TIME);
                });
              }else{
                console.log('注册失败');
              }
            });
          },
        })
      }
    })
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

  }
})