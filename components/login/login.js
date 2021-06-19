var e = getApp();

Component({
    properties: {},
    options: {
        addGlobalClass: !0
    },
    data: {
        show: !1,
        url: "",
        cancel: !1
    },
    methods: {
        onClose: function() {
            this.setData({
                close: !1
            });
        },
        open: function(e, o) {
            o && this.setData({
                cancel: !0
            }), this.setData({
                show: !0,
                url: e
            });
        },
        getUser: function(o){
           
        },
        onWechatLogin(detail,goto) {
            //  console.log(this.data.code)
              if (detail.errMsg !== 'getUserProfile:ok') {
                if (detail.errMsg === 'getUserProfile:fail auth deny') {
                  return false
                }
                wx.showToast({
                  title: '微信登录失败',
                })
                return false
              }
              
              util.request(api.AuthLoginByWeixin, {
                  code: this.data.code,
                  userInfo: detail
                }, 'POST').then(res => {
                if (res.errno !== 0) {
                  wx.showToast({
                    title: '微信登录失败',
                  })
                  return false;
                }
               // 设置用户信息
               //console.log(JSON.stringify(detail));
                this.setData({
                  userInfo: detail.userInfo,
                  showLoginDialog: false
                });
                app.globalData.userInfo = detail.userInfo;
                app.globalData.token = res.data.token;
                wx.setStorageSync('userInfo', JSON.stringify(detail.userInfo));
                wx.setStorageSync('token', res.data.token);
                if(goto=='orderclick'){
                  wx.navigateTo({
                    url: '../order/order'
                  })
                }
              }).catch((err) => {
                console.log(err)
              })
            },
        getUserInfo: function(o) {
            
           
        //     var t = this;
        //     "getUserInfo:ok" == o.detail.errMsg ? wx.login({
        //         success: function(a) {
        //             if (a.code) {
        //                 var s = {
        //                     code: a.code,
        //                     encryptedData: o.detail.encryptedData,
        //                     iv: o.detail.iv,
        //                     share: wx.getStorageSync("share")
        //                 }, n = t.data.url;
        //                 void 0 != n && "" != n || (n = wx.getStorageSync("city").interfaceUrl), console.log(s), 
        //                 e.Util.ajax(n + "wxWeb/decodeMinUserInfo.do", "POST", s, !0).then(function(o) {
        //                     console.log(o), 1 == o.status ? (e.globalData.userInfo = o.userInfo, wx.setStorageSync("userInfo", o.userInfo), 
        //                     t.triggerEvent("loginSuccess", o.userInfo, {}), wx.showToast({
        //                         title: "登录成功"
        //                     })) : (wx.showToast({
        //                         title: o.msg,
        //                         icon: "none"
        //                     }), t.data.cancel || t.setData({
        //                         show: !0
        //                     }));
        //                 }).catch(function(e) {
        //                     console.log(e), wx.showToast({
        //                         title: "登录错误",
        //                         icon: "none"
        //                     }), t.data.cancel || t.setData({
        //                         show: !0
        //                     });
        //                 });
        //             } else console.log(a);
        //         },
        //         fail: function(e) {
        //             console.log(e);
        //         }
        //     }) : (wx.showToast({
        //         title: "您取消了登录授权",
        //         icon: "none"
        //     }), t.data.cancel || t.setData({
        //         show: !0
        //     }));
        // }
        }
    }
});