function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../dist/toast/toast")), a = e(require("../../dist/dialog/dialog")), i = getApp();

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
            var a = decodeURIComponent(e.scene).split("_"), n = a[1], r = a[2];
            if (this.setData({
                cityNum: n,
                recylerId: r
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
        "" == wx.getStorageSync("userInfo") && this.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
        var a = e.detail.value;
        if ("" != a.time) {
            var n = this.data.dateTimeArray[0][this.data.dateTimeIndex[0]] + "/" + this.data.dateTimeArray[1][this.data.dateTimeIndex[1]] + "/" + this.data.dateTimeArray[2][this.data.dateTimeIndex[2]] + " " + this.data.dateTimeArray[3][this.data.dateTimeIndex[3]] + ":" + this.data.dateTimeArray[4][this.data.dateTimeIndex[4]] + ":00";
            if (a.time = Date.parse(n), "" != a.contacter) if ("" != a.phone) if (/^1[3456789]\d{9}$/.test(a.phone)) if ("" != a.poi) {
                wx.getStorageSync("city");
                var r = this, o = wx.getStorageSync("current_address");
                if (a.isFree = !1, a.userType = "USER_TYPE_INDIVIDUAL", a.recyclerId = this.data.recylerId, 
                a.longitude = wx.getStorageSync("current_address").longitude, a.latitude = wx.getStorageSync("current_address").latitude, 
                a.openid = wx.getStorageSync("userInfo").openid, a.wasteTypeOrderRelaList = [ {
                    wasteTypeId: this.data.wasteChildren[this.data.wasteIndex].id,
                    weight: null
                } ], null != o.cityNum && null != o.cityName) if (console.log(o.cityNum), o.cityNum != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length) {
                    var c = [];
                    wx.getStorageSync("cityList").forEach(function(e, t) {
                        var a = [ e.areanum ], i = e.children;
                        null != i && i.forEach(function(e, t) {
                            a.push(e.areanum);
                        }), a.forEach(function(t, a) {
                            o.cityNum == t && c.push(e);
                        });
                    }), r.isChangeCity({
                        inList: c
                    });
                } else o.cityNum != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? wx.getStorageSync("city").children.forEach(function(e, t) {
                    if (console.log(e.areanum), o.cityNum == e.areanum) console.log(1111111111), r.order(a); else {
                        console.log(2222222222);
                        var i = [];
                        wx.getStorageSync("cityList").forEach(function(e, t) {
                            var a = [ e.areanum ], n = e.children;
                            null != n && n.forEach(function(e, t) {
                                a.push(e.areanum);
                            }), a.forEach(function(t, a) {
                                o.cityNum == t && i.push(e);
                            });
                        }), r.isChangeCity({
                            inList: i
                        });
                    }
                }) : r.order(a); else i.verifyCity({
                    latitude: o.latitude,
                    longitude: o.longitude
                }).then(function(e) {
                    e.cityCode != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length ? (console.log(11111111111), 
                    console.log(wx.getStorageSync("city").children), r.isChangeCity(e)) : e.cityCode != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? (console.log(22222222222), 
                    console.log(wx.getStorageSync("city").children), wx.getStorageSync("city").children.forEach(function(t, i) {
                        e.cityCode == t.areanum ? r.order(a) : r.isChangeCity(e);
                    })) : r.order(a), o.cityNum = e.cityCode, o.cityName = e.cityName, r.saveCity(o);
                }).catch(function(e) {
                    console.log("验证城市错误"), console.log(e), r.order(a);
                });
            } else t.default.fail("请填写取货地址"); else t.default.fail("手机号格式错误！"); else t.default.fail("请填写联系电话"); else t.default.fail("请填写联系人姓名");
        } else t.default.fail("请填写下单时间");
    },
    isChangeCity: function(e) {
        e.inList.length > 0 ? wx.showModal({
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
                    i.globalData.cityObj = a, wx.setStorageSync("city", a), console.log("切换城市：" + a.city), 
                    i.refreshCity(a.city), wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }
            }
        }) : wx.showModal({
            title: "提示",
            content: "您当前选择的城市没有我们的业务，请选择我们业务下的城市",
            showCancel: !1,
            success: function(e) {
                e.confirm;
            }
        });
    },
    saveCity: function(e) {
        var t = this, a = wx.getStorageSync("city");
        i.Util.ajax(a.interfaceUrl + "wxWeb/edit_my_address.do", "POST", {
            id: e.id,
            cityNum: e.cityNum,
            cityName: e.cityName
        }, !1).then(function(a) {
            if (a.result) {
                var i = t.data.address.map(function(t) {
                    return t.id == e.id && (t.cityNum = e.cityNum, t.cityName = e.cityName), t;
                });
                t.setData({
                    address: i
                });
            }
        }).catch(function(e) {
            console.log(e);
        });
    },
    order: function(e) {
        var n = wx.getStorageSync("city"), r = this;
        r.setData({
            disabled: !0
        }), i.Util.ajax(n.interfaceUrl + "wxWeb/get_orders_form.do", "POST", e, !0).then(function(t) {
            t.result ? (wx.setStorageSync("order_user", {
                name: e.contacter,
                phone: e.phone
            }), a.default.alert({
                title: "提示",
                message: "下单成功\n如有问题，请拨打客服电话" + n.phone
            }).then(function() {
                wx.navigateBack();
            })) : a.default.alert({
                title: "提示",
                message: t.message + n.phone
            }).then(function() {
                wx.navigateBack();
            }), r.setData({
                disabled: !1
            });
        }).catch(function(e) {
            console.log(e), t.default.fail("下单错误"), r.setData({
                disabled: !1
            });
        });
    },
    onShareAppMessage: function() {
        return i.share();
    }
});