function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../dist/toast/toast")), a = e(require("../../../dist/dialog/dialog")), i = getApp();

Page({
    data: {
        StatusBar: i.globalData.StatusBar,
        CustomBar: i.globalData.CustomBar,
        wasteArray: [],
        wasteIndex: 0,
        wasteChildren: [],
        beginYear: 2e3,
        endYear: 2050,
        dateTimeArray: [],
        dateTimeIndex: [],
        address: "",
        disabled: !1,
        userDetail: {},
        city: null
    },
    onLoad: function(e) {
        var t = getCurrentPages();
        if (this.setData({
            pageLength: t.length
        }), e.scene) {
            var a = decodeURIComponent(e.scene).split("_"), n = a[1], s = a[2];
            if (this.setData({
                cityNum: n,
                recylerId: s
            }), n != wx.getStorageSync("city").cityCode) return i.changeCity(n), void this.onLoad({
                scene: e.scene
            });
            "" == wx.getStorageSync("userInfo") && this.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
        }
        this.dateTime(), this.address(), this.wasteType(), "" != wx.getStorageSync("order_user") && this.setData({
            userDetail: wx.getStorageSync("order_user")
        });
    },
    onShow: function() {
        void 0 != this.data.isChoose && 0 == this.data.isChoose && i.getLocation();
    },
    loginSuccess: function(e) {
        "" == this.data.wasteArray && this.wasteType();
    },
    address: function() {
        "" != wx.getStorageSync("current_address") && this.setData({
            address: wx.getStorageSync("current_address")
        });
    },
    wasteType: function() {
        var e = wx.getStorageSync("city"), a = this;
        "" != e && i.Util.ajax(e.interfaceUrl + "wxWeb/find_first_waste_type.do", "POST", null, !0).then(function(e) {
            if (e.result) {
                var i = e.data.map(function(e) {
                    return e.wasteName;
                }), n = e.data.map(function(e) {
                    return {
                        id: e.id,
                        name: e.wasteName
                    };
                });
                a.setData({
                    wasteArray: i,
                    wasteChildren: n
                });
            } else console.log(e), t.default.fail("废品类型加载失败");
        }).catch(function(e) {
            console.log(e), t.default.fail("废品类型加载错误");
        });
    },
    wasteChange: function(e) {
        this.setData({
            wasteIndex: e.detail.value
        });
    },
    dateTime: function() {
        var e = i.Util.dateTimePicker(this.data.beginYear, this.data.endYear);
        this.setData({
            dateTimeArray: e.dateTimeArray,
            dateTimeIndex: e.dateTime
        });
    },
    changeTimeIndex: function(e) {
        this.setData({
            dateTimeIndex: e.detail.value
        });
    },
    changeTime: function(e) {
        var t = this.data.dateTimeIndex, a = this.data.dateTimeArray;
        t[e.detail.column] = e.detail.value, a[2] = i.Util.getMonthDay(a[0][t[0]], a[1][t[1]]), 
        this.setData({
            dateTimeArray: a
        });
    },
    goAddress: function() {
        wx.navigateTo({
            url: "/pages/order/address/address"
        });
    },
    formSubmit: function(e) {
        var n = this;
        "" == wx.getStorageSync("userInfo") && this.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
        var s = e.detail.value;
        if ("" != s.time) {
            var r = this.data.dateTimeArray[0][this.data.dateTimeIndex[0]] + "/" + this.data.dateTimeArray[1][this.data.dateTimeIndex[1]] + "/" + this.data.dateTimeArray[2][this.data.dateTimeIndex[2]] + " " + this.data.dateTimeArray[3][this.data.dateTimeIndex[3]] + ":" + this.data.dateTimeArray[4][this.data.dateTimeIndex[4]] + ":00";
            if (s.time = Date.parse(r), "" != s.contacter) if ("" != s.phone) if (/^1[3456789]\d{9}$/.test(s.phone)) if ("" != s.poi) {
                var d = wx.getStorageSync("city"), o = {
                    latitude: wx.getStorageSync("current_address").latitude,
                    longitude: wx.getStorageSync("current_address").longitude
                };
                i.verifyCity({
                    latitude: o.latitude,
                    longitude: o.longitude
                }).then(function(e) {
                    if (e.cityCode != d.cityCode) e.inList.length > 0 ? wx.showModal({
                        title: "提示",
                        content: "是否切换到下单地址的城市",
                        success: function(t) {
                            if (t.confirm) {
                                var a = {
                                    id: e.inList[0].id,
                                    cityCode: e.inList[0].areanum,
                                    city: e.inList[0].areaname,
                                    children: e.inList[0].children,
                                    interfaceUrl: e.inList[0].interfaceUrl,
                                    phone: e.inList[0].phone
                                };
                                i.globalData.cityObj = a, wx.setStorageSync("city", a), console.log("切换城市：" + a.city);
                            }
                        }
                    }) : wx.showModal({
                        title: "提示",
                        content: "您当前选择的城市没有我们的业务，请选择我们业务下的城市",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm;
                        }
                    }); else {
                        s.isFree = !1, s.userType = "USER_TYPE_INDIVIDUAL", s.recyclerId = n.data.recylerId, 
                        s.longitude = wx.getStorageSync("current_address").longitude, s.latitude = wx.getStorageSync("current_address").latitude, 
                        s.openid = wx.getStorageSync("userInfo").openid, s.wasteTypeOrderRelaList = [ {
                            wasteTypeId: n.data.wasteChildren[n.data.wasteIndex].id,
                            weight: null
                        } ];
                        var r = wx.getStorageSync("city"), o = n;
                        o.setData({
                            disabled: !0
                        }), i.Util.ajax(r.interfaceUrl + "wxWeb/get_orders_form.do", "POST", s, !0).then(function(e) {
                            e.result ? (wx.setStorageSync("order_user", {
                                name: s.contacter,
                                phone: s.phone
                            }), a.default.alert({
                                title: "提示",
                                message: "下单成功\n如有问题，请拨打客服电话" + r.phone
                            }).then(function() {
                                o.data.pageLength > 1 ? wx.navigateBack() : wx.reLaunch({
                                    url: "/pages/index/index"
                                });
                            })) : a.default.alert({
                                title: "提示",
                                message: e.message + r.phone
                            }).then(function() {
                                o.data.pageLength > 1 ? wx.navigateBack() : wx.reLaunch({
                                    url: "/pages/index/index"
                                });
                            }), o.setData({
                                disabled: !1
                            });
                        }).catch(function(e) {
                            console.log(e), t.default.fail("下单错误"), o.setData({
                                disabled: !1
                            });
                        });
                    }
                }).catch(function(e) {
                    console.log("验证城市错误"), console.log(e);
                });
            } else t.default.fail("请填写取货地址"); else t.default.fail("手机号格式错误！"); else t.default.fail("请填写联系电话"); else t.default.fail("请填写联系人姓名");
        } else t.default.fail("请填写下单时间");
    },
    onShareAppMessage: function() {
        return i.share();
    }
});