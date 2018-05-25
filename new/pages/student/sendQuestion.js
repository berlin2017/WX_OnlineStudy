// pages/student/sendQuestion.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'发布辅导需求',
    title_bg:'#7647a0',
    image:'',
    chosed:false,
    // grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '初一', '初二', '初三', '高一', '高二', '高三', '大一', '大二', '大三', '大四'],
    grades: [],
    currentGrade:0,
    subjects: [],
    currentSubject:0,
    allSubjects:[],
    userInfo:null,
    teacher:{},
  },

  changeGrade:function(e){
    this.setData({
      currentGrade:e.detail.value,
      currentSubject:0
    });
    if (!this.data.allSubjects || this.data.allSubjects.length<=0){
      return;
    }
    var array = [];
    for (var index in this.data.allSubjects){
     
      var item = this.data.allSubjects[index];
      if (item.nianji_name === this.data.grades[this.data.currentGrade].name){
        array.push(item);
      }
    }
    this.setData({
      subjects:array
    });
  },

  changeSubject: function (e) {
    this.setData({
      currentSubject: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.openid){
      var that = this;
      that.data.teacher.realname = options.name;
      that.data.teacher.openid = options.openid;
      that.setData({
        teacher: that.data.teacher
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestInfo();
  },

  requestInfo: function () {
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://weixin.ywkedu.com/App/student_my',
      data: {
        'openId': app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.data
        });
        wx.hideLoading();
        that.requestSubjects();
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },


  requestSubjects: function () {
    console.log('----------科目列表---------');
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      url: 'https://weixin.ywkedu.com/App/subject',
      success: function (data) {
        wx.hideLoading();
        console.log(data);
        that.setData({
          allSubjects: data.data
        });
       
        that.requestGrades();
      },
      fail: function (data) {
        wx.hideLoading();
        console.log(data);
      },
    })
  },

  requestGrades:function(){
    console.log('----------年级列表---------');
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/grade',
      success: function (data) {
        wx.hideLoading();
        console.log(data);
        that.setData({
          grades: data.data
        });

        for (var index in data.data) {
          if (data.data[index].name == that.data.userInfo.userInfo.nianji_name){
            that.setData({
              currentGrade:index,
            });
          }
        }

        //设置科目
        var array = [];
        for (var index in that.data.allSubjects) {
          var item = that.data.allSubjects[index];
          
          if (item.nianji_id === that.data.grades[that.data.currentGrade].id) {
            array.push(item);
          }
        }
        that.setData({
          subjects: array
        });
      },
      fail: function (data) {
        wx.hideLoading();
        console.log(data);
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
      this.setData({//将携带的参数赋值
        teacher: currPage.data.teacher,
      });
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

  choseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          image:tempFilePaths[0],
          chosed:true
        });
      },
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          image: tempFilePaths[0],
          chosed: true
        });
      }
    })
  },
  
  send:function(e){
    var that =this;
    if (!this.data.image){
      wx.showToast({
        title: '请选择题目照片',
      })
      return;
   }

   
    var price = e.detail.value['price_input'];
    var remark = e.detail.value['remark_input'];
    console.log(price);
    console.log(remark);
    if (parseInt(price) < parseInt(that.data.subjects[that.data.currentSubject].min_money)){
      wx.showToast({
        title: '起步价 ' + that.data.subjects[that.data.currentSubject].min_money,
      })
      return;
    }
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    var params = {
      'nianji_id': that.data.grades[that.data.currentGrade].id,
      'kemu_id': that.data.subjects[that.data.currentSubject].kemu_id,
      'price': price,
      'beizhu': remark,
      'openId': app.globalData.myUser.openId,
      'form_id': e.detail.formId,
    };
    if (that.data.teacher && that.data.teacher != [] && that.data.teacher.openid){
      params.teacher_openid = that.data.teacher.openid;
      params.directional = 1;
      params.state = 2;
    }
    wx.uploadFile({
      url: 'https://weixin.ywkedu.com/App/student_indent',
      filePath: that.data.image,
      name: 'pic',
      formData: params,
      success: function (res) {
        res = JSON.parse(res.data);
        console.log(res);
        wx.hideLoading();
        if (res.msg != 'ok' && res.msg != '0') {
         
          wx.showToast({
            title: res.data,
          })
          if (res.msg == '2') {
            setTimeout(function () {
              wx.navigateTo({
                url: 'walletCZ',
              })
            }, 1000);
          }
          return;
        }
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: 'allOrder',
          })
        }, 2000);
      }
    })
  },

  toSearch:function(){
    wx.navigateTo({
      url: 'search',
    })
  },

})