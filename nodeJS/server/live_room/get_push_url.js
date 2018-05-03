const config = require('../config')
const liveutil = require('../logic/live_util')
const roommgr = require('../logic/live_room_mgr')
const log = require('../log')

module.exports = async (ctx, next) => {
  // 参数存在性校验
  if (!ctx.request.body || !ctx.request.body.userID
  ) {
    ctx.body = roommgr.getErrMsg(1);
    log.logErrMsg(ctx, ctx.body.message, 0);
    return;
  }

  var txTime = new Date();
  txTime.setTime(txTime.getTime() + config.live.validTime * 1000);

  var ret = roommgr.getErrMsg(0);
  ret.pushURL = liveutil.genPushUrl(ctx.request.body.userID, txTime);
  ctx.body = ret;
  log.logResponse(ctx, 0);
}