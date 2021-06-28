var e = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        userInfo: null,
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        myList: [ {
            url: "/pages/mine/order/order",
            type: "icon",
            icon: "cuIcon-text text-sb",
            img: "",
            text: "我的订单"
        },{
            url: "/pages/mine/riderCertification/riderCertification",
            type: "icon",
            icon: "cuIcon-text text-sb",
            img: "",
            text: "注册回收员"
        },{
            url: "/pages/mine/apply/apply",
            type: "icon",
            icon: "cuIcon-moneybag text-sb",
            img: "",
            text: "推广纸多多，一起极简生活"
        }]
    },
    attached: function() {
        var t = this;
        "" != wx.getStorageSync("userInfo") ? this.setData({
            userInfo: wx.getStorageSync("userInfo"),
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            t.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            }), wx.setStorageSync("userInfo", e.userInfo);
        } : wx.getUserInfo({
            success: function(n) {
               
                e.globalData.userInfo = n.userInfo, t.setData({
                    userInfo: n.userInfo,
                    hasUserInfo: !0
                }), wx.setStorageSync("userInfo", n.userInfo);
            }
        });
    },
    methods: {
        goLogin: function() {
            let that = this;
            wx.login({
                success:(res) => {
                  this.setData({
                    code : res.code
                  })
                },
               });

            // var e = this.selectComponent("#login");
            // console.log(e), console.log(wx.getStorageSync("city").interfaceUrl + "========="), 
            // e.open(wx.getStorageSync("city").interfaceUrl, !0);
            wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: !0
                    });
                      if (res.errMsg !== 'getUserProfile:ok') {
                        if (res.errMsg === 'getUserProfile:fail auth deny') {
                          return false
                        }
                        wx.showToast({
                          title: '微信登录失败',
                        })
                        return false
                      }
                      var t = wx.getStorageSync("city");
                      e.Util.ajax(t.interfaceUrl + "auth/loginByWeixin", "POST",  {
                          code: this.data.code,
                          userInfo: res
                        }, !0).then(res => {
                        
                        if (res.errno !== 0) {
                          wx.showToast({
                            title: '微信登录失败',
                          })
                          return false;
                        }else{
                            wx.showToast({
                                title: "登录成功"
                            })
                            e.globalData.userInfo =res,wx.setStorageSync("userInfo", res.data.userInfo);
                            that.loginSuccess(res.data.userInfo)
                        }
                      }).catch((err) => {
                        console.log(err)
                      })
                    }
            })
        },
        loginSuccess: function(e) {
            this.setData({
                userInfo: e.detail,
                hasUserInfo: !0
            });
        },
        repeat: function(t) {
            var n = t.currentTarget.dataset.url;
            "价格列表" == t.currentTarget.dataset.text ? wx.navigateTo({
                url: n
            }) : "" != wx.getStorageSync("userInfo") ? wx.navigateTo({
                url: n
            }) : e.goLogin();
        },
        onShareAppMessage: function() {
            return e.share();
        }
    },
    pageLifetimes: {
        show: function() {
            "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                selected: 3
            }), "" != wx.getStorageSync("userInfo") && this.setData({
                userInfo: wx.getStorageSync("userInfo"),
                hasUserInfo: !0
            }), "" == wx.getStorageSync("userInfo") && null != this.data.userInfo && this.setData({
                userInfo: null,
                hasUserInfo: !1
            });
        }
    }
});