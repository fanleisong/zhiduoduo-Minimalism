var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../dist/toast/toast")), e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        latitude: "",
        longitude: "",
        scale: 11,
        markers: null,
        details: {},
        first: !0
    },
    onLoad: function(t) {
        var e = getCurrentPages();
        this.setData({
            pageLength: e.length,
            first: !0
        }), this.init();
    },
    onReady: function(t) {
        this.mapCtx = wx.createMapContext("myMap");
    },
    onUnload: function() {},
    init: function() {
        var e = wx.getStorageSync("city"), a = this;
        this.loadCenter(e, a).then(function(t) {
            void 0 != t.latitude && void 0 != t.longitude && (a.setData({
                latitude: t.latitude,
                longitude: t.longitude
            }), a.loadMarkers(e, a));
        }).catch(function(e) {
            console.log(e), t.default.fail("获取城市经纬度失败");
        });
    },
    loadCenter: function(t, a) {
        return new Promise(function(a, n) {
            e.Util.ajax(t.interfaceUrl + "wxWeb/findCityGps.do", "GET", null, !0).then(function(t) {
                a(t);
            }).catch(function(t) {
                n(t);
            });
        });
    },
    loadMarkers: function(t, a) {
        e.Util.ajax(t.interfaceUrl + "wxWeb/getRecycleGpsList.do", "GET", null, a.data.first).then(function(t) {
            if (void 0 != t.list) {
                a.data.first && a.setData({
                    first: !1
                });
                var n = t.list.map(function(t) {
                    return t.iconPath = "/images/marker.png", "RECYCLER_ROLE_FIXED" == t.recyclerRole && (t.iconPath = "/images/marker1.png"), 
                    t.callout = {
                        content: "姓名：" + t.nickName + "\n手机号：" + t.phone + "\n最近时间：" + e.Util.formatTime(new Date(t.updateTime)),
                        borderRadius: 10,
                        padding: 10,
                        display: "BYCLICK",
                        textAlign: "left"
                    }, t;
                });
                a.setData({
                    markers: n
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    showSheet: function(t) {
        var e = t.markerId, a = this;
        this.data.markers.forEach(function(t) {
            if (e == t.id) {
                var n = {
                    phone: t.phone,
                    latitude: t.latitude,
                    longitude: t.longitude
                };
                a.setData({
                    details: n
                });
            }
        }), wx.showActionSheet({
            itemList: [ "拨打电话", "导航前往" ],
            success: function(t) {
                0 == t.tapIndex ? a.phone() : 1 == t.tapIndex && a.go();
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    phone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.details.phone
        });
    },
    go: function() {
        var a = this;
        e.getCity({
            latitude: this.data.details.latitude,
            longitude: this.data.details.longitude
        }).then(function(n) {
            if (0 == n.status) {
                requirePlugin("routePlan");
                var i = e.globalData.routeKey, o = JSON.stringify({
                    name: n.result.address,
                    latitude: a.data.details.latitude,
                    longitude: a.data.details.longitude
                });
                wx.navigateTo({
                    url: "plugin://routePlan/index?key=" + i + "&referer=纸先生再生资源回收&endPoint=" + o
                });
            } else t.default.fail("地址解析错误");
        }).catch(function(e) {
            console.log(e), t.default.fail("地址解析失败");
        });
    },
    onShareAppMessage: function() {
        return e.share();
    }
});