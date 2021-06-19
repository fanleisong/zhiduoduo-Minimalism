var t = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        energyList: [],
        hidden: !0
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
                selected: 1
            }), "" != wx.getStorageSync("userInfo") ? this.init() : t.goLogin();
        },
        hide: function() {},
        resize: function() {}
    },
    methods: {
        init: function() {
            var e = wx.getStorageSync("city"), n = this;
            t.Util.ajax(e.interfaceUrl + "central/getToalWasteType.do", "GET", {
                openid: wx.getStorageSync("userInfo").openid
            }, !0).then(function(t) {
                null != t && n.setData({
                    energyList: t,
                    hidden: !1
                });
            }).catch(function(t) {
                console.log(t), wx.showToast({
                    title: "数据加载失败",
                    icon: "none"
                });
            });
        },
        onShareAppMessage: function() {
            return t.share();
        }
    }
});