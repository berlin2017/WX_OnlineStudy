// pages/student/userInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的资料',
    title_bg: '#7647a0',
    sexs: ['女','男'],
    grades: [],
    schools: [],
    userInfo:{
      
    },
    wxUser:{},
    areaSchools:[],
    currentSchool:0,
    currentSex:0,
    currentGrade:0,
    currentArea:0,
    selectImage:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // if (that.data.userInfo.image.length==0){
    //   that.data.userInfo.image = '../Resources/userinfo_header.png';
    //   that.setData({
    //     userInfo: that.data.userInfo,
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      wxUser:app.globalData.myUser
    });
    if(this.data.wxUser.sex === '1'){
      this.setData({
        currentSex:1
      });
    }
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://weixin.ywkedu.com/App/student_info',
      data:{
        'openId':app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.data
        });
        for(var i = 0;i <res.data.nianji.length;i++){
          if(res.data.nianji[i].id == res.data.userInfo.nianji_id){
            that.setData({
              currentGrade:i
            });
          }
        }

        for (var i = 0; i < res.data.area.length; i++) {
          if (res.data.area[i].id == res.data.userInfo.area) {
            that.setData({
              currentArea: i
            });
          }
        }

        var array = [];
        for (var index in res.data.school) {

          var item = res.data.school[index];
          if (item.area_name === res.data.area[that.data.currentArea].area_name) {
            array.push(item);
          }
        }
        that.setData({
          areaSchools: array
        });
        for (var i = 0; i < array.length; i++) {
          if (array[i].id == res.data.userInfo.school_id) {
            that.setData({
              currentSchool: i
            });
          }
        }

        if (res.data.userInfo.sex&&res.data.userInfo.sex === '1') {
          this.setData({
            currentSex: 1
          });
        }
        wx.hideLoading();
      },
      fail:function(res){
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  back:function(){
    wx.navigateBack({
      
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.userInfo.userInfo.pic = res.tempFilePaths[0];
        that.setData({
          userInfo: that.data.userInfo,
          selectImage: res.tempFilePaths[0],
        });
      }
    })
  },

  changeSex:function(e){
    var that = this;
    that.data.userInfo.userInfo.sex = parseInt(e.detail.value);
    that.setData({
      userInfo: that.data.userInfo,
      currentSex: parseInt(e.detail.value)
    });
    console.log(that.data.userInfo);
  },

  changeGrade: function (e) {
    var that = this;
    // that.data.userInfo.userInfo.grade = that.data.userInfo.nianji[parseInt(e.detail.value)];
    that.setData({
      currentGrade: parseInt(e.detail.value)
    });
    console.log(that.data.userInfo);
  },

  changeLocation: function (e) {
    var that = this;
    // that.data.userInfo.userInfo.area = that.data.userInfo.area[parseInt(e.detail.value)];
    that.setData({
      currentArea: parseInt(e.detail.value)
    });
    console.log(that.data.userInfo);

    if (!this.data.userInfo.school || this.data.userInfo.school.length <= 0) {
      return;
    }
    var array = [];
    for (var index in this.data.userInfo.school) {

      var item = this.data.userInfo.school[index];
      if (item.area_name === this.data.userInfo.userInfo.area.area_name) {
        array.push(item);
      }
    }
    that.data.userInfo.userInfo.school = array[0];
    this.setData({
      areaSchools: array,
      currentSchool:0,
      userInfo: that.data.userInfo
    });
  },

  changeSchool: function (e) {
    var that = this;
    that.data.userInfo.userInfo.school = that.data.userInfo.school[parseInt(e.detail.value)];
    that.setData({
      currentSchool: parseInt(e.detail.value),
      userInfo: that.data.userInfo
    });
  },

  

  commit:function(e){
    console.log(e.detail.value);
    var that = this;
    wx.showLoading({
      title: '',
    })
    var params = e.detail.value;
    params.openId = app.globalData.myUser.openId;
    if (that.data.selectImage){
      wx.uploadFile({
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        url: 'https://weixin.ywkedu.com/App/add_stuInfo',
        filePath: 'that.data.selectImage',
        name: 'pic',
        formData:params,
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
          })
        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '修改失败',
          })
        },
      })
    }else{
      wx.request({
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        url: 'https://weixin.ywkedu.com/App/add_stuInfo',
        data: params,
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
          })
        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '修改失败',
          })
        },
      })
    }
    
  },

})