const roommgr = require('../logic/double_room_mgr')
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

  if (!roommgr.isMember(ctx.request.body.roomID, ctx.request.body.userID)) {
    ctx.body = roommgr.getErrMsg(5);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  roommgr.delMember(ctx.request.body.roomID, ctx.request.body.userID);

  var ret = roommgr.getErrMsg(0);
  ctx.body = ret;
  log.logResponse(ctx, 0);
}