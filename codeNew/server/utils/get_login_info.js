const liveutil = require('../logic/live_util')
const config = require('../config')
const roommgr = require('../logic/double_room_mgr')
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body ||
    !ctx.request.body.time || 
    !ctx.request.body.userID) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var ret = roommgr.getErrMsg(0)
  var r = liveutil.genSign(ctx.request.body.time, ctx.request.body.userID)
  ret.userID = r.userID
  ret.txTime = r.txTime
  ret.sign = r.sign 
  ctx.body = ret;
  log.logResponse(ctx, 0);
}