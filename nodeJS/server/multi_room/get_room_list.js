const roommgr = require('../logic/multi_room_mgr')
const log = require('../log')

module.exports = async (ctx, next) => {
  if (!ctx.request.body || !("cnt" in ctx.request.body) || !("index" in ctx.request.body)) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var ret = roommgr.getErrMsg(0);
  ret.rooms = roommgr.getRoomList(ctx.request.body.cnt, ctx.request.body.index, 1);
  ctx.body = ret;
  log.logResponse(ctx, 0);
}