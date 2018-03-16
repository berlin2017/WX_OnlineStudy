const log = require('../log')
const roommgr = require('../logic/double_room_mgr')

module.exports = async (ctx, next) => {
  var ret = roommgr.getErrMsg(0)
  ctx.body = ret
  log.logResponse(ctx, 0);
}