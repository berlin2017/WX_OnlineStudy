const CONF = {
  // 服务监听的端口，nginx反向代理配置时注意填写该端口
  port: '5757',

  //
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wx72667dd95df8c05d',

  // 微信小程序 App Secret
  appSecret: '8510fc6db3dffb55636d769d5bf79a8f',

  // 是否使用腾讯云代理登录小程序,没有用到腾讯云代理,这里默认填false
  useQcloudLogin: false,

  /**
   * 需要开通云直播服务 
   * 参考指引 @https://cloud.tencent.com/document/product/454/7953#1.-.E8.A7.86.E9.A2.91.E7.9B.B4.E6.92.AD.EF.BC.88lvb.EF.BC.89
   * 有介绍bizid 和 pushSecretKey的获取方法。
   */
  live: {
    /**
     *  云直播 appID:  和 APIKey 主要用于腾讯云直播common cgi请求。appid 用于表示您是哪个客户，APIKey参与了请求签名sign的生成。
     *  后台用他们来校验common cgi调用的合法性
     *  
     */
    appID: 1234567890,

    /**
     *  云直播 bizid: 和pushSecretKey 主要用于推流地址的生成，填写错误，会导致推流地址不合法，推流请求被腾讯云直播服务器拒绝
     */
    bizid: 1234,

    /**
     *  云直播 推流防盗链key: 和 bizid 主要用于推流地址的生成，填写错误，会导致推流地址不合法，推流请求被腾讯云直播服务器拒绝
     */
    pushSecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    /**
     *  云直播 API鉴权key: 和appID 主要用于common cgi请求。appid 用于表示您是哪个客户，APIKey参与了请求签名sign的生成。
     *  后台用他们来校验common cgi调用的合法性。
     */
    APIKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',


    // 云直播 推流有效期单位秒 默认7天 
    validTime: 3600 * 24 * 7
  },

  /**
   * 需要开通云通信服务
   * 参考指引 @https://cloud.tencent.com/document/product/454/7953#3.-.E4.BA.91.E9.80.9A.E8.AE.AF.E6.9C.8D.E5.8A.A1.EF.BC.88im.EF.BC.89
   * 有介绍appid 和 accType的获取方法。以及私钥文件的下载方法。
   */
  im: {
    /**
     *  云通信 sdkAppID: accountType 和 privateKey 是云通信独立模式下，为您的独立账号 identifer，
     *  派发访问云通信服务的userSig票据的重要信息，填写错误会导致IM登录失败，IM功能不可用
     */
    sdkAppID: 1400075056,

    /**
     *  云通信 账号集成类型 accountType: sdkAppID 和 privateKey 是云通信独立模式下，为您的独立账户identifer，
     *  派发访问云通信服务的userSig票据的重要信息，填写错误会导致IM登录失败，IM功能不可用
     */
    accountType: "23701",

    // 云通信 管理员账号
    administrator: "berlin",

    /**
     *  云通信 派发usersig 采用非对称加密算法RSA，用私钥生成签名。privateKey就是用于生成签名的私钥，私钥文件可以在互动直播控制台获取
     *  配置privateKey 
     *  方式1. 将下载下来的keys.zip文件解压，拷贝其中的 private_key 文件到server/ 目录下 （推荐）
     *  方式2. 将private_key文件的内容按下面的方式填写到 privateKey字段。
     *  程序发现server目录下有private_key 文件会优先用文件。
     *  详细的代码逻辑，可以参见 server/logic/im_mgr.js 文件，getSig函数的实现
     */
    privateKey: "-----BEGIN PRIVATE KEY-----\r\n" + "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgfXP/vXgn3S6Rf9yz\r\n" + "SV+R9SbM8ihmqto7m7hhZcSxmWyhRANCAASR+Vc+qhlwZeGmuGJGCNw0NMbGkID/\r\n" + "mZcjxvMBg3YsxpeJmbU2ehxkHqo+Y/1rUAVQhedKfCRTG3I3MEvAyDZF\r\n" + "-----END PRIVATE KEY-----\r\n"
  },

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'wx72667dd95df8c05d',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     * 新加坡：sg
     * @see https://www.qcloud.com/document/product/436/6224
     */
    region: 'cn-south',
    // Bucket 名称
    fileBucket: 'wximg',
    // 文件夹
    uploadFolder: ''
  },

  /**
   * 多人音视频房间相关参数
   */
  multi_room: {
    // 房间容量上限
    maxMembers: 4,

    // 心跳超时 单位秒
    heartBeatTimeout: 20,

    // 空闲房间超时 房间创建后一直没有人进入，超过给定时间将会被后台回收，单位秒
    maxIdleDuration: 30
  },

  /**
   * 双人音视频房间相关参数
   */
  double_room: {
    // 心跳超时 单位秒
    heartBeatTimeout: 20,

    // 空闲房间超时 房间创建后一直没有人进入，超过给定时间将会被后台回收，单位秒
    maxIdleDuration: 30
  },

  /**
   * 直播连麦房间相关参数
   */
  live_room: {
    // 房间容量上限
    maxMembers: 4,

    // 心跳超时 单位秒
    heartBeatTimeout: 20,

    // 空闲房间超时 房间创建后一直没有人进入，超过给定时间将会被后台回收，单位秒
    maxIdleDuration: 30
  },

  /**
   * 辅助功能 后台日志文件获取相关 当前后台服务的访问域名。
   */
  selfHost: "https://drourwkp.qcloud.la",

  // 微信登录态有效期
  wxLoginExpires: 7200
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
