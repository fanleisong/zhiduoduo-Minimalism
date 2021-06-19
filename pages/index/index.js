var e = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        isOverShare: !0,
        swiperList: [ "/images/banner.png" ],
        cityName: "",
        wasteList: [],
        service: [ {
            img: "/images/phone.png",
            url: "/pages/phone/phone",
            text: "客服电话"
        }, {
            img: "/images/car.png",
            url: "/pages/gps/gps",
            text: "附近车辆"
        }, {
            img: "/images/refuse.png",
            url: "/pages/refuses/refuses",
            text: "分类知识"
        } ]
    },
    lifetimes: {
        attached: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    "iPhone X" == t.model && e.setData({
                        isIphoneX: !0
                    });
                }
            }), "" != wx.getStorageSync("city") && this.setData({
                cityName: wx.getStorageSync("city").city
            }), this.loadWasteType();
        },
        moved: function() {},
        detached: function() {}
    },
    pageLifetimes: {
        show: function() {
            "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
                selected: 0
            }), void 0 != this.data.isChoose && 0 == this.data.isChoose && e.getLocation(), 
            void 0 != this.data.isVerify && 0 == this.data.isVerify && e.verifyFailModal();
        },
        hide: function() {},
        resize: function() {}
    },
    methods: {
        onLoad: function(e) {
            e.share && "" != e.share && (wx.setStorageSync("share", e.share), console.log(e.share));
        },
        loadWasteType: function() {
            var t = wx.getStorageSync("city");
            var a = this;
            "" != t && (console.log(t.interfaceUrl), e.Util.ajax(t.interfaceUrl + "waste/findtype", "GET", null, !0).then(function(e) {
                
                e.errno==0 ? (a.filter(e.data), wx.setStorageSync("wasteList", e.data)) : (wx.setStorageSync("wasteList", ""), 
                a.setData({
                    wasteList: []
                }), console.log("获取废品类型错误：" + e), wx.showToast({
                    title: "获取废品类型错误",
                    icon: "none"
                }));
            }).catch(function(e) {
                wx.setStorageSync("wasteList", ""), a.setData({
                    wasteList: []
                }), console.log("获取废品类型失败：" + e);
            }));
        },
        toOrders: function(t) {
            if ("" != wx.getStorageSync("userInfo")) {
                var a = t.currentTarget.dataset.type;
                wx.navigateTo({
                    url: "/pages/order/order?type=" + a
                });
            } else e.goLogin();
        },
        toPrice: function() {
            wx.navigateTo({
                url: "/pages/mine/price/price"
            });
        },
        toComment: function() {
            wx.navigateTo({
                url: '/pages/mine/order/order?typeCommplte="commplte"&flag="0"'
            });
        },
        filter: function(e) {
            var t = e.map(function(e) {
                return {
                    id: e.id,
                    name: e.wasteName,
                    url: e.icon
                };
            });
            this.setData({
                wasteList: t
            });
        },
        toServices: function(t) {
            var a = t.currentTarget.dataset.url;
            "/pages/gps/gps" != a || "" != wx.getStorageSync("userInfo") ? wx.navigateTo({
                url: a
            }) : e.goLogin();
        },
        onShareAppMessage: function() {
            return e.share();
        }
    }
});