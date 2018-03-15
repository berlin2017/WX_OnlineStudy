const config = require('../config');
const log = require('../log');
const immgr = require('../logic/im_mgr');
const md5 = require('md5');
const request = require('request');

/**
 * 存储房间和房间成员信息。
 * rooms 结构如下:
 * [
 * {
 *  roomID:"room_XXXXXX",                   // 房间id - 要保证唯一性
 *  roomName:"",                            // 房间名称 - 资料部分
 *  roomCreator:""                          // 房间创建者 - 房间的主人
 *  mixedPlayURL:""                         // 房主的直播播放地址 - 也作为连麦混流地址用
 *  ts:15039273742,                         // 房间创建时间戳 - 后台定时清空空房间用到
 *  pushers:[
 *          {
 *            userId:"user_1",              // 用户id - 在房间里要保证唯一性
 *            userName:"",                  // 用户昵称 - 资料部分
 *            userAvatar:"",                // 用户头像（url） - 资料部分
 *            pushURL:"",                   // 用户的推流地址 
 *            accelerateURL:"",             // 用户的播放地址 - 加速播放地址，走腾讯云专用rtmp加速拉流服务器，而非从cdn拉流，延时更低
 *            timestamp:15039273742,         // 用户保活时间戳 - 心跳接口更新时间戳，确保用户在线。
 *            canQueryState: 1,             // 是否允许查询流状态
 *            streamid: ""       			// 用户流id eg：3891_user_1 
 *          },
 *          ]
 * }
 * ]
 */
var rooms = [];


/**
 * 参数校验通用错误信息列表
 */
var commonErrMsg = [
  "请求成功",
  "请求参数错误",
  "您请求的房间已经存在",
  "您请求的房间不存在",
  "您请求的房间和成员已经存在",
  "您请求的房间成员不存在",
  "服务器内部错误"
]

/**
 * 参数检查错误信息返回
 * code 取值 0~5
 */
function getErrMsg(code) {
  var ret = {};
  ret.code = code;
  ret.message = commonErrMsg[code];
  return ret;
}

/**
 * 获取当前的时间戳 单位秒
 * ex: ts = 1509679482, 代表时间 2017-11-3 11:24:42
 */
function getTimeStamp() {
  var date = new Date();
  return parseInt(date.getTime() / 1000);
}

/**
 * 计算流逝时间 单位秒
 */
function timeSpan(oldTs) {
  return getTimeStamp() - oldTs;
}


/**
 * 心跳检查 
 * 会定时检查，房间成员的心跳是否超时，超时时间由config.live_room.heartBeatTimeout指定。
 * 当房间成员为空，也会将对应的房间删除。
 */
function onTimer() {
  var i = 0;
  while (i < rooms.length) {
    var j = 0;
    var flag = 0;
    var room_create_timeout = 0;
    var room_has_creator = 0;
    var roomID = '',userID = '';
    while (j < rooms[i].pushers.length) {
      if (rooms[i].pushers[j].userID == rooms[i].roomCreator){
        room_has_creator = 1;
      }
      // 超时处理
      if (timeSpan(rooms[i].pushers[j].timestamp) > config.live_room.heartBeatTimeout) {
        log.info("超时：" + rooms[i].pushers[j].streamid);
        // 如果允许查询流状态则查询，否则直接移出该成员
        if(rooms[i].pushers[j].canQueryState == 1) {
          log.info("查询流状态：" + rooms[i].pushers[j].streamid);
          rooms[i].pushers[j].canQueryState = 0;
          roomID = rooms[i].roomID;
          userID = rooms[i].pushers[j].userID;
          (function(roomID,userID){
            getStreamStatus(rooms[i].pushers[j].streamid,function() {
              log.info("查询流状态成功");
              // 流状态为正在推流的情况
              for(var p = 0; p < rooms.length; p++) {
                if(rooms[p].roomID == roomID) {
                  for(var q = 0; q < rooms[p].pushers.length; q++) {
                    if(rooms[p].pushers[q].userID == userID) {
                      rooms[p].pushers[q].timestamp = getTimeStamp();
                      rooms[p].pushers[q].canQueryState = 1;
                    }
                  }
                }
              }
            },function() {
              log.info("查询流状态失败");
              // 流状态为非正在推流的情况下，不做任何操作
            });
          })(roomID,userID);
          j++;
        } else {
          log.warn("onTimer delete member " + rooms[i].pushers[j].userID + " of room " + rooms[i].roomID);
          if (rooms[i].pushers[j].userID == rooms[i].roomCreator)
          {
            room_create_timeout = 1;
          }
          rooms[i].pushers.splice(j, 1);
          immgr.notifyPushersChange(rooms[i].roomID);
          flag = 1;
        }
      }
      else {
        j++;
      }
    }
    // 房主退群则解散该群
    if ((rooms[i].pushers.length == 0 && (timeSpan(rooms[i].ts) > config.live_room.maxIdleDuration || flag == 1)) 
    || room_create_timeout == 1 || room_has_creator == 0) {
      log.warn("onTimer delete room " + rooms[i].roomID);
      var roomID = rooms[i].roomID;
      rooms.splice(i, 1);
      immgr.destroyGroup(roomID);
    }
    else {
      i++;
    }
  }
  log.info("onTimer current room count " + rooms.length.toString());
}

setInterval(onTimer, 5 * 1000);

/**
 * 心跳超时检查流状态
 */
function getStreamStatus(streamid,success,fail) {
  // 5分钟
  var SigTS = getTimeStamp() + 300;

  var txSecret = md5(config.live.APIKey + SigTS).toString(32);
  
  var url = "http://fcgi.video.qcloud.com/common_access?appid=" + config.live.appID.toString() +"&interface=Live_Channel_GetStatus&Param.s.channel_id=" + streamid + "&t=" + SigTS + "&sign=" + txSecret;
  
  request.get(url, function (error, rsp, body) {
    log.info('查询流结果：'+body);
    if (!error && rsp.statusCode == 200) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = { ret: 1000 }
      }
      if (!body.ret && body.output[0] && body.output[0].status == 1) {
        success && success({ret: 0});
      } else {
        fail && fail({ret: 1});
      }
    } else {
      fail && fail({ ret: 1 });
    }
  });
}

/**
 * 房间操作接口 - isRoomExist 判断房间是否存在
 */
function isRoomExist(roomID) {
  for (i in rooms) {
    if (rooms[i].roomID === roomID) {
      return true;
    }
  }
  return false;
}

/**
 * 房间操作接口 - isRoomCreator 判断是否是房间的创建者
 */
function isRoomCreator(roomID, userID) {
  for (i in rooms) {
    if (rooms[i].roomID === roomID && rooms[i].roomCreator == userID) {
      return true;
    }
  }
  return false;
}

/**
 * 房间操作接口 - addRoom 创建房间
 */
function addRoom(roomID, roomName, userID, mixedURL, userName, userAvatar, pushURL, accelerateURL) {
  if (isRoomExist(roomID)) {
    return false;
  }
  else {
    var room = {}
    room.roomID = roomID;
    room.roomName = roomName;
    room.roomCreator = userID;
    room.mixedPlayURL = mixedURL;
    room.ts = getTimeStamp();
    room.pushers = [];
    var pusher = {};
    pusher.userID = userID;
    pusher.userName = userName;
    pusher.userAvatar = userAvatar;
    pusher.pushURL = pushURL;
    pusher.accelerateURL = accelerateURL;
    pusher.timestamp = getTimeStamp();
    pusher.streamid = config.live.bizid + '_' + userID;
    pusher.canQueryState = 1;
    room.pushers.push(pusher);
    rooms.push(room);
    return true;
  }
}

/**
 * 房间操作接口 - delRoom 删除房间
 */
function delRoom(roomID) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      rooms.splice(i, 1);
      return true;
    }
  }
  return false;
}

/**
 * 房间操作接口 - getRoomName 获取房间名称用于UI展示
 */
function getRoomName(roomID) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      return rooms[i].roomName;
    }
  }
  return "";
}

/**
 * 房间操作接口 - getRoomMembers 获取房间所有成员信息
 */
function getRoomMembers(roomID) {
  var ret = [];
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      for (j in rooms[i].pushers) {
        var member = {};
        member.userID = rooms[i].pushers[j].userID;
        member.userName = rooms[i].pushers[j].userName;
        member.userAvatar = rooms[i].pushers[j].userAvatar;
        member.accelerateURL = rooms[i].pushers[j].accelerateURL;
        ret.push(member);
      }
      return ret;
    }
  }
  return null;
}

/**
 * 房间操作接口 - updateRoomName 更新房间名称。暂未实现
 */
function updateRoomName(roomID, roomName) {

}

/**
 * 房间成员操作接口 - isMember 判断房间是否存在指定的成员
 */
function isMember(roomID, userID) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      for (j in rooms[i].pushers) {
        if (rooms[i].pushers[j].userID == userID) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * 房间成员操作接口 - getMemberCnt 获取房间当前成员数量
 */
function getMemberCnt(roomID) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      return rooms[i].pushers.length;
    }
  }
  return -1;
}

/**
 * 房间成员操作接口 - addMember 新增房间成员
 */
function addMember(roomID, userID, userName, userAvatar, pushURL, accelerateURL) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      var pusher = {};
      pusher.userID = userID;
      pusher.userName = userName;
      pusher.userAvatar = userAvatar;
      pusher.pushURL = pushURL;
      pusher.accelerateURL = accelerateURL;
      pusher.timestamp = getTimeStamp();
      pusher.streamid = config.live.bizid + '_' + userID;
      pusher.canQueryState = 1;
      rooms[i].pushers.push(pusher);
    }
  }
}

/**
* 房间成员操作接口 - delMember 删除房间成员
 */
function delMember(roomID, userID) {
  if (isRoomCreator(roomID, userID)) {
    delRoom(roomID);
    immgr.destroyGroup(roomID);
  }
  else if (isMember(roomID, userID)) {
    for (i in rooms) {
      if (rooms[i].roomID == roomID) {
        for (var j = 0; j < rooms[i].pushers.length; j++) {
          if (rooms[i].pushers[j].userID == userID) {
            rooms[i].pushers.splice(j, 1);
            immgr.notifyPushersChange(roomID);
            return;
          }
        }
      }
    }
  }
}

/**
 * 房间成员操作接口 - updateMember 更新房间成员的属性
 */
function updateMember(roomID, userID, userName, userAvatar, pushURL, accelerateURL) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      for (j in rooms[i].pushers) {
        if (rooms[i].pushers[j].userID == userID) {
          rooms[i].pushers[j].userName = userName;
          rooms[i].pushers[j].userAvatar = userAvatar;
          rooms[i].pushers[j].pushURL = pushURL;
          rooms[i].pushers[j].accelerateURL = accelerateURL;
          rooms[i].pushers[j].timestamp = getTimeStamp();
        }
      }
    }
  }
}

/**
 * 房间成员操作接口 - 更新房间成员的保活时间戳
 */
function updateMemberTS(roomID, userID) {
  for (i in rooms) {
    if (rooms[i].roomID == roomID) {
      for (var j = 0; j < rooms[i].pushers.length; j++) {
        if (rooms[i].pushers[j].userID == userID) {
          rooms[i].pushers[j].timestamp = getTimeStamp();
          return;
        }
      }
    }
  }
}

/**
 * 获取房间列表
 * cnt 期望返回的个数
 * withmemebers 是否返回房间成员列表
 */
function getRoomList(cnt, startpos, withpushers) {
  var ret = []
  var count = 0;
  if (withpushers) {
    for (i in rooms) {
      if (getMemberCnt(rooms[i].roomID) <= config.live_room.maxMembers && i >= startpos) {
        var room = {};
        room.roomID = rooms[i].roomID;
        room.roomName = rooms[i].roomName;
        room.roomCreator = rooms[i].roomCreator;
        room.mixedPlayURL = rooms[i].mixedPlayURL;
        var pushers = [];
        for (j in rooms[i].pushers) {
          var pusher = {};
          pusher.userID = rooms[i].pushers[j].userID;
          pusher.userName = rooms[i].pushers[j].userName;
          pusher.userAvatar = rooms[i].pushers[j].userAvatar;
          pusher.accelerateURL = rooms[i].pushers[j].accelerateURL;
          pushers.push(pusher);
        }
        room.pushers = pushers;
        ret.push(room);
        count++;
        if (count == cnt) {
          break;
        }
      }
    }
  } else {
    for (i in rooms) {
      if (getMemberCnt(rooms[i].roomID) <= config.live_room.maxMembers && i >= startpos) {
        var simpleroom = {};
        simpleroom.roomID = rooms[i].roomID;
        simpleroom.roomName = rooms[i].roomName;
        simpleroom.roomCreator = rooms[i].roomCreator;
        simpleroom.mixedPlayURL = rooms[i].mixedPlayURL;
        ret.push(simpleroom);
        count++;
        if (count == cnt) {
          break;
        }
      }
    }
  }
  return ret;
}

module.exports = {
  isRoomExist,
  isRoomCreator,
  addRoom,
  delRoom,
  getRoomName,
  getRoomMembers,
  isMember,
  getMemberCnt,
  addMember,
  delMember,
  updateMember,
  updateMemberTS,
  getRoomList,
  getErrMsg
}