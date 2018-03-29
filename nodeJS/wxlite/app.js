//app.js

var qcloud = require('./lib/index');

App({
  onLaunch: function () {
    // 展示本地存储能力
    // qcloud.setLoginUrl(config.url + 'getwxinfo');
    // qcloud.setLoginUrl(config.url + 'login');

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  editTabBar: function () {
    var tabbar = this.globalData.tabbar,
      currentPages = getCurrentPages(),
      _this = currentPages[currentPages.length - 1],
      pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    tabbar: {
      color: "#000000",
      selectedColor: "#8E388E",
      backgroundColor: "#ffffff",
      borderStyle: "gainsboro",
      list: [
        {
          "pagePath": "main",
          "text": "首页",
          "iconPath": "../Resources/ic_tab_home.png",
          "selectedIconPath": "pages/Resources/ic_tab_home_light.png"
        },
        {
          "pagePath": "myStudent",
          "text": "我的学生",
          "iconPath": "../Resources/ic_tab_myteacher.png",
          "selectedIconPath": "pages/Resources/ic_tab_myteacher.png"
        },
        {
          "pagePath": "myClass",
          "text": "我的课程",
          "iconPath": "../Resources/ic_tab_home.png",
          "selectedIconPath": "pages/Resources/ic_tab_home_light.png"
        },
        {
          "pagePath": "user",
          "text": "我的",
          "iconPath": "../Resources/ic_tab_user.png",
          "selectedIconPath": "pages/Resources/ic_tab_user_light.png"
        }
      ],
      position: "bottom"
    }
  }  

})