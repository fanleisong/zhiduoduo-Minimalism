function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../dist/toast/toast")), n = t(require("../../../dist/dialog/dialog")), e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        userInfo: null,
        points: "",
        list: []
    },
    onLoad: function(t) {
        var a = getCurrentPages();
        this.setData({
            pageLength: a.length
        }), "" != wx.getStorageSync("userInfo") ? (null == this.data.userInfo && this.setData({
            userInfo: wx.getStorageSync("userInfo")
        }), this.init()) : setTimeout(function() {
            wx.showToast({
                title: "请先登录",
                icon: "none"
            }), wx.reLaunch({
                url: "/pages/index/index"
            });
        }, 1e3);
    },
    init: function() {
        var t = wx.getStorageSync("city"), a = this;
        this.loadPoints(t, a), this.loadShops(t, a);
    },
    loadPoints: function(t, n) {
        e.Util.ajax(t.interfaceUrl + "wxWeb/find_my_amount.do", "POST", {
            openid: n.data.userInfo.openid
        }, !0).then(function(t) {
            t.result ? n.setData({
                points: t.data.amount
            }) : a.default.fail("积分获取失败");
        }).catch(function(t) {
            console.log(t);
        });
    },
    loadShops: function(t, n) {
        e.Util.ajax(t.interfaceUrl + "wxWeb/find_shoppings.do", "POST", {
            openid: n.data.userInfo.openid
        }, !0).then(function(t) {
            console.log(t), t.result ? n.setData({
                list: t.data
            }) : a.default.fail("商品获取失败");
        }).catch(function(t) {
            console.log(t);
        });
    },
    shop: function(t) {
        var e = t.currentTarget.dataset.points;
        e.points = this.data.points, e.price > this.data.points ? a.default.fail("您的积分不足") : 0 == e.nowCount ? a.default.fail("商品已售罄") : n.default.confirm({
            title: "提示",
            message: "确定兑换该商品吗？"
        }).then(function() {
            wx.navigateTo({
                url: "/pages/mine/points/convert",
                success: function(t) {
                    t.eventChannel.emit("acceptDataFromOpenerPage", {
                        data: e
                    });
                }
            });
        }).catch(function() {});
    },
    onShareAppMessage: function() {
        return e.share();
    }
});