const log = require('../log')
const config = require('../config')
const roommgr = require('../logic/double_room_mgr')
const immgr = require('../logic/im_mgr')

/**
 * 
 */
module.exports = async (ctx, next) => {
  if(!('userID' in ctx.query))
  {
    var ret = roommgr.getErrMsg(1)
    ctx.body = ret;
    log.logErrMsg(ctx, ctx.body.message, 0);
    return
  }

  var ret = roommgr.getErrMsg(0)
  ret.token = "abcde123456789"   // 
  ret.userID = ctx.query.userID;
  ret.sdkAppID = config.im.sdkAppID;
  ret.accType = config.im.accountType;
  ret.userSig = immgr.getSig(ret.userID);
  ctx.body = ret
  log.logResponse(ctx, 0);
}