const config = require('../config')
const liveutil = require('../logic/live_util')
const roommgr = require('../logic/live_room_mgr')
const log = require('../log')


module.exports = async (ctx, next) => {
  // 参数存在性校验
  if (!ctx.request.body || !ctx.request.body.userID || !ctx.request.body.roomID || !ctx.request.body.mergeParams
  ) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }


  var ret = roommgr.getErrMsg(0);
  ret.result = await liveutil.mergeStream(ctx.request.body.mergeParams)
  ctx.body = ret;
  log.logResponse(ctx, 0);
}