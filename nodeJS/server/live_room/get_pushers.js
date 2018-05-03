const roommgr = require("../logic/live_room_mgr")
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body || !ctx.request.body.roomID) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var pushers = roommgr.getRoomMembers(ctx.request.body.roomID);
  if (!pushers) {
    ctx.body = roommgr.getErrMsg(3);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var ret = roommgr.getErrMsg(0);
  ret.pushers = pushers;
  ctx.body = ret;
  log.logResponse(ctx, 0);
}