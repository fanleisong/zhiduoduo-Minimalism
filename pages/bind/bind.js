function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../dist/toast/toast")), a = t(require("../../dist/dialog/dialog")), n = getApp();

Page({
    data: {
        StatusBar: n.globalData.StatusBar,
        CustomBar: n.globalData.CustomBar,
        user: {
            nickName: "小程序用户"
        },
        current: 0,
        phone: "",
        disabled: !0,
        btnName: "绑定",
        hidden: !0,
        city: null
    },
    onLoad: function(t) {
        var i = getCurrentPages();
        this.setData({
            pageLength: i.length
        });
        var o = this;
        t.phone && t.cityNum ? (this.setData({
            phone: t.phone
        }), "" != wx.getStorageSync("cityList") ? o.changeCity(t.cityNum) : n.getCityList("getCityList.do", null).then(function(e) {
            var a = [];
            e.forEach(function(t) {
                if (null == t.parentNum) {
                    var n = [];
                    e.forEach(function(e) {
                        null != e.parentNum && e.parentNum == t.areanum && n.push(e);
                    }), t.children = n, a.push(t);
                }
            }), n.globalData.cityList = a, wx.setStorageSync("cityList", a), o.changeCity(t.cityNum);
        }).catch(function(t) {
            console.log(t), e.default.fail("城市列表获取失败");
        })) : a.default.alert({
            title: "提示",
            message: "手机跳转错误，请重新跳转！"
        }).then(function() {});
    },
    onShow: function() {
        void 0 != this.data.isChoose && 0 == this.data.isChoose && n.getLocation();
    },
    changeCity: function(t) {
        var e = this;
        n.changeCity(t).then(function(t) {
            e.setData({
                citynum: t.cityCode,
                city: t
            }), e.isBind();
        });
    },
    isBind: function() {
        var t = this;
        n.Util.ajax(this.data.city.interfaceUrl + "wxWeb/isBinding.do", "GET", {
            phone: t.data.phone
        }, !0).then(function(e) {
            e.result ? (t.setData({
                current: 1
            }), t.getWechatUser()) : (t.setData({
                btnName: "已绑定"
            }), a.default.alert({
                title: "提示",
                message: e.message
            }).then(function() {}));
        }).catch(function(t) {
            console.log(t), e.default.fail("查询回收员绑定错误");
        });
    },
    getWechatUser: function() {
        var t = wx.getStorageSync("userInfo"), i = this;
        "" != t ? (this.setData({
            user: t
        }), n.Util.ajax(this.data.city.interfaceUrl + "wxWeb/isWechatBinding.do", "GET", {
            unionId: t.unionId
        }, !0).then(function(t) {
            t.result = !0, t.result ? i.setData({
                current: 2,
                disabled: !1
            }) : a.default.alert({
                title: "提示",
                message: t.message
            }).then(function() {});
        }).catch(function(t) {
            console.log(t), e.default.fail("查询用户绑定错误");
        })) : i.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
    },
    loginSuccess: function(t) {
        this.getWechatUser();
    },
    bind: function() {
        this.setData({
            disabled: !0
        });
        var t = this;
        n.Util.ajax(this.data.city.interfaceUrl + "wxWeb/banding.do", "GET", {
            unionId: t.data.user.unionId,
            phone: t.data.phone
        }, !0).then(function(e) {
            e.result = !0, e.result ? (wx.showToast({
                title: "绑定成功！"
            }), t.setData({
                disabled: !1,
                hidden: !1
            })) : a.default.alert({
                title: "提示",
                message: e.message
            }).then(function() {});
        }).catch(function(t) {
            console.log(t), e.default.fail("绑定错误");
        });
    },
    launchAppError: function(t) {
        console.log("跳回APP错误：" + t.detail.errMsg), wx.showModal({
            title: "错误",
            content: "跳回APP失败，请手动跳回APP继续操作！",
            showCancel: !1
        });
    },
    onShareAppMessage: function() {
        return n.share();
    }
});