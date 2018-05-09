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
    inputName:'',
    inputPhone:'',
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
    this.requestInfo();
  },

  requestInfo:function(){
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://weixin.ywkedu.com/App/student_info',
      data: {
        'openId': app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.data
        });

        if (that.data.userInfo.userInfo.realname) {
          that.setData({
            inputName: that.data.userInfo.userInfo.realname
          });
        } else {
          that.setData({
            inputName: app.globalData.myUser.nickName
          });
        }

        if (that.data.userInfo.userInfo.tel) {
          that.setData({
            inputPhone: that.data.userInfo.userInfo.tel
          });
        } else {
          that.setData({
            inputPhone: app.globalData.myUser.tel
          });
        }

        for (var i = 0; i < res.data.nianji.length; i++) {
          if (res.data.nianji[i].id == res.data.userInfo.nianji_id) {
            that.setData({
              currentGrade: i
            });
          }
        }

        for (var i = 0; i < res.data.area.length; i++) {
          if (res.data.area[i].id == res.data.userInfo.area_id) {
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

        if (res.data.userInfo.sex && res.data.userInfo.sex === '1') {
          that.setData({
            currentSex: 1
          });
        }
        wx.hideLoading();
      },
      fail: function (res) {
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
    this.requestInfo();
    wx.stopPullDownRefresh();
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
      if (item.area_name === this.data.userInfo.area[e.detail.value].area_name) {
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
    if (!e.detail.value.tel||e.detail.value.tel == '') {
      wx.showToast({
        title: '手机不能为空',
      })
      return;
    }
    wx.showLoading({
      title: '',
      mask: true,
    })
    var params = {};
    e.detail.value.area_id = that.data.userInfo.area[e.detail.value.area_id].id;
    e.detail.value.school_id = that.data.areaSchools[e.detail.value.school_id].id;
    e.detail.value.nianji_id = that.data.userInfo.nianji[e.detail.value.nianji_id].id;
    e.detail.value.openId = app.globalData.myUser.openId;
    if (e.detail.value.realname){
      params.realname = e.detail.value.realname;
    }
    if (e.detail.value.tel) {
      params.tel = e.detail.value.tel;
    }
    if (e.detail.value.realname) {
      params.realname = e.detail.value.realname;
    }
    if (e.detail.value.nianji_id) {
      params.nianji_id = e.detail.value.nianji_id;
    }
    if (e.detail.value.area_id) {
      params.area_id = e.detail.value.area_id;
    }

    if (e.detail.value.school_id) {
      params.school_id = e.detail.value.school_id;
    }
    if (e.detail.value.sex) {
      params.sex = e.detail.value.sex;
    }
    params.openId = app.globalData.myUser.openId;
    params.id = app.globalData.myUser.uid;
    if (that.data.selectImage){
      wx.uploadFile({
        url: 'https://weixin.ywkedu.com/App/add_stuInfo',
        filePath: that.data.selectImage,
        name: 'pic',
        formData:params,
        success: function (res) {
          res = JSON.parse(res.data);
          console.log(res);
          wx.hideLoading();
          if(res.msg==1){
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 1000);
          }else{
            wx.showToast({
              title: res.data.data,
            })
          }
         
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
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'https://weixin.ywkedu.com/App/add_stuInfo',
        data: params,
        success: function (res) {
          res = res.data;
          console.log(res);
          wx.hideLoading();
          if (res.msg == 1) {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 1000);
          } else {
            wx.showToast({
              title: res.data.data,
            })
          }

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

  inputPhone:function(e){
    this.setData({
      inputPhone:e.detail.value
    });
  },

  inputName: function (e) {
    this.setData({
      inputName: e.detail.value
    });
  },

})