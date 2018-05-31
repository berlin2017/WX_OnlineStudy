// pages/teacher/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '认证信息',
    title_bg: '#268746',
    userInfo: {
      info:{},
    },
    grades: [],
    showGrade: false,
    gradeValue: [],
    // subjects: [
    //   { id: '1', name: '一年级', subject: [{ name: '语文', id: '1'}]},
    //   { id: '2', name: '二年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2'}] },
    //   { id: '3', name: '三年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3'}] },
    //   { id: '4', name: '四年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3' }, { name: '地理' ,id: '4'}] },
    //   { id: '5', name: '五年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3' }, { name: '地理', id: '4' }, { name: '历史', id: '5'}] },
    // ],
    subjects: [],
    showSubjects: false,
    subjectValue: [],
    idPic: null,
    jobPic: null,
    headerPic: null,
    selectSubject: [],
    nianji_kemu: '',
    nianji_kemu_name: '',
    countries:['中国'],
    regist_type:'0',
    headerUrl : null,
    idUrl :null,
    jobUrl : null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHeader();
    // console.log(contains(this.data.gradeValue, "二年级"));

    if(options.type == '1'){//资料
    this.setData({
      regist_type : '1'
    });
      this.requestInfo();
    }
  },

  setHeader:function(){
    var that = this;
    if (!that.data.userInfo.info.pic||that.data.userInfo.info.pic.length <= 0) {
      that.data.userInfo.info.pic = '../Resources/ic_user_header.png';
      that.setData({
        userInfo: that.data.userInfo
      });
    }
  },

  requestInfo:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'openId': app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      url: 'https://weixin.ywkedu.com/App/teacher_infomation',
      success: function (data) {
        wx.hideLoading();
        console.log(data);
        that.setData({
          userInfo: data.data
        });
        that.setHeader();
      },
      fail: function (data) {
        wx.hideLoading();
        console.log(data);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestSubjects();
  },

  requestSubjects: function () {
    console.log('----------科目列表---------');
    var that = this;
    wx.showLoading({
      title: '',
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

  requestGrades: function () {
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

        //设置科目
        var array = [];
        for (var index in that.data.grades) {
          var item = that.data.grades[index];
          item.subject = new Array();
          for (var index2 in that.data.allSubjects) {
            var item2 = that.data.allSubjects[index2];
            if (item2.nianji_id === item.id) {
              item.subject.push(item2);
            }
          }
          array.push(item);
        }

        that.setData({
          subjects: array
        });
        if (that.data.userInfo.info.nianji_kemu){
          var array = that.data.userInfo.info.nianji_kemu.split('/');
          for (var index in array) {
            var str = array[index];
            var nianji_id = str.substr(0, 1);
            var kemu_ids = str.substr(2, str.length);
            var kemus = kemu_ids.split(',');
            for (var index2 in kemus) {
              var kemu_id = kemus[index2];
              for (var index3 in that.data.subjects) {
                var item = that.data.subjects[index3];
                if (item.id == nianji_id) {
                  var arrar2 = item.subject;
                  for (var index4 in arrar2) {
                    if (arrar2[index4].kemu_id == kemu_id) {
                      arrar2[index4].checked = true;
                    }
                  }
                }
              }
            }
            that.setData({
              subjects: that.data.subjects
            });
          }
        }
      

      },
      fail: function (data) {
        wx.hideLoading();
        console.log(data);
      },
    })
  },

  bindMultiPickerChange: function (e) {
    console.log(e);
    // var class_index = e.detail.value[0];
    // var subject_index = e.detail.value[0];
    // this.data.subjects[0][class_index].id

    // if (this.data.selectSubject){
    //   this.data.selectSubject = new Array();
    //   this.setData({
    //     selectSubject: this.data.selectSubject
    //   });
    // }

    if (!array_contain(this.data.selectSubject, e.detail.value)) {
      this.data.selectSubject.push(e.detail.value);
      this.setData({
        selectSubject: this.data.selectSubject
      });
    } else {
      wx.showToast({
        title: '已添加过了',
      })
    }
    console.log(this.data.selectSubject);
  },

  bindcolumnchange: function (e) {
    var that = this;
    if (e.detail.column == 0) {
      that.data.subjects.pop();
      that.data.subjects.push(that.data.subjects[0][e.detail.value].subject);
      that.setData({
        subjects: that.data.subjects
      });
    }
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

  back: function () {
    wx.navigateBack({

    })
  },

  checkboxChange: function (e) {
    if (e.detail.value.length > 6) {
      wx.showToast({
        title: '最多选6个',
      })
      this.setData({
        subjects: this.data.subjects
      });
      return;
    }
    console.log(e);
    var that = this;
    // for (var i = 0; i < that.data.grades.length; i++) {
    //   if (array_contain(e.detail.value, i)) {
    //     that.data.grades[i].checked = true;
    //   } else {
    //     that.data.grades[i].checked = false;
    //   }
    // }
    // that.setData({
    //   gradeValue: e.detail.value,
    //   grades: that.data.grades
    // });
    for (var i = 0; i < that.data.subjects.length; i++) {
      for (var j in that.data.subjects[i].subject) {
        that.data.subjects[i].subject[j].checked = false
      }
    }
    for (var i in e.detail.value) {
      var item = e.detail.value[i];
      var array = item.split(",");
      that.data.subjects[array[0]].subject[array[1]].checked = true;
    }
    that.setData({
      subjects: that.data.subjects
    });

    var id_string = '';
    var name_string = '';
    for (var i = 0; i < that.data.subjects.length; i++) {
      var s = '';
      var name_str = '';
      for (var j in that.data.subjects[i].subject) {
        if (that.data.subjects[i].subject[j].checked) {
          if (s == '') {
            s = that.data.subjects[i].id + ':';
          }
          s = s + that.data.subjects[i].subject[j].kemu_id + ',';

          if (name_str == '') {
            name_str = that.data.subjects[i].name + ':';
          }
          name_str = name_str + that.data.subjects[i].subject[j].kemu_name + ',';
        }
      }
      if (s.lastIndexOf(',') == s.length - 1) {
        s = s.substr(0, s.length - 1);
      }
      if(s!=''){
        id_string = id_string + s + '/';
      }

      if (name_str.lastIndexOf(',') == name_str.length - 1) {
        name_str = name_str.substr(0, name_str.length - 1);
      }
      if (s != '') {
        name_string = name_string + name_str + '/';
      }
     
    }
    if (id_string.lastIndexOf('/') == id_string.length - 1) {
      id_string = id_string.substr(0, id_string.length - 1);
    }

    if (name_string.lastIndexOf('/') == name_string.length - 1) {
      name_string = name_string.substr(0, name_string.length - 1);
    }

    console.log('科目id字符串');
    console.log(id_string);
    console.log('科目名称字符串');
    console.log(name_string);
    that.setData({
      nianji_kemu: id_string,
      nianji_kemu_name: name_string
    });
  },

  showGrade: function () {
    this.data.showGrade = !this.data.showGrade;
    this.setData({
      showGrade: this.data.showGrade
    });
  },

  showSubject: function () {
    this.data.showSubject = !this.data.showSubject;
    this.setData({
      showSubject: this.data.showSubject
    });
  },

  subjectChanged: function (e) {
    if (e.detail.value.length > 6) {
      wx.showToast({
        title: '最多选6个',
      })
      return;
    }
    console.log(e);
    var that = this;
    for (var i = 0; i < that.data.subjects.length; i++) {
      if (array_contain(e.detail.value, i)) {
        that.data.subjects[i].checked = true;
      } else {
        that.data.subjects[i].checked = false;
      }
    }
    that.setData({
      subjectValue: e.detail.value,
      subjects: that.data.subjects
    });
  },

  choseJobPic: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          jobPic: tempFilePaths[0]
        });
      },
    })
  },

  choseIdPic: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          idPic: tempFilePaths[0]
        });
      },
    })
  },

  choseHeader: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        // that.data.userInfo.image = tempFilePaths[0];
        that.setData({
          headerPic: tempFilePaths[0]
        });
      },
    })
  },

  registe: function (form_data) {
    var that = this;
    console.log(form_data);
    // if (!form_data.detail.value.jianjie) {
    //   wx.showToast({
    //     title: '请填写简介',
    //   })
    //   return;
    // }
    // if (!form_data.detail.value.idnumber) {
    //   wx.showToast({
    //     title: '请填写身份证号码',
    //   })
    //   return;
    // }
    // if (!form_data.detail.value.age) {
    //   wx.showToast({
    //     title: '请填写教龄名',
    //   })
    //   return;
    // }
    // if (!form_data.detail.value.biye_school) {
    //   wx.showToast({
    //     title: '请填写毕业学校',
    //   })
    //   return;
    // }
    if (!form_data.detail.value.tel) {
      wx.showToast({
        title: '请填写手机号码',
      })
      return;
    }
    if (!form_data.detail.value.realname) {
      wx.showToast({
        title: '请填写真实姓名',
      })
      return;
    }

    // if (that.data.regist_type == '0'&&!this.data.headerPic) {
    //   wx.showToast({
    //     title: '请选择用户头像',
    //   })
    //   return;
    // }
    // if (that.data.regist_type == '0' &&!this.data.idPic) {
    //   wx.showToast({
    //     title: '请选择身份证明',
    //   })
    //   return;
    // }
    // if (that.data.regist_type == '0' &&!this.data.jobPic) {
    //   wx.showToast({
    //     title: '请选择工作证明',
    //   })
    //   return;
    // }

    if (that.data.regist_type == '0'&&!this.data.nianji_kemu) {
      wx.showToast({
        title: '请选择教学科目',
      })
      return;
    }

    if (form_data.detail.value.agreement.length == 0) {
      wx.showToast({
        title: '请勾选平台协议',
      })
      return;
    }

    if(that.data.headerPic){
      that.uploadHeader(form_data);
    } else if (that.data.idPic){
      that.uploadId(form_data);
    } else if (that.data.jobPic){
      that.uploadJob(form_data);
    }else{
      that.commit(form_data);
    }

  },


  sendMsg: function (e) {
    console.log(e);
    var title = '已接单';
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx72667dd95df8c05d&secret=d91961063b0948f5607319523f2376b8',
      success: function (res) {
        var token = res.data.access_token;
        var d = {
          touser: app.globalData.myUser.openId,
          template_id: 'AnAV2i1TpSQwyp0_so6Sco3OOklPdy032foGZPv85V4',//这个是1、申请的模板消息id，  
          form_id: e.detail.formId,
          data: {//测试完发现竟然value或者data都能成功收到模板消息发送成功通知，是bug还是故意？？【鄙视、鄙视、鄙视...】 下面的keyword*是你1、设置的模板消息的关键词变量  

            "keyword1": {
              "value": title,
              "color": "#4a4a4a"
            },
            "keyword2": {
              "value": util.formatTime(new Date()),
              "color": "#9b9b9b"
            },
            "keyword3": {
              "value": 'keywords3',
              "color": "#9b9b9b"
            },
            "keyword4": {
              "value": 'keywords4',
              "color": "#9b9b9b"
            },
          },
          color: '#ccc',
          emphasis_keyword: 'keyword1.DATA'
        }
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token,
          method: 'POST',
          data: d,
          success: function (res) {
            wx.hideLoading();
            console.log(res);
          },
          fail: function (res) {
            wx.hideLoading();
            console.log(res);
          },
        })
      },
    })
  },


  commit: function (form_data){
    // this.sendMsg(form_data);
    var that = this;
    var params = {};
    var request_url = 'https://weixin.ywkedu.com/App/register';
    if (that.data.regist_type == '1'){
      request_url = 'https://weixin.ywkedu.com/App/update_teacher_info';
      params.id = that.data.userInfo.info.id;
      if (!that.data.headerUrl) {
        params.pic = that.data.userInfo.info.pic;
      }else{
        params.pic = that.data.headerUrl;
      }
      if (!that.data.jobUrl) {
        params.work_pic = that.data.userInfo.info.work_pic;
      }else{
        params.work_pic = that.data.jobUrl;
      }
      if (!that.data.idUrl) {
        params.id_pic = that.data.userInfo.info.id_pic;
      }else{
        params.id_pic = that.data.idUrl;
      }

      if (!that.data.nianji_kemu) {
        params.nianji_kemu = that.data.userInfo.info.nianji_kemu;
        params.nianji_kemu_name = that.data.userInfo.info.nianji_kemu_name;
      }else{
        params.nianji_kemu = that.data.nianji_kemu;
        params.nianji_kemu_name = that.data.nianji_kemu_name;
      }
    }else{
      params.openId = app.globalData.myUser.openId;
      params.pic = that.data.headerUrl;
      params.work_pic = that.data.jobUrl;
      params.id_pic = that.data.idUrl;
      params.nianji_kemu = that.data.nianji_kemu;
      params.nianji_kemu_name = that.data.nianji_kemu_name;
      console.log('form_id:' + form_data.detail.formId);
      params.form_id = form_data.detail.formId;
    }
    
    params.realname = form_data.detail.value.realname;
    params.tel = form_data.detail.value.tel;
    params.idnumber = form_data.detail.value.idnumber;
    params.guojia = that.data.countries[form_data.detail.value.guojia];
    params.sex = form_data.detail.value.sex;
    params.biye_school = form_data.detail.value.biye_school;
    params.jianjie = form_data.detail.value.jianjie;
  
    params.avatarUrl = app.globalData.myUser.avatarUrl;
    params.teaching = form_data.detail.value.age;
    
    wx.showLoading({
      title: '',
      mask: true,
    })
    console.log(params);
    wx.request({
      url: request_url,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: params,
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.msg == 1) {
          if(that.data.regist_type=='1'){
            wx.showToast({
              title: '更新资料成功',
            })
            setTimeout(function(){
              wx.navigateBack({
                
              })
            },2000);
          }else{
            // wx.showToast({
            //   title: '注册成功，正在审核中',
            // })
            // setTimeout(function(){
             
            // },3000);

            wx.showModal({
              title: '提示',
              content: '尊敬的老师，感谢您的注册！请耐心等待平台审核，待通过审核之后您会收到我们的提醒，祝您好运！',
              success: function (res) {
                wx.redirectTo({
                  url: '../teacher/user?enable=1',
                })
              }
            })
           
          }
         

        } else {
          wx.showToast({
            title: res.data.data.data,
          })
        }

      },
      fail: function () {
        wx.hideLoading();
        wx.showLoading({
          title: '请求失败,请重试',
        })
      },
    })
  },

  uploadHeader: function (form_data){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.uploadFile({
      url: 'https://weixin.ywkedu.com/App/register_pic',
      filePath: that.data.headerPic,
      name: 'pic',
      success:function(e){
        var data = JSON.parse(e.data);
        if (parseInt(data.msg) == 1) {
          that.setData({
            headerUrl:data.pic
          });
          if (that.data.idPic) {
            that.uploadId(form_data);
          } else if (that.data.jobPic){
            that.uploadJob(form_data);
          }else{
            that.commit(form_data);
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '图片上传失败,请重试',
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showLoading({
          title: '请求失败,请重试',
        })
      },
      
    })
  },


  uploadId: function (form_data) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.uploadFile({
      url: 'https://weixin.ywkedu.com/App/register_pic',
      filePath: that.data.idPic,
      name: 'pic',
      success: function (e) {
        var data = JSON.parse(e.data);
        if (parseInt(data.msg) == 1) {
          that.setData({
            idUrl: data.pic
          });
          if(that.data.jobPic){
            that.uploadJob(form_data);
          }else{
            that.commit(form_data);
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '图片上传失败,请重试',
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showLoading({
          title: '请求失败,请重试',
        })
      },
    })
  },


  uploadJob: function (form_data) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.uploadFile({
      url: 'https://weixin.ywkedu.com/App/register_pic',
      filePath: that.data.jobPic,
      name: 'pic',
      success: function (e) {
        var data = JSON.parse(e.data);
        if (parseInt(data.msg) == 1) {
          that.setData({
            jobUrl: data.pic
          });
          that.commit(form_data);
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '图片上传失败,请重试',
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showLoading({
          title: '请求失败,请重试',
        })
      },
    })
  },


  toAgreement: function () {
    wx.navigateTo({
      url: 'agreement',
    })
  },


})


function array_contain(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
}