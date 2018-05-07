//初始化数据
function tabbarinit() {
  return [
    {
      current:0,
      "pagePath": "main",
      "text": "首页",
      "iconPath": "../Resources/ic_tab_home.png",
      "selectedIconPath": "../Resources/ic_tab_home_light.png"
    },
    {
      current: 0,
      "pagePath": "myClass",
      "text": "我的订单",
      "iconPath": "../Resources/tab_order.png",
      "selectedIconPath": "../Resources/tab_order_light.png"
    },
    {
      current: 0,
      "pagePath": "myStudent",
      "text": "我的学生",
      "iconPath": "../Resources/tab_mystudent.png",
      "selectedIconPath": "../Resources/tab_mystudent_light.png"
    },
   
    {
      current: 0,
      "pagePath": "user?enable=0",
      "text": "我的",
      "iconPath": "../Resources/ic_tab_user.png",
      "selectedIconPath": "../Resources/ic_tab_user_light.png"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}