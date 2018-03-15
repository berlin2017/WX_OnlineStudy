const config = require("../config")
const fs = require('fs')
const request = require('request')
const crypto = require('crypto')
const zlib = require('zlib')
const path = require('path');

const host = "https://console.tim.qq.com/";// IM后台RESTful API的主机地址。

function getQueryString()
{
  var query =
    "?sdkappid=" + config.im.sdkAppID.toString() + 
    "&identifier=" + config.im.administrator + 
    "&usersig=" + getSig(config.im.administrator) +
    "&random=" + (((1 + Math.random()) * 0x10000) | 0).toString() +
    "&contenttype=json";
  return query;
}

/**
 * 获取IM用户签名 - 辅助函数
 */
function base64Encode(str) {
  var buf = new Buffer(str, 'base64');
  var newstr = buf.toString('base64');
  newstr = newstr.replace(/\+/g, '*');
  newstr = newstr.replace(/\//g, '-');
  newstr = newstr.replace(/\=/g, '_');
  return newstr;
}

/**
 * 获取IM用户签名 - 计算原理参考@https://cloud.tencent.com/document/product/269/1510
 */
function getSig(userid) {
  var time = new Date();
  var expire = "2592000"; //单位秒，相当于30天有效期。

  var orderString = {
    "TLS.appid_at_3rd": config.im.sdkAppID.toString(),
    "TLS.account_type": config.im.accountType,
    "TLS.identifier": userid,
    "TLS.sdk_appid": config.im.sdkAppID.toString(),
    "TLS.time": parseInt(time.getTime() / 1000).toString(),
    "TLS.expire_after": expire
  }

  var content = '';
  content += "TLS.appid_at_3rd:" + config.im.sdkAppID.toString() + '\n';
  content += "TLS.account_type:" + config.im.accountType + '\n';
  content += "TLS.identifier:" + userid + '\n';
  content += "TLS.sdk_appid:" + config.im.sdkAppID.toString() + '\n';
  content += "TLS.time:" + parseInt(time.getTime() / 1000).toString() + '\n';
  content += "TLS.expire_after:" + expire + '\n';

  if (fs.existsSync(path.resolve(__dirname, '../private_key'))){
    var private_key = fs.readFileSync(path.resolve(__dirname, '../private_key'))
  // console.log(private_key)
  }
  else{
    var private_key = config.im.privateKey;
  }


  var signer = crypto.createSign('RSA-SHA256');
  signer.update(content);
  var sign = signer.sign(private_key, 'base64');

  orderString['TLS.sig'] = sign;

  var text = JSON.stringify(orderString);

  var compressed = zlib.deflateSync(text);

  return base64Encode(compressed.toString('base64'));
}

/**
 * 通知房间成员变动 - 参考@https://cloud.tencent.com/document/product/269/1630
 */
function notifyPushersChange(group_id)
{
  var data = {};
  data.GroupId = group_id;
  var content = {};
  content.cmd = 'notifyPusherChange';
  content.data = ""
  data.Content = JSON.stringify(content);

  var myreq = {
    url: host + "v4/group_open_http_svc/send_group_system_notification" + getQueryString(),
    form: JSON.stringify(data)
  };

  return new Promise(function (resolve, reject) {
    request.post(myreq, function (error, rsp, body) {
      if (!error && rsp.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    })
  })
}

/**
 * 建群 - 参考@https://cloud.tencent.com/document/product/269/1615
 */
function createGroup(group_id,group_name)
{
  var data = {
    Owner_Account: config.im.administrator,
    Type: "AVChatRoom",
    GroupId: group_id,
    Name: "group_name"
  };
  var myreq = {
    url: host + "v4/group_open_http_svc/create_group" + getQueryString(),
    form: JSON.stringify(data)
  };

  return new Promise(function (resolve, reject){
    request.post(myreq, function(error, rsp, body){
      if (!error && rsp.statusCode == 200)
      {
        resolve(body);
      }else
      {
        reject(error);
      }
    })
  })
}

/**
 * 解散群 - 参考@https://cloud.tencent.com/document/product/269/1624
 */
function destroyGroup(group_id)
{
  var data = { GroupId:group_id};
  var myreq = {
    url: host + "v4/group_open_http_svc/destroy_group" + getQueryString(),
    form: JSON.stringify(data)
  };

  return new Promise(function (resolve, reject) {
    request.post(myreq, function (error, rsp, body) {
      if (!error && rsp.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    })
  })
}


module.exports = {
  getSig,
  createGroup,
  destroyGroup,
  notifyPushersChange
}