// pages/test/test.js
var rtcroom = require('../../utils/rtcroom.js');
var getlogininfo = require('../../getlogininfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'聊天室',
    sendType: 0, //发送消息类型，0 文本 1 语音
    messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
    inputValue: '',//文本框输入内容
  },

  inputSend(e) {
    let text = e.detail.value
    if (!text.replace(/^\s*|\s*$/g, '')) return;
    rtcroom.sendRoomTextMsg({
      data: { msg: text },
      success: function (ret) {
        console.log('发送评论成功');

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    rtcroom.init({
      data: ret.data,
      success: options.success,
      fail: options.fail
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    wx.showLoading({
      title: '登录信息获取中',
    })
    getlogininfo.getLoginInfo({
      type: 'double_room',
      success: function (ret) {
        // self.data.firstshow = false;
        // self.data.isGetLoginInfo = true;
        // self.getRoomList();
        console.log('我的昵称：', ret.userName);
        self.setData({
          userName: ret.userName
        });
        wx.hideLoading();
      },
      fail: function (ret) {
        // self.data.isGetLoginInfo = false;
        wx.hideLoading();
        wx.showModal({
          title: '获取登录信息失败',
          content: ret.errMsg,
          showCancel: false,
          complete: function () {
            wx.navigateBack({});
          }
        });
      }
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
  /**
  * 阻止事件冒泡空函数
  */
  stopEventPropagation() {
  },

  /**
  * 切换出emoji键盘
  */
  toggleEmoji() {
    this.setData({
      sendType: 0,
      // focusFlag: this.data.emojiFlag ? true : false,
      emojiFlag: !this.data.emojiFlag,
      moreFlag: false
    })
  },
  /**
   * 切出更多
   */
  toggleMore() {
    this.setData({
      moreFlag: !this.data.moreFlag,
      emojiFlag: false,
      focusFlag: false
    })
  },
  /**
   * 选择相册图片
   */
  chooseImageToSend(e) {
    let type = e.currentTarget.dataset.type
    let self = this
    self.setData({
      moreFlag: false
    })
    wx.chooseImage({
      sourceType: ['album'],
      success: function (res) {
        self.sendImageToNOS(res)
      },
    })
  },
  /**
   * 选择拍摄视频或者照片
   */
  chooseImageOrVideo() {
    let self = this
    self.setData({
      moreFlag: false
    })
    wx.showActionSheet({
      itemList: ['照相', '视频'],
      success: function (res) {
        if (res.tapIndex === 0) { // 相片
          wx.chooseImage({
            sourceType: ['camera'],
            success: function (res) {
              self.sendImageToNOS(res)
            },
          })
        } else if (res.tapIndex === 1) { // 视频
          wx.chooseVideo({
            sourceType: ['camera', 'album'],
            success: function (res) {
              // {duration,errMsg,height,size,tempFilePath,width}
              self.sendVideoToNos(res)
            }
          })
        }
      }
    })
  },
})