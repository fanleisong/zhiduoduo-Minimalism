var t = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        userInfo: null,
        list: []
    },
    lifetimes: {
        attached: function() {
            "" != wx.getStorageSync("userInfo") ? this.init() : t.goLogin();
        },
        moved: function() {},
        detached: function() {}
    },
    pageLifetimes: {
        show: function() {
            "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                selected: 2
            }), "" != wx.getStorageSync("userInfo") ? this.init() : t.goLogin();
        },
        hide: function() {},
        resize: function() {}
    },
    methods: {
        init: function() {
            null == this.data.userInfo && this.setData({
                userInfo: wx.getStorageSync("userInfo")
            });
            var e = wx.getStorageSync("city"), n = this;
            t.Util.ajax(e.interfaceUrl + "advice/get", "GET", {
                openid: n.data.userInfo.openid
            }, !0).then(function(t) {
                if (t.errno==0) {
                    var e = t.data.map(function(t) {
                        return {
                            text: t.text,
                            subTime: null == t.subTime ? "" : t.subTime.substring(0, t.subTime.length - 2),
                            returnText: t.returnText,
                            returnTime: null == t.returnTime ? "" : t.returnTime.substring(0, t.returnTime.length - 2)
                        };
                    });
                    n.setData({
                        list: e
                    });
                } else wx.showToast({
                    title: "数据加载错误",
                    icon: "none"
                });
            }).catch(function(t) {
                console.log(t), wx.showToast({
                    title: "数据加载失败",
                    icon: "none"
                });
            });
        },
        question: function() {
            var t = this;
            wx.navigateTo({
                url: "/pages/advice/question",
                events: {
                    itsTimeToInit: function(e) {
                        "success" == e.r && t.init();
                    }
                }
            });
        },
        onShareAppMessage: function() {
            return t.share();
        },
        onPullDownRefresh: function() {
            this.init(), console.log(0xa1b01d4b1c7), wx.stopPullDownRefresh();
        }
    }
});