/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'   // 定义所有路由的前缀都已 /weapp 开头
})

const multi_room = require('../multi_room')
const double_room = require('../double_room')
const live_room = require('../live_room')
const utils = require('../utils')
const account = require('../account')

const multiRoomPrefix = '/multi_room'
const doubleRoomPrefix = '/double_room'
const livePrefix = '/live_room'
const utilsPrefix = '/utils'


//------------------------------------ 多人房间接口 ---------------------------------------------------
/**
 * 获取云通信登录所需信息的接口 - 针对接口给定的userId派发 IM 的userSig。
 */
router.post(multiRoomPrefix + '/login', account.login)

/**
 * 登出接口什么也没做
 */
router.post(multiRoomPrefix + '/logout', account.logout)

/**
 * 获取云通信登录所需信息的接口 - 服务器会随机分配用户id 用于后面的进房和出房操作。
 */
router.post(multiRoomPrefix + '/get_im_login_info', multi_room.get_im_login_info)

/**
 * 获取推流地址
 */
router.post(multiRoomPrefix + '/get_push_url', multi_room.get_push_url)

/**
 * 多人 - 获取房间列表接口 -
 */
router.post(multiRoomPrefix + '/get_room_list', multi_room.get_room_list)

/**
 * 多人 - 获取房间成员列表接口 -
 */
router.post(multiRoomPrefix + '/get_pushers', multi_room.get_pushers)

/**
 * 多人 - 创建房间接口 - 
 */
router.post(multiRoomPrefix + '/create_room', multi_room.create_room)

/**
 * 多人 - 销毁房间接口 - 
 */
router.post(multiRoomPrefix + '/destroy_room', multi_room.destroy_room)

/**
 * 多人 - 进入房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您进入房间。
 */
router.post(multiRoomPrefix + '/add_pusher', multi_room.add_pusher)

/**
 * 多人 - 离开房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您离开房间。
 */
router.post(multiRoomPrefix + '/delete_pusher', multi_room.delete_pusher)

/**
 * 多人 - 房间成员心跳接口 - 客户端需要定时调用这个接口维持和server的心跳。
 */
router.post(multiRoomPrefix + '/pusher_heartbeat', multi_room.pusher_heartbeat)



//------------------------------------ 双人房间接口 ---------------------------------------------------
/**
 * 获取云通信登录所需信息的接口 - 针对接口给定的userId派发 IM 的userSig。
 */
router.post(doubleRoomPrefix + '/login', account.login)

/**
 * 登出接口什么也没有做
 */
router.post(doubleRoomPrefix + '/logout', account.logout)

/**
 * 获取云通信登录所需信息的接口 - 服务器会随机分配用户id 用于后面的进房和出房操作。
 */
router.post(doubleRoomPrefix + '/get_im_login_info', double_room.get_im_login_info)

/**
 * 获取推流地址
 */
router.post(doubleRoomPrefix + '/get_push_url', double_room.get_push_url)

/**
 * 多人 - 获取房间列表接口 -
 */
router.post(doubleRoomPrefix + '/get_room_list', double_room.get_room_list)

/**
 * 多人 - 获取房间成员列表接口 -
 */
router.post(doubleRoomPrefix + '/get_pushers', double_room.get_pushers)

/**
 * 多人 - 创建房间接口 - 
 */
router.post(doubleRoomPrefix + '/create_room', double_room.create_room)

/**
 * 多人 - 销毁房间接口 - 
 */
router.post(doubleRoomPrefix + '/destroy_room', double_room.destroy_room)

/**
 * 多人 - 进入房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您进入房间。
 */
router.post(doubleRoomPrefix + '/add_pusher', double_room.add_pusher)

/**
 * 多人 - 离开房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您离开房间。
 */
router.post(doubleRoomPrefix + '/delete_pusher', double_room.delete_pusher)

/**
 * 多人 - 房间成员心跳接口 - 客户端需要定时调用这个接口维持和server的心跳。
 */
router.post(doubleRoomPrefix + '/pusher_heartbeat', double_room.pusher_heartbeat)


//------------------------------------ 直播-连麦 房间接口 ---------------------------------------------------
/**
 * 获取云通信登录所需信息的接口 - 针对接口给定的userId派发 IM 的userSig。
 */
router.post(livePrefix + '/login', account.login)

/**
 * 登出接口什么也没有做。
 */
router.post(livePrefix + '/logout', account.logout)

/**
 * 获取云通信登录所需信息的接口 - 服务器会随机分配用户id 用于后面的进房和出房操作。
 */
router.post(livePrefix + '/get_im_login_info', live_room.get_im_login_info)

/**
 * 获取推流地址
 */
router.post(livePrefix + '/get_push_url', live_room.get_push_url)

/**
 * 多人 - 获取房间列表接口 -
 */
router.post(livePrefix + '/get_room_list', live_room.get_room_list)

/**
 * 多人 - 获取房间成员列表接口 -
 */
router.post(livePrefix + '/get_pushers', live_room.get_pushers)

/**
 * 多人 - 创建房间接口 - 
 */
router.post(livePrefix + '/create_room', live_room.create_room)

/**
 * 多人 - 销毁房间接口 - 
 */
router.post(livePrefix + '/destroy_room', live_room.destroy_room)

/**
 * 多人 - 进入房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您进入房间。
 */
router.post(livePrefix + '/add_pusher', live_room.add_pusher)

/**
 * 多人 - 离开房间接口 - 客户端配合云通信的 群组消息 通知房间其他成员，您离开房间。
 */
router.post(livePrefix + '/delete_pusher', live_room.delete_pusher)

/**
 * 多人 - 房间成员心跳接口 - 客户端需要定时调用这个接口维持和server的心跳。
 */
router.post(livePrefix + '/pusher_heartbeat', live_room.pusher_heartbeat)

/**
 * 后台混流接口
 */
router.post(livePrefix + '/merge_stream', live_room.merge_stream)



//------------------------------------- 提取log辅助函数 --------------------------------------------------
/**
 * 辅助接口 - 用于获取业务后台的日志文件列表。
 */ 
router.get(utilsPrefix + '/logfilelist', utils.logfilelist);

/**
 * 辅助接口 - 用户获取业务后台的指定日志文件。
 */
router.get(utilsPrefix + '/getlogfile', utils.getlogfile);

/**
 * 辅助接口 - 用于检查config.js 相关配置是否正确。
 */
router.get(utilsPrefix + '/check_config', utils.test_config)

// -------------------------------------- 直播demo辅助接口 -------------------------------------------------
/**
 * 直播接口 - 获取推流地址
 */
router.get(utilsPrefix + '/get_test_pushurl', utils.get_test_pushurl)

/**
 * 直播接口 - 获取播放地址
 */
router.get(utilsPrefix + '/get_test_rtmpaccurl', utils.get_test_rtmpaccurl)

/**
 * 
 */
router.post(utilsPrefix + '/get_login_info', utils.get_login_info)




module.exports = router
