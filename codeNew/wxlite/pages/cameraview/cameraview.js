// pages/localview/localview.js
var rtcroom = require('../../utils/rtcroom.js');
var config = require('../../config.js');

Component({
  properties: {
    // 房间id
    roomid: { type: String, value: '' },
    // 房间名称
    roomname: { type: String, value: 'roomname' },
    // 用户名称
    username: { type: String, value: '' },
    // 类型：create/enter
    role: { type: String, value: 'enter' },
    // 推流code
    event: { type: Number, value: 0, observer: function (newVal, oldVal) { this.onPush(newVal); } },
    // 评论信息
    message: { type: String, value: '', observer: function (newVal, oldVal) { this.sendRoomTextMsg(newVal); } },
    // 推流配置
    config: { type: Object, value: {}, observer: function (newVal, oldVal) { this.setConfig(newVal, oldVal); } },
    // 样式
    styles: { type: Object, value: {} }
  },
  data: {
    pusherContext: '',  // 推流context
    pushURL: '',        // 推流地址
    members: [],        // 成员信息
    isInRoom: false,    // 是否已经进入房间
  },
  methods: {
    // 设置推流配置
    setConfig: function (newVal, oldVal) {
      // 切换摄像头
      if (this.data.pusherContext && newVal.camera != oldVal.camera) {
        this.data.pusherContext.switchCamera({});
      }
      // 视频操作
      if (this.data.pusherContext && newVal.operate != oldVal.operate) {
        switch (newVal.operate) {
          case 'start': {
            this.data.pusherContext.start(); break;
          }
          case 'stop': {
            this.data.pusherContext.stop(); break;
          }
          case 'pause': {
            this.data.pusherContext.pause(); break;
          }
          case 'resume': {
            this.data.pusherContext.resume(); break;
          }
        }
      }
      this.setData({
        config: newVal
      });
    },
    // 初始化操作
    init: function () {
      // 重置用户名，因为一开始用户名是空的
      this.setData({
        username: this.data.username
      });
      this.getPushURL();
    },
    // 获取推流地址
    getPushURL: function () {
      var self = this;
      rtcroom.getPushURL({
        success: function (ret) {
          self.setData({
            pushURL: ret.pushURL
          });
          self.setListener();
          self.data.role == 'enter' && self.enterRoom();
          // 小程序开发工具测试代码
          // self.data.role == 'enter' && self.joinPusher();
          // self.data.role == 'create' && self.createRoom();
        },
        fail: function (ret) {
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: ret.errCode,
            errMsg: ret.errMsg
          }, {});
        }
      });
    },
    // 进入房间
    enterRoom: function () {
      var self = this;
      rtcroom.enterRoom({
        data: { roomID: self.data.roomid },
        success: function () { },
        fail: function (ret) {
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: ret.errCode,
            errMsg: ret.errMsg
          }, {});
        }
      });
    },
    // 加入推流
    joinPusher: function() {
      var self = this;
      rtcroom.joinPusher({
        data: {
          roomID: self.data.roomid,
          pushURL: self.data.pushURL
        },
        success: function (ret) {
          wx.hideLoading();
        },
        fail: function (ret) {
          wx.hideLoading();
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: ret.errCode,
            errMsg: ret.errMsg
          }, {});
        }
      });
    },
    // 创建房间
    createRoom: function () {
      var self = this;
      rtcroom.createRoom({
        data: {
          roomName: self.data.roomname,
          pushURL: self.data.pushURL
        },
        success: function (ret) {
          // 创建房间成功之后操作
          wx.hideLoading();
        },
        fail: function (ret) {
          wx.hideLoading();
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: ret.errCode,
            errMsg: ret.errMsg
          }, {});
        }
      });
    },
    // 退出房间
    exitRoom: function() {
      rtcroom.exitRoom({});
    },
    // 推流事件 
    onPush: function(e) {
      var self = this;
      if (!self.data.pusherContext) {
        self.data.pusherContext = wx.createLivePusherContext('rtcpusher');
      }
      var code;
      if (e.detail) {
        code = e.detail.code;
      } else {
        code = e;
      }
      console.log('推流情况：', code);
      switch (code) {
        case 1002: {
          if (!self.data.isInRoom) {
            self.setData({ isInRoom: true });
            if (self.data.role == 'enter') {
              self.joinPusher();
            } else {
              self.createRoom();
            }
          }
          break;
        }
        case -1301: {
          console.log('打开摄像头失败: ', code);
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '打开摄像头失败，请再次尝试'
          }, {});
          break;
        }
        case -1302: {
          console.log('打开麦克风失败: ', code);
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '打开麦克风失败，请再次尝试'
          }, {});
          break;
        }
        case -1307: {
          console.log('推流连接断开: ', code);
          // 推流连接断开就做退房操作
          self.exitRoom();
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '推流已断开，请检查网络状态后重试'
          }, {});
          break;
        }
        case 5000: {
          console.log('收到5000: ', code);
          // 收到5000就退房
          self.exitRoom();
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: 5000,
            errMsg: '你已退出'
          }, {});
          break;
        }
        default: {
          // console.log('推流情况：', code);
        }
      }
    },
    // 标签错误处理
    onError: function(e) {
      var self = this;
      console.log('错误处理',e);
      e.detail.errCode == 10001 ? (e.detail.errMsg = '未获取到摄像头功能权限，请删除小程序后重新打开') : '';
      e.detail.errCode == 10002 ? (e.detail.errMsg = '未获取到录音功能权限，请删除小程序后重新打开') : '';
      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onFail',
        errCode: e.detail.errCode,
        errMsg: e.detail.errMsg || '未获取到摄像头、录音功能权限，请删除小程序后重新打开'
      }, {});
    },
    // 发送评论
    sendRoomTextMsg: function(msg) {
      // 评论为空则不发布，trim评论信息
      if (!msg.replace(/^\s*|\s*$/g, '')) return;
      rtcroom.sendRoomTextMsg({
        data: { msg: msg },
        success: function (ret) {
          console.log('发送评论成功');
         
        }
      });
    },
    // 设置监听函数
    setListener: function () {
      var self = this;
      rtcroom.setListener({
        onGetPusherList: self.onGetPusherList.bind(self),
        onPusherJoin: self.onPusherJoin.bind(self),
        onPhserQuit: self.onPhserQuit.bind(self),
        onRoomClose: self.onRoomClose.bind(self),
        onRecvRoomTextMsg: self.onRecvRoomTextMsg.bind(self)
      });
    },
    // 初始化成员列表
    onGetPusherList: function (ret) {
      var self = this;
      console.log('初始化成员列表: ', ret);
      // 保存信息
      self.data.members = ret.pushers;
      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onGetMemberList',
        members: self.data.members
      }, {});
    },
    // 有人进群通知
    onPusherJoin: function (ret) {
      var self = this;
      console.log('收到进房消息：', ret);
      self.data.members.concat(ret.pushers);

      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onMemberJoin',
        members: ret.pushers
      }, {});
    
    },
    // 有人退群通知
    onPhserQuit: function (ret) {
      var self = this;
      console.log('收到进房消息：', ret);
      self.data.members.concat(ret.pushers);

      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onMemberQuit',
        members: ret.pushers
      }, {});
    },
    // 房间解散通知
    onRoomClose: function (ret) {
      var self = this;
      console.log('收到解散通知');   
    
      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onRoomClose',
        errCode: ret.errCode,
        errMsg: ret.errMsg
      }, {}); 
    },
    // 评论消息通知
    onRecvRoomTextMsg: function(ret) {
      var self = this;
      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onRecvRoomTextMsg',
        content: ret
      }, {});  
    }
  },
  // 组件布局完成
  ready: function () {
    console.log('初始化data',this.data);
    wx.showLoading({
      title: '进入房间中'
    })
    // 布局完成开始初始化
    this.init();
  },
  // 组件实例被从页面节点树移除
  detached: function () {
    console.log('组件实例被从页面节点树移除');
    this.exitRoom();
  }
})
