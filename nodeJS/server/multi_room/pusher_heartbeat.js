const roommgr = require('../logic/multi_room_mgr')

module.exports = async (ctx, next) => {
  if (!ctx.request.body || !ctx.request.body.userID || !ctx.request.body.roomID) {
    ctx.body = roommgr.getErrMsg(1);
    return;
  }

  if (!roommgr.isMember(ctx.request.body.roomID, ctx.request.body.userID)) {
    ctx.body = roommgr.getErrMsg(5);
    return;
  }

  roommgr.updateMemberTS(ctx.request.body.roomID, ctx.request.body.userID);

  ctx.body = roommgr.getErrMsg(0);
}