const config = require('../config')
const roommgr = require('../logic/multi_room_mgr')
const immgr = require('../logic/im_mgr')
const liveutil = require('../logic/live_util')
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body ||
    !ctx.request.body.roomID ||
    !ctx.request.body.userID ||
    !ctx.request.body.userName ||
    !ctx.request.body.userAvatar ||
    !ctx.request.body.pushURL) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var txTime = new Date();
  txTime.setTime(txTime.getTime() + config.live.validTime * 1000);

  if (roommgr.isMember(ctx.request.body.roomID, ctx.request.body.userID)) {
    roommgr.updateMember(
      ctx.request.body.roomID,
      ctx.request.body.userID,
      ctx.request.body.userName,
      ctx.request.body.userAvatar,
      ctx.request.body.pushURL,
      liveutil.genAcceleratePlayUrl(ctx.request.body.userID, txTime)
    );
  }
  else {
    if (roommgr.getMemberCnt(ctx.request.body.roomID) >= config.multi_room.maxMembers) {
      var err_ret = {};
      err_ret.code = 5001;
      err_ret.message = "超出房间人数上限"
      ctx.body = err_ret;
      log.logErrMsg(ctx, err_ret.message, 0);
      return;
    } else {
      roommgr.addMember(
        ctx.request.body.roomID,
        ctx.request.body.userID,
        ctx.request.body.userName,
        ctx.request.body.userAvatar,
        ctx.request.body.pushURL,
        liveutil.genAcceleratePlayUrl(ctx.request.body.userID, txTime));

      var result;
      try{
        result = await immgr.notifyPushersChange(ctx.request.body.roomID);
      }catch(e)
      {
        log.logError(e);
      }
    }
  }


  var ret = roommgr.getErrMsg(0);
  ctx.body = ret;
  log.logResponse(ctx, 0);
}