function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../dist/toast/toast")), e = t(require("../../../dist/dialog/dialog")), n = getApp();

Page({
    data: {
        StatusBar: n.globalData.StatusBar,
        CustomBar: n.globalData.CustomBar,
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
    loadPoints: function(t, e) {
        n.Util.ajax(t.interfaceUrl + "wxWeb/find_my_shareAmount.do", "POST", {
            openid: e.data.userInfo.openid
        }, !0).then(function(t) {
            t.result ? e.setData({
                points: t.data.shareAmount
            }) : a.default.fail("积分获取失败");
        }).catch(function(t) {
            console.log(t);
        });
    },
    loadShops: function(t, e) {
        n.Util.ajax(t.interfaceUrl + "wxWeb/find_shoppings_share.do", "POST", {
            openid: e.data.userInfo.openid
        }, !0).then(function(t) {
            t.result ? e.setData({
                list: t.data
            }) : a.default.fail("商品获取失败");
        }).catch(function(t) {
            console.log(t);
        });
    },
    shop: function(t) {
        var n = t.currentTarget.dataset.points;
        n.points = this.data.points, n.price > this.data.points ? a.default.fail("您的积分不足") : e.default.confirm({
            title: "提示",
            message: "确定兑换该商品吗？"
        }).then(function() {
            wx.navigateTo({
                url: "/pages/mine/points/shareConvert",
                success: function(t) {
                    t.eventChannel.emit("acceptDataFromOpenerPage", {
                        data: n
                    });
                }
            });
        }).catch(function() {});
    },
    onShareAppMessage: function() {
        return n.share();
    }
});