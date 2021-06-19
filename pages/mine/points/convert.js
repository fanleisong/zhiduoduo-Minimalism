var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../dist/toast/toast")), e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        detail: {},
        address: "",
        userDetail: {},
        sum: 0,
        num: 1,
        disabled: !1,
        loading: !1,
        formDetail: {}
    },
    onLoad: function(a) {
        var e = getCurrentPages();
        this.setData({
            pageLength: e.length
        });
        var t = this;
        this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function(a) {
            t.setData({
                detail: a.data,
                sum: 100 * parseFloat(a.data.price)
            });
        }), "" != wx.getStorageSync("order_user") && this.setData({
            userDetail: wx.getStorageSync("order_user")
        }), this.address();
    },
    address: function() {
        "" != wx.getStorageSync("current_address") && this.setData({
            address: wx.getStorageSync("current_address")
        });
    },
    goAddress: function() {
        wx.navigateTo({
            url: "/pages/order/address/address"
        });
    },
    onChange: function(a) {
        var e = a.detail;
        this.setData({
            num: e,
            sum: 100 * parseFloat(this.data.detail.price) * e
        }), this.data.sum / 100 > this.data.detail.points ? (this.setData({
            disabled: !0
        }), wx.showToast({
            title: "积分不足",
            icon: "none"
        })) : this.setData({
            disabled: !1
        });
    },
    changeName: function(a) {
        var e = this.data.userDetail;
        e.name = a.detail.value, this.setData({
            userDetail: e
        });
    },
    changePhone: function(a) {
        var e = this.data.userDetail;
        e.phone = a.detail.value, this.setData({
            userDetail: e
        });
    },
    changeAddress: function(a) {
        var e = this.data.address;
        e.address = a.detail.value, this.setData({
            address: e
        });
    },
    onSubmit: function(t) {
        var s = this.data.userDetail, d = this.data.address.address;
        if (void 0 != s.name && "" != s.name) if (void 0 != s.phone && "" != s.phone) if (/^1[3456789]\d{9}$/.test(s.phone)) if (void 0 != d && "" != d) {
            var i = wx.getStorageSync("city"), n = this;
            n.setData({
                disabled: !0,
                loading: !0
            }), e.Util.ajax(i.interfaceUrl + "wxWeb/change_shopping.do", "POST", {
                openid: wx.getStorageSync("userInfo").openid,
                shopId: n.data.detail.id,
                shopNum: n.data.num,
                contact: s.name,
                phone: s.phone,
                address: d
            }, !0).then(function(e) {
                e.result ? (a.default.success(e.message), setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }, 1e3)) : (a.default.fail(e.message), n.setData({
                    disabled: !1,
                    loading: !1
                }));
            }).catch(function(e) {
                console.log(e), a.default.fail("兑换错误"), n.setData({
                    disabled: !1,
                    loading: !1
                });
            });
        } else a.default.fail("请填写取货地址"); else a.default.fail("手机号格式错误！"); else a.default.fail("请填写联系电话"); else a.default.fail("请填写联系人姓名");
    },
    onShareAppMessage: function() {
        return e.share();
    }
});