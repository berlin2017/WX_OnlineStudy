// pages/loading/loading.js
var app = getApp();
var TIME = 1000;
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
    // var that = this;
    // // 调用登录接口
    // wx.login({
    //   success(result) {
    //     if (result) {
    //       // util.showSuccess('登录成功')
    //       that.setData({
    //         userInfo: result,
    //         logged: true
    //       })
    //     } else {
    //       // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
    //       qcloud.request({
    //         url: config.service.requestUrl,
    //         login: true,
    //         success(result) {
    //           // util.showSuccess('登录成功')
    //           that.setData({
    //             userInfo: result.data.data,
    //             logged: true
    //           })
    //         },

    //         fail(error) {
    //           wx.showModal({
    //             title: '请求失败',
    //             content: '请求失败',
    //             success: function (res) {
    //               if (res.confirm) {
    //                 console.log('用户点击确定')
    //                 // that.init();
    //               } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //               }
    //             }
    //           })
    //           console.log('request fail', error)
    //         }
    //       })
    //     }
    //   },

    //   fail(error) {
    //     wx.showModal({
    //       title: '登录失败',
    //       content: '登录失败',
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //           // that.init();
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })
    //     console.log('登录失败', error)
    //   }
    // });


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