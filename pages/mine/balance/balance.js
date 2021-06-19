function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../dist/toast/toast")), a = e(require("../../../dist/dialog/dialog")), n = getApp();

Page({
    data: {
        StatusBar: n.globalData.StatusBar,
        CustomBar: n.globalData.CustomBar,
        userInfo: null,
        disabled: "",
        confirmBalance: "",
        totalMoney: "",
        userid: "",
        money: ""
    },
    onLoad: function(e) {
        var t = getCurrentPages();
        this.setData({
            pageLength: t.length
        }), e.cityCodeWX && n.changeCity(e.cityCodeWX), "" != wx.getStorageSync("userInfo") ? (null == this.data.userInfo && this.setData({
            userInfo: wx.getStorageSync("userInfo")
        }), this.init()) : that.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
    },
    loginSuccess: function(e) {
        this.init();
    },
    init: function() {
        var e = wx.getStorageSync("city"), t = this;
        this.loadMoney(e, t), this.loadUserId(e, t);
    },
    loadMoney: function(e, a) {
        n.Util.ajax(e.interfaceUrl + "wxWeb/find_my_money.do", "POST", {
            openid: a.data.userInfo.openid
        }, !0).then(function(e) {
            e.result ? a.setData({
                confirmBalance: e.data.confirmedMoney,
                totalMoney: e.data.totalMoney
            }) : t.default.fail("余额获取失败");
        }).catch(function(e) {
            console.log(e);
        });
    },
    loadUserId: function(e, a) {
        n.Util.ajax(e.interfaceUrl + "wxWeb/findUserId.do", "POST", {
            openid: a.data.userInfo.openid
        }, !0).then(function(e) {
            e.result ? a.setData({
                userid: e.data
            }) : t.default.fail(e.message);
        }).catch(function(e) {
            console.log(e);
        });
    },
    isAll: function(e) {
        e.detail.value ? this.setData({
            money: this.data.confirmBalance
        }) : this.setData({
            money: ""
        });
    },
    formSubmit: function(e) {
        var i = e.detail.value;
        if ("" != i.money) if (isNaN(i.money) || i.money <= 0) t.default.fail("提现的金额必须为数字"); else if (parseFloat(i.money) < .3) t.default.fail("提现的金额必须大于0.3元"); else {
            var o = wx.getStorageSync("city"), l = this;
            i.openid = l.data.userInfo.openid, i.withdrawType = "WITHDRAW_TYPE_WECHAT", i.bankId = 0, 
            l.setData({
                disabled: "disabled"
            });
            var s = new Date().getTime();
            s - wx.getStorageSync("withdrawTime") > 12e4 ? (n.Util.ajax(o.interfaceUrl + "wxWeb/withdraw.do", "POST", i, !0).then(function(e) {
                l.setData({
                    disabled: ""
                }), console.log("r.result"), console.log(e.result), e.result ? a.default.alert({
                    title: e.total,
                    message: e.message
                }).then(function() {
                    l.data.pageLength > 1 ? wx.navigateBack() : wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }) : t.default.fail(e.message);
            }).catch(function(e) {
                console.log(e), t.default.fail("提现失败"), l.setData({
                    disabled: ""
                });
            }), wx.setStorageSync("withdrawTime", s)) : (t.default.fail("您已提交！请耐心等待！"), setTimeout(function() {
                wx.navigateBack();
            }, 3e3));
        } else t.default.fail("请输入提现的金额");
    },
    onShareAppMessage: function() {
        return n.share();
    }
});