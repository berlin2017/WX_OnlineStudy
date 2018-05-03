const roommgr = require('../logic/live_room_mgr')
const immgr = require('../logic/im_mgr')
const liveutil = require('../logic/live_util')
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body ||
    !ctx.request.body.roomID ||
    !ctx.request.body.userID) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  if (!roommgr.isRoomCreator(ctx.request.body.roomID, ctx.request.body.userID)) {
    ctx.body = roommgr.getErrMsg(3);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  roommgr.delRoom(ctx.request.body.roomID);

  var result;
  try {
    result = await immgr.destroyGroup(ctx.request.body.roomID);
  } catch (e) {
    log.logError(e);
  }
  

  var ret = roommgr.getErrMsg(0);
  ctx.body = ret;
  log.logResponse(ctx, 0);
}