// pages/loading/loading.js
var app = getApp();
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
    var that = this;
    // 调用登录接口
    wx.login({
      success(result) {
        if (result) {
          // util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              // util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    });

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.res) {
      var iv = app.globalData.res.iv;
      var encryptedData = app.globalData.res.encryptedData;
      wx.login({
        success: info => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://weixin.ywkedu.com/App/code',
            data: {
              'code': info.code,
              'encryptedData': encryptedData,
              'iv': iv
            },
            success: function (result) {
              console.log(result);
              app.globalData.myUser = result.data;
              app.globalData.jim.register({
                'username': app.globalData.userInfo.nickName,
                'password': 'ah123456',
                'is_md5': false,
                'extras': app.globalData.userInfo,
              }).onSuccess(function (data) {
                //data.code 返回码
                //data.message 描述
                app.globalData.jim.login({
                  'username': app.globalData.userInfo.nickName,
                  'password': 'ah123456'
                }).onSuccess(function () {
                  wx.showToast({
                    title: '登录成功',
                  })
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../main/main2',
                    })
                  }, 3000);
                }).onFail(function (data) {
                  //同上
                  wx.showToast({
                    title: '登录失败',
                  })
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../main/main2',
                    })
                  }, 3000);
                });
              }).onFail(function (data) {
                // 同上
                if (data.code == 882002) {
                  app.globalData.jim.login({
                    'username': app.globalData.userInfo.nickName,
                    'password': 'ah123456'
                  }).onSuccess(function () {
                    wx.showToast({
                      title: '登录成功',
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../main/main2',
                      })
                    }, 3000);
                  }).onFail(function (data) {
                    //同上
                    wx.showToast({
                      title: '登录失败',
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../main/main2',
                      })
                    }, 3000);
                  });
                }
              });
            },
          })
        }
      })
    } else {
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          app.globalData.res = res
          var iv = res.iv;
          var encryptedData = res.encryptedData;
          wx.login({
            success: info => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: 'https://weixin.ywkedu.com/App/code',
                data: {
                  'code': info.code,
                  'encryptedData': encryptedData,
                  'iv': iv
                },
                success: function (result) {
                  console.log(result);
                  app.globalData.myUser = result.data;
                  app.globalData.jim.register({
                    'username': app.globalData.userInfo.nickName,
                    'password': 'ah123456',
                    'is_md5': false,
                    'extras': result.data.userinfo,
                  }).onSuccess(function (data) {
                    //data.code 返回码
                    //data.message 描述
                    app.globalData.jim.login({
                      'username': app.globalData.userInfo.nickName,
                      'password': 'ah123456'
                    }).onSuccess(function () {
                      wx.showToast({
                        title: '登录成功',
                      })
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../main/main2',
                        })
                      }, 3000);
                    });
                  }).onFail(function (data) {
                    // 同上
                    if (data.code == 882002) {
                      app.globalData.jim.login({
                        'username': app.globalData.userInfo.nickName,
                        'password': 'ah123456'
                      }).onSuccess(function () {
                        wx.showToast({
                          title: '登录成功',
                        })
                        setTimeout(function () {
                          wx.redirectTo({
                            url: '../main/main2',
                          })
                        }, 3000);
                      });
                    }
                  });
                },
              })
            }
          })
        }
      })
    }
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