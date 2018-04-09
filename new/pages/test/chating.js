
var app = getApp()
Page({
  data: {
    title:'聊天室',
    tipInputValue: '', // tip消息文本框内容
    sendType: 0, //发送消息类型，0 文本 1 语音
    messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
    inputValue: '',//文本框输入内容
  },
  onUnload() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  init: function (){
    // console.log('聊天界面', options)
    // console.log(app.globalData.messageList[app.globalData['loginUser']['account']])
    let chatWrapperMaxHeight = wx.getSystemInfoSync().windowHeight - 52 - 35

    this.setData({
      chatWrapperMaxHeight,
    })
   
  },

  /**
   * 收起所有输入框
   */
  chatingWrapperClick (e) {
    // console.log('chatingWrapperClick')
    this.foldInputArea()
  },
  /**
   * 收起键盘
   */
  foldInputArea() {
    this.setData({
      focusFlag: false,
      emojiFlag: false,
      tipFlag: false,
      moreFlag: false
    })
  },
  /**
   * 阻止事件冒泡空函数
   */
  stopEventPropagation() {
  },
  /**
   * 全屏播放视频
   */
  requestFullScreenVideo (e) {
    let video = e.currentTarget.dataset.video
    // console.log(video)
    let videoContext = wx.createVideoContext('videoEle')
    
    this.setData({
      isVideoFullScreen: true,
      videoSrc: video.url,
      videoContext
    })
    videoContext.requestFullScreen()
    videoContext.play()
  },
  videoEnded () {
    this.setData({
      isVideoFullScreen: false,
      videoSrc: ''
    })
  },
  /**
   * 播放音频
   */
  playAudio(e) {
    // console.log('播放音频触发')
    wx.showToast({
      title: '播放中',
      icon: 'none',
      duration: 120*1000,
      mask: true
    })
    let audio = e.currentTarget.dataset.audio
    const audioContext = wx.createInnerAudioContext()
    if(audio.ext === 'mp3') { // 小程序发送的
      audioContext.src = audio.url
    } else {
      audioContext.src = audio.mp3Url
    }
    audioContext.play()
    audioContext.onPlay(() => {
    })
    audioContext.onEnded(() => {
      wx.hideToast()
    })
    audioContext.onError((res) => {
      wx.showToast({
        title: res.errCode,
        icon: 'none',
        duration: 1500
      })
    })
  },
  /**
   * 展示编辑菜单
   */
  showEditorMenu (e) {
    console.log('长按了')
    let message = e.currentTarget.dataset.message
    // console.log('消息是',message)
    if(message.type === 'tip') {
      return
    }
    let paraObj = {
      time: message.time,
      chatTo: this.data.chatTo
    }
    let self = this
    if (message.sendOrReceive === 'send') { // 自己消息
      wx.showActionSheet({
        itemList: ['删除', '转发', '撤回'],
        success: function (res) {
          switch (res.tapIndex) {
            case 0:
              self.deleteMessageRecord(message)
              break
            case 1:
              self.forwardMessage(paraObj)
              break
            case 2:
              wx.showActionSheet({
                itemList: ['确定'],
                itemColor: '#ff0000',
                success: function(res) {
                  if(res.tapIndex === 0) {
                    self.recallMessage(message)
                  }
                }
              })
              break
            default:
              break
          }
        }
      })
    } else {// 对方消息
      wx.showActionSheet({
        itemList: ['删除', '转发'],
        success: function (res) {
          switch (res.tapIndex) {
            case 0:
              self.deleteMessageRecord(message)
              break
            case 1:
              self.forwardMessage(paraObj)
              break
            default:
              break
          }
        }
      })
    }
  },
  /**
   * 转发消息
   */
  forwardMessage(paramObj) {
    let str = encodeURIComponent(JSON.stringify(paramObj))
    wx.redirectTo({
      url: '../forwardcontact/forwardcontact?data='+str,
    })
  },
  /**
   * 撤回消息
   */
  recallMessage (message) {
    console.log('撤回消息', message)
    let self = this
    let from = app.globalData['loginUser']['account']
    let to = self.data.chatTo
    let rawMessage = app.globalData.rawMessageList[to][message.time]
    console.log('撤回消息', rawMessage)    
    app.globalData.nim.deleteMsg({
      msg: rawMessage,
      done: function(err, {msg}) {
        if(err){ // 撤回失败
          console.log(err)
          wx.showToast({
            title: '消息已超过2分钟，不能撤回',
            icon: 'none',
            duration: 1500
          })
          return
        } else {// 撤回成功
          // 刷新界面
          let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
          let messageArr = [...self.data.messageArr]
          let pos = null
          
          messageArr.map((item, index) => {
            let type = ''
            if (item.type == '贴图表情' || item.type == '猜拳') {
              type = 'custom'
            } else {
              type = item.type
            }
            if(item.time === msg.time && msg.type === type) {
              pos = index
            }
          })
          // console.log('撤回消息', messageArr)    
          // console.log('撤回消息', pos)    
          messageArr[pos] = {
            text: '',
            type: 'tip',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            nodes: [{
              type: 'text',
              text: '你撤回了一条消息'
            }]
          }
          console.log('撤回消息', messageArr)   
          self.setData({
            messageArr
          })

          // 替换 全局 并 存储到最近会话列表中
          self.replaceMsgToGlobalAndRecent(msg, {
            from: msg.from,
            to: msg.to,
            type: 'tip',
            scene: msg.scene,
            tip: '你撤回了一条消息',
            text: msg.text,
            sendOrReceive: 'send',
            displayTimeHeader
          })

          app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: '', type: 'tip' }, true)
          // 滚动到底部
          self.scrollToBottom()
        }
      }
    })
  },
  /**
   * 删除消息
   * {displayTimeHeader,nodes,sendOrReceive,text,time,type}
   */
  deleteMessageRecord(msg) {
    // console.log('删除')
    let deleteIndex = null
    let messageArr = [...this.data.messageArr]
    // 从当前界面删除
    messageArr.map((item, index) => {
      if(item.time === msg.time && item.text === msg.text) {
        deleteIndex = index
        return
      }
    })
    if (!deleteIndex && deleteIndex !== 0) {
      wx.showToast({
        title: '删除出错了！',
        icon: 'none',
        duration: 1500
      })
    } else {
      messageArr.splice(deleteIndex, 1)
      this.setData({
        messageArr
      })
    }
    // 从全局记录中删除
    let loginUserAccount = app.globalData['loginUser']['account']
    let chatToMessageList = app.globalData.messageList[loginUserAccount][this.data.chatTo]
    delete chatToMessageList[msg.time]
    // 从最近会话列表中删除
    let recentChatToList = app.globalData.recentChatList[this.data.chatTo]
    // 发送消息，重新渲染最近会话列表
    let isFirstRecent = false
    if (Object.keys(recentChatToList).indexOf(msg.time+'') === (Object.keys(recentChatToList).length-1)) { //是否是最新消息
      isFirstRecent = true
    }
    // 删除记录
    delete recentChatToList[msg.time]
    // 发送消息，重新渲染最近会话列表
    let account = this.data.chatTo
    if (Object.keys(recentChatToList).length === 0) { // 删空了，删除条目
      app.globalData.subscriber.emit('DELETE_RECENT_CHAT_ITEM', { account, time: msg.time})
    }
    if (isFirstRecent && Object.keys(recentChatToList).length !== 0) { // 在多条记录中，删除最新记录
      // account, time, text, type
      let lastMsg = recentChatToList[Object.keys(recentChatToList)[0]]
      // console.log(lastMsg)
      // 将下一条记录更新上去
      app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account, time: Object.keys(recentChatToList)[0], text: lastMsg.text, type: lastMsg.type }, true) 
    }
  },
  /**
   * 重新计算时间头
   */
  reCalcAllMessageTime() {
    let tempArr = [...this.data.messageArr]
    if(tempArr.length == 0) return
    // 计算时差
    tempArr.map((msg, index) => {
      if (index === 0) {
        msg['displayTimeHeader'] = calcTimeHeader(msg.time)
      } else {
        let delta = (msg.time - tempArr[index-1].time) / (120 * 1000)
        if (delta > 1) { // 距离上一条，超过两分钟重新计算头部
          msg['displayTimeHeader'] = calcTimeHeader(msg.time)
        }
      }
    })
    this.setData({
      messageArr: tempArr
    })
  },
  /**
   * 切换发送文本类型
   */
  switchSendType() {
    this.setData({
      sendType: this.data.sendType == 0 ? 1 : 0,
      focusFlag: false,
      emojiFlag: false
    })
  },
  /**
   * 输入事件
   */
  inputChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 发送文本
   */
  inputSend(e) {
    let text = e.detail.value
    this.sendRequest(text)
  },
  /**
   * 获取焦点
   */
  inputFocus(e) {
    this.setData({
      emojiFlag: false,
      focusFlag: true
    })
  },
  /**
   * 失去焦点
   */
  inputBlur() {
    this.setData({
      focusFlag: false
    })
  },
  /**
   * tip输入
   */
  tipInputChange(e) {
    this.setData({
      tipInputValue: e.detail.value
    })
  },
  /**
   * 组件按钮回调
   */
  tipClickHandler(e) {
    let data = e.detail.data
    if (data === 'confirm') {
      if (this.data.tipInputValue.length === 0) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
      } else {
        this.tipInputConfirm()
        this.setData({
          tipFlag: false
        })
      }
    } else if (data === 'cancel') {
      this.setData({
        tipFlag: false
      })
    }
  },
  /**
   * 微信按钮长按，有bug，有时候不触发
   */
  voiceBtnLongTap(e) {
    // console.log('长按开始', new Date().getTime())
    let self = this
    self.setData({
      isLongPress: true
    })
    // console.log('长按按钮')
    wx.getSetting({
      success: (res) => {
        let recordAuth = res.authSetting['scope.record']
        if (recordAuth == false) { //已申请过授权，但是用户拒绝
          wx.openSetting({
            success: function(res) { 
              let recordAuth = res.authSetting['scope.record']
              if (recordAuth == true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '请授权录音',
                  icon: 'none',
                  duration: 2000
                })
              }
              self.setData({
                isLongPress: false
              })
            }
          })    
        } else if(recordAuth == true) { // 用户已经同意授权
          self.startRecord()
        } else { // 第一次进来，未发起授权
          wx.authorize({
            scope: 'scope.record',
            success: () => {//授权成功
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '鉴权失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 手动模拟按钮长按，
   */
  longPressStart() {
    let self = this
    self.setData({
      recordClicked: true
    })
    setTimeout(() => {
      if (self.data.recordClicked == true) {
        self.executeRecord()
      }
    }, 350)
  },
  /**
   * 语音按钮长按结束
   */
  longPressEnd() {
    this.setData({
      recordClicked: false
    })
    // 第一次授权，
    if (!this.data.recorderManager) {
      this.setData({
        isLongPress: false
      })
      return
    }
    if (this.data.isLongPress === true) {
      this.setData({
        isLongPress: false
      })
      wx.hideToast()
      this.data.recorderManager.stop()
    } 
  },
  /**
   * 执行录音逻辑
   */
  executeRecord() {
    let self = this
    self.setData({
      isLongPress: true
    })
    // console.log('长按按钮')
    wx.getSetting({
      success: (res) => {
        let recordAuth = res.authSetting['scope.record']
        if (recordAuth == false) { //已申请过授权，但是用户拒绝
          wx.openSetting({
            success: function (res) {
              let recordAuth = res.authSetting['scope.record']
              if (recordAuth == true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '请授权录音',
                  icon: 'none',
                  duration: 2000
                })
              }
              self.setData({
                isLongPress: false
              })
            }
          })
        } else if (recordAuth == true) { // 用户已经同意授权
          self.startRecord()
        } else { // 第一次进来，未发起授权
          wx.authorize({
            scope: 'scope.record',
            success: () => {//授权成功
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '鉴权失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 开始录音
   */
  startRecord () {
    let self = this
    wx.showToast({
      title: '开始录音',
      duration: 120000
    })
    const recorderManager = self.data.recorderManager || wx.getRecorderManager()
    const options = {
      duration: 120 * 1000,
      format: 'mp3'
    }
    recorderManager.start(options)
    self.setData({
      recorderManager
    })
    recorderManager.onStop((res) => {
      // console.log('recorder stop', res)
      if (res.duration < 2000) {
        wx.showToast({
          title: '录音时间太短',
          duration: 1500,
          icon: 'none'
        })
      } else {
        self.sendAudioMsg(res)
      }
    })
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
  toggleMore () {
    this.setData({
      moreFlag: !this.data.moreFlag,
      emojiFlag: false,
      focusFlag: false
    })
  },
  /**
   * 选择相册图片
   */
  chooseImageToSend (e) {
    let type = e.currentTarget.dataset.type
    let self = this
    self.setData({
      moreFlag: false
    })
    wx.chooseImage({
      sourceType: ['album'],
      success: function(res) {
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
      success: function(res) {
        if (res.tapIndex === 0) { // 相片
          wx.chooseImage({
            sourceType: ['camera'],
            success: function (res) {
              self.sendImageToNOS(res)
            },
          })
        } else if (res.tapIndex === 1){ // 视频
          wx.chooseVideo({
            sourceType: ['camera', 'album'],
            success: function(res) {
              // {duration,errMsg,height,size,tempFilePath,width}
              self.sendVideoToNos(res)
            }
          })
        }
      }
    })
  },
  /**
   * 调出tip发送面板
   */
  sendTipMessage () {
    this.setData({
      tipFlag: true,
      moreFlag: false
    })
  },
  /**
   * 选取位置
   */
  choosePosition () {
    let self = this
    self.setData({
      moreFlag: false
    })
    wx.getSetting({
      success: (res) => {
        let auth = res.authSetting['scope.userLocation']
        if (auth == false) { //已申请过授权，但是用户拒绝
          wx.openSetting({
            success: function (res) {
              if (res.authSetting['scope.userLocation'] == true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '请授权地理位置',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else if (auth == true) { // 用户已经同意授权
          self.callSysMap()
        } else { // 第一次进来，未发起授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {//授权成功
              self.callSysMap()
            }
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '鉴权失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 调用系统地图界面
   */
  callSysMap () {
    let self = this
    wx.chooseLocation({
      success: function (res) {
        let { address, latitude, longitude} = res
        // console.log(res)
        self.sendPositionMsg(res)
      },
    })
  },
  /**
   * 查看云端历史消息
   */
  lookHistoryMessage() {
    let self = this
    // TODO:二级页面
    wx.showActionSheet({
      itemList: ['清空本地聊天记录', '查看云消息记录'],
      success: (res) => {
        if (res.tapIndex == 0) {//清空本地聊天记录
        wx.showActionSheet({//二次确认
          itemList: ['清空'],
          itemColor: '#f00',
          success: (res) => {
            if(res.tapIndex == 0) {
              self.clearAllMessage()
            }
          }
        })
        } else if (res.tapIndex == 1) {//查看云消息记录
          wx.navigateTo({
            url: `../historyfromcloud/historyfromcloud?account=${self.data.chatTo}&chatToLogo=${encodeURIComponent(self.data.chatToLogo)}`,
          })
        }
      }
    })
  },
  /**
   * 清除本地记录
   */
  clearAllMessage() {
    // 刷新本地视图
    this.setData({
      messageArr: []
    })
    // 删除全局数据
    let loginUserAccount = app.globalData.loginUser.account
    delete app.globalData.messageList[loginUserAccount][this.data.chatTo]
    delete app.globalData.recentChatList[this.data.chatTo]
  },
  /**
   * emoji组件回调
   */
  emojiCLick(e) {
    let val = e.detail
    // 单击删除按钮，，删除emoji
    if(val == '[删除]') {
      let lastIndex = this.data.inputValue.lastIndexOf('[')
      if(lastIndex != -1) {
        this.setData({
          inputValue: this.data.inputValue.slice(0, lastIndex)
        })
      }
      return
    }
    if(val[0] == '[') { // emoji
      this.setData({
        inputValue: this.data.inputValue + val
      })
    } else {//大图
      this.sendBigEmoji(val)
    }
  },
  /**
   * emoji点击发送
   */
  emojiSend(e) {
    let val = this.data.inputValue
    this.sendRequest(val)
    this.setData({
      emojiFlag: false
    })
  },
  /**
   * 查看全屏地图
   */
  fullScreenMap(e) {
    let geo = e.currentTarget.dataset.geo
    wx.openLocation({
      latitude: geo.lat,
      longitude: geo.lng,
    })
  },
  /**
   * 发送大的emoji:实际上是type=3的自定义消息
   * {"type":3,"data":{"catalog":"ajmd","chartlet":"ajmd010"}}
   */
  sendBigEmoji(val) {
    wx.showLoading({
      title: '发送中...',
    })
    let self = this
    let catalog = ''
    if(val[0] === 'a') {
      catalog = 'ajmd'
    } else if(val[0] === 'x') {
      catalog = 'xxy'
    } else if(val[0] === 'l') {
      catalog = 'lt'
    }
    let content = {
      type: 3,
      data: {
        catalog, 
        chartlet: val
      }
    }
    app.globalData.nim.sendCustomMsg({
      scene: 'p2p',
      to: self.data.chatTo,
      content: JSON.stringify(content),
      done: function (err, msg) {
        wx.hideLoading()
        // 判断错误类型，并做相应处理
        if (self.handleErrorAfterSend(err)) {
          return
        }
        // 刷新界面
        let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
        self.setData({
          messageArr: [...self.data.messageArr, {
            text: '',
            type: '贴图表情',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            nodes: generateImageNode(generateBigEmojiImageFile(JSON.parse(msg.content)))
          }]
        })

        // 存储到全局 并 存储到最近会话列表中
        self.saveMsgToGlobalAndRecent(msg, {
          from: msg.from,
          to: msg.to,
          type: '贴图表情',
          scene: msg.scene,
          text: msg.text,
          sendOrReceive: 'send',
          content: msg.content,
          displayTimeHeader
        })
        app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: '贴图表情' }, true)
        // 隐藏发送栏
        self.setData({
          focusFlag: false,
          emojiFlag: false,
          tipFlag: false,
          moreFlag: false
        })
        // 滚动到底部
        self.scrollToBottom()
      }
    })
  },
  /**
   * 发送自定义消息-猜拳
   */
  sendFingerGuess() {
    let self = this
    self.setData({
      moreFlag: false
    })
    let content = {
      type: 1,
      data: {
        value: Math.ceil(Math.random() * 3)
      }
    }
    app.globalData.nim.sendCustomMsg({
      scene: 'p2p',
      to: self.data.chatTo,
      content: JSON.stringify(content),
      done: function (err, msg) {
        // 判断错误类型，并做相应处理
        if (self.handleErrorAfterSend(err)) {
          return
        }
        // 刷新界面
        let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
        self.setData({
          messageArr: [...self.data.messageArr, {
            text: '',
            type: '猜拳',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            nodes: generateImageNode(generateFingerGuessImageFile(JSON.parse(msg.content).data.value))
          }]
        })

        // 存储到全局 并 存储到最近会话列表中
        self.saveMsgToGlobalAndRecent(msg, {
          from: msg.from,
          to: msg.to,
          type: '猜拳',
          scene: msg.scene,
          text: msg.text,
          sendOrReceive: 'send',
          content: msg.content,
          displayTimeHeader
        })

        app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: '猜拳' }, true)
        // 滚动到底部
        self.scrollToBottom()
      }
    })
  },
  /**
 * 点击发送tip按钮
 */
  tipInputConfirm() {
    let self = this
    if (self.data.tipInputValue.length !== 0) {
      app.globalData.nim.sendTipMsg({
        scene: 'p2p',
        to: self.data.chatTo,
        tip: self.data.tipInputValue,
        done: function (err, msg) {
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // console.log(msg)
          // 刷新界面
          let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
          self.setData({
            tipInputValue: '',
            tipFlag: false,
            messageArr: [...self.data.messageArr, {
              text: '',
              type: 'tip',
              time: msg.time,
              sendOrReceive: 'send',
              displayTimeHeader,
              nodes: [{
                type: 'text',
                text: msg.tip
              }]
            }]
          })

          // 存储到全局 并 存储到最近会话列表中
          self.saveMsgToGlobalAndRecent(msg, {
            from: msg.from,
            to: msg.to,
            type: msg.type,
            scene: msg.scene,
            tip: msg.tip,
            text: msg.text,
            sendOrReceive: 'send',
            displayTimeHeader
          })

          app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: msg.type }, true)
          // 滚动到底部
          self.scrollToBottom()
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
    }
  },
  /**
   * 发送语音消息
   */
  sendAudioMsg (res) {
    wx.showLoading({
      title: '发送中...',
    })
    let tempFilePath = res.tempFilePath
    let self = this
    // console.log(tempFilePath)
    app.globalData.nim.sendFile({
      scene: 'p2p',
      to: self.data.chatTo,
      type: 'audio',
      wxFilePath: tempFilePath,
      done: function (err, msg) {
        wx.hideLoading()
        // 判断错误类型，并做相应处理
        if (self.handleErrorAfterSend(err)) {
          return
        }
        // console.log(msg)
        // 刷新界面
        let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
        self.setData({
          messageArr: [...self.data.messageArr, {
            type: 'audio',
            text: '',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            audio: msg.file
          }]
        })

        // 存储到全局 并 存储到最近会话列表中
        self.saveMsgToGlobalAndRecent(msg, {
          from: msg.from,
          to: msg.chatTo,
          type: msg.type,
          scene: msg.scene,
          text: msg.text,
          file: msg.file,
          sendOrReceive: 'send',
          displayTimeHeader
        })
        app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: msg.type }, true)
        // 滚动到底部
        self.scrollToBottom()
      }
    })
  },
  /**
   * 发送位置消息
   */
  sendPositionMsg(res) {
    let self = this
    let { address, latitude, longitude } = res
    app.globalData.nim.sendGeo({
      scene: 'p2p',
      to: self.data.chatTo,
      geo: {
        lng: longitude,
        lat: latitude,
        title: address
      },
      done: function(err, msg) {
        // 判断错误类型，并做相应处理
        if (self.handleErrorAfterSend(err)) {
          return
        }
        // console.log(msg)
        // 刷新界面
        let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
        self.setData({
          messageArr: [...self.data.messageArr, {
            type: 'geo',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            geo: Object.assign({}, msg.geo)
          }]
        })

        // 存储到全局 并 存储到最近会话列表中
        self.saveMsgToGlobalAndRecent(msg, {
          from: msg.from,
          to: msg.chatTo,
          type: msg.type,
          scene: msg.scene,
          text: msg.text,
          geo: msg.geo,
          sendOrReceive: 'send',
          displayTimeHeader
        })
        app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: msg.type }, true)
        // 滚动到底部
        self.scrollToBottom()
      }
    })
  },
  /**
   * 发送网络请求：发送文字
   */
  sendRequest(text) {
    app.globalData.jim.sendSingleMsg({
      'target_username': 'berlin',
      'target_nickname': 'berlin1',
      'content': '哈哈',
      'appkey': '20a1f8331c8e462116c4d24e',
    }).onSuccess(function (data, msg) {
      //data.code 返回码
      //data.message 描述
      //data.msg_id 发送成功后的消息 id
      //data.ctime_ms 消息生成时间,毫秒
      //data.appkey 用户所属 appkey
      //data.target_username 用户名
      //msg.content 发送成功消息体,见下面消息体详情
      wx.showToast({
        title: 'success',
      })
      app.globalData.jim.updateConversation({
        'appkey': '20a1f8331c8e462116c4d24e',
        'username': 'berlin1',
      });
    }).onFail(function (data) {
      //data.code 返回码
      //data.message 描述
      wx.showToast({
        title: 'fail',
      })
    });
  },
  /**
   * 发送视频文件到nos
   */
  sendVideoToNos(res) {
    wx.showLoading({
      title: '发送中...',
    })
    // {duration,errMsg,height,size,tempFilePath,width}
    let self = this
    let tempFilePath = res.tempFilePath
    // 上传文件到nos
    app.globalData.nim.sendFile({
      type: 'video',
      scene: 'p2p',
      to: self.data.chatTo,
      wxFilePath: tempFilePath,
      done: function (err, msg) {
        wx.hideLoading()
        // file: {dur, ext,h,md5,name,size,url,w}
        // 判断错误类型，并做相应处理
        if (self.handleErrorAfterSend(err)) {
          return
        }
        // console.log(msg)
        // 刷新界面
        let displayTimeHeader = self.judgeOverTwoMinute(msg.time)
        self.setData({
          messageArr: [...self.data.messageArr, {
            type: 'video',
            text: '',
            time: msg.time,
            sendOrReceive: 'send',
            displayTimeHeader,
            video: msg.file
          }]
        })

        // 存储到全局 并 存储到最近会话列表中
        self.saveMsgToGlobalAndRecent(msg, {
          from: msg.from,
          to: msg.chatTo,
          type: msg.type,
          scene: msg.scene,
          text: msg.text,
          file: msg.file,
          sendOrReceive: 'send',
          displayTimeHeader
        })
        
        app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: msg.type }, true)
        // 滚动到底部
        self.scrollToBottom()
      }
    })
  },
  /**
   * 发送图片到nos
   */
  sendImageToNOS(res) {
    wx.showLoading({
      title: '发送中...',
    })
    let self = this
    let tempFilePaths = res.tempFilePaths
    for (let i = 0; i < tempFilePaths.length; i++) {
      // 上传文件到nos
      app.globalData.nim.sendFile({
      // app.globalData.nim.previewFile({
        type: 'image',
        scene: 'p2p',
        to: self.data.chatTo,
        wxFilePath: tempFilePaths[i],
        done: function (err, msg) {
          wx.hideLoading()
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // console.log(msg)
          // 刷新界面
          let displayTimeHeader = ''
          if(i === 0) { // 只计算第一张图片
            displayTimeHeader = self.judgeOverTwoMinute(msg.time)
          }
          self.setData({
            messageArr: [...self.data.messageArr, {
              type: 'image',
              text: '',
              time: msg.time,
              sendOrReceive: 'send',
              displayTimeHeader,
              nodes: generateImageNode(msg.file)
            }]
          })

          // 存储到全局 并 存储到最近会话列表中
          self.saveMsgToGlobalAndRecent(msg, {
            from: msg.from,
            to: msg.chatTo,
            type: msg.type,
            scene: msg.scene,
            text: msg.text,
            file: msg.file,
            sendOrReceive: 'send',
            displayTimeHeader
          })
          app.globalData.subscriber.emit('UPDATE_RECENT_CHAT', { account: msg.to, time: msg.time, text: msg.text, type: msg.type }, true)
          // 滚动到底部
          self.scrollToBottom()
        }
      })
    }
    
  },
  /**
   * 替换消息内容：目的显示撤回消息
   */
  replaceMsgToGlobalAndRecent(msg, data) {
    let self = this
    // 存储到全局 并 存储到最近会话列表中
    let loginUserAccount = app.globalData['loginUser']['account']
    let loginMessageList = app.globalData.messageList[loginUserAccount]
    loginMessageList[self.data.chatTo][msg.time] = data
    app.globalData.recentChatList[self.data.chatTo][msg.time] = data

    let modifyMessage = deepClone(msg)
    modifyMessage.type = data.type
    modifyMessage.tip = data.tip
    app.globalData.rawMessageList[self.data.chatTo][msg.time] = modifyMessage
    // console.log(app.globalData.rawMessageList)
  },
  /**
   * 存储消息到全局 以及 最近会话列表
   */
  saveMsgToGlobalAndRecent(msg, data) {
    let self = this
    // 存储到全局 并 存储到最近会话列表中
    let loginUserAccount = app.globalData['loginUser']['account']
    let loginMessageList = app.globalData.messageList[loginUserAccount]
    if (!loginMessageList[self.data.chatTo]) {
      loginMessageList[self.data.chatTo] = {} //开始未收到任何消息
      app.globalData.recentChatList[self.data.chatTo] = {}
    }
    loginMessageList[self.data.chatTo][msg.time] = data
    app.globalData.recentChatList[self.data.chatTo][msg.time] = data

    app.globalData.rawMessageList[self.data.chatTo] = app.globalData.rawMessageList[self.data.chatTo] || {}
    app.globalData.rawMessageList[self.data.chatTo][msg.time] = deepClone(msg)
  },
  /**
   * 距离上一条消息是否超过两分钟
   */
  judgeOverTwoMinute(time) {
    let displayTimeHeader = ''
    let lastMessage = this.data.messageArr[this.data.messageArr.length - 1]
    if (lastMessage) {//拥有上一条消息
      let delta = time - lastMessage.time
      if (delta > 2 * 60 * 1000) {//两分钟以上
        displayTimeHeader = calcTimeHeader(time)
      }
    } else {//没有上一条消息
      displayTimeHeader = calcTimeHeader(time)
    }
    return displayTimeHeader
  },
  /**
   * 切换到个人介绍页
   */
  switchToMyTab() {
    wx.switchTab({
      url: '../../pages/setting/setting',
    })
  },
  /**
   * 切换到对方介绍页
   */
  switchPersonCard() {
    let account = this.data.chatTo
    // 重定向进入account介绍页
    clickLogoJumpToCard(account, false)
  },
  /**
   * 统一发送消息后打回的错误信息
   * 返回true表示有错误，false表示没错误
   */
  handleErrorAfterSend(err) {
    if (err) {
      if(err.code == 7101) {
        wx.showToast({
          title: '你已被对方拉黑',
          icon: 'none',
          duration: 1500
        })
      }
      console.log(err)
      return true
    }
    return false
  },
  back: function () {
    wx.navigateBack({

    })
  },
})