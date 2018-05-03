const config = require('../config')
const roommgr = require('../logic/live_room_mgr')
const immgr = require('../logic/im_mgr')
const liveutil = require('../logic/live_util')
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body ||
    !ctx.request.body.roomName ||
    !ctx.request.body.userID ||
    !ctx.request.body.userName ||
    !ctx.request.body.userAvatar ||
    !ctx.request.body.pushURL) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }


  var roomID;

  while (1) {
    roomID = liveutil.genRoomId();
    while (roommgr.isRoomExist(roomID)) {
      roomID = liveutil.genRoomId();
    }

    var result;
    try{
      result = await immgr.createGroup(roomID, ctx.request.body.roomName);
      result = JSON.parse(result);
      if (result.ErrorCode == 0 || result.ErrorCode == 10025)
      {
        break;
      }
    }catch(e){
      log.logError(ctx, e, 0);
      ctx.body = roommgr.getErrMsg(6);
      return;
    }
  }

  var txTime = new Date();
  txTime.setTime(txTime.getTime() + config.live.validTime * 1000);

  roommgr.addRoom(roomID,
    ctx.request.body.roomName,
    ctx.request.body.userID,
    liveutil.genMixedPlayUrl(ctx.request.body.userID, "flv"),
    ctx.request.body.userName,
    ctx.request.body.userAvatar,
    ctx.request.body.pushURL,
    liveutil.genAcceleratePlayUrl(ctx.request.body.userID, txTime));

  var ret = roommgr.getErrMsg(0);
  ret.roomID = roomID;
  ctx.body = ret;
  log.logResponse(ctx, 0);
}