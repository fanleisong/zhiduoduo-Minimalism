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
        realLatitude: null,
        realLongitude: null,
        realAddress: ""
    },
    onLoad: function(e) {
        var t = this, a = getCurrentPages();
        this.setData({
            pageLength: a.length
        }), e.type && this.wasteType(e.type), this.dateTime(), this.address(), "" != wx.getStorageSync("order_user") && this.setData({
            userDetail: wx.getStorageSync("order_user")
        }), i.location().then(function(e) {
            t.setData({
                realLatitude: e.latitude,
                realLongitude: e.longitude
            }), i.getCity(e).then(function(e) {
                t.setData({
                    realAddress: e.result.address + e.result.formatted_addresses.recommend
                });
            }).catch(function(e) {
                console.log("获取真实地理信息失败");
            });
        }).catch(function(e) {
            console.log("获取真实定位失败");
        });
    },
    address: function() {
        "" != wx.getStorageSync("current_address") && this.setData({
            address: wx.getStorageSync("current_address")
        });
    },
    wasteType: function(e) {
        var t = wx.getStorageSync("wasteList").filter(function(t) {
            return t.id == e;
        });
        console.log(t);
        var a = t[0].wasteReturns.map(function(e) {
            return e.wasteName;
        });
        console.log(a);
        var i = t[0].wasteReturns.map(function(e) {
            return {
                id: e.id,
                name: e.wasteName
            };
        });
        this.setData({
            wasteArray: a,
            wasteChildren: i
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
        if ("" != wx.getStorageSync("userInfo")) {
            var a = e.detail.value;
            if ("" != a.time) {
                var n = this.data.dateTimeArray[0][this.data.dateTimeIndex[0]] + "/" + this.data.dateTimeArray[1][this.data.dateTimeIndex[1]] + "/" + this.data.dateTimeArray[2][this.data.dateTimeIndex[2]] + " " + this.data.dateTimeArray[3][this.data.dateTimeIndex[3]] + ":" + this.data.dateTimeArray[4][this.data.dateTimeIndex[4]] + ":00";
                if (a.time = Date.parse(n), "" != a.contacter) if ("" != a.phone) if (/^1[3456789]\d{9}$/.test(a.phone)) if ("" != a.poi) if ("" != a.poiDetail) {
                    wx.getStorageSync("city");
                    var r = this, s = wx.getStorageSync("current_address");
                    if (a.longitude = s.longitude, a.latitude = s.latitude, a.openid = wx.getStorageSync("userInfo").openid, 
                    a.wasteTypeOrderRelaList = [ {
                        wasteTypeId: this.data.wasteChildren[this.data.wasteIndex].id,
                        weight: null
                    } ], a.realLatitude = this.data.realLatitude, a.realLongitude = this.data.realLongitude, 
                    a.realAddress = this.data.realAddress, null != s.cityNum && null != s.cityName) if (s.cityNum != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length) {
                        var o = [];
                        wx.getStorageSync("cityList").forEach(function(e, t) {
                            var a = [ e.areanum ], i = e.children;
                            null != i && i.forEach(function(e, t) {
                                a.push(e.areanum);
                            }), a.forEach(function(t, a) {
                                s.cityNum == t && o.push(e);
                            });
                        }), r.isChangeCity({
                            inList: o
                        });
                    } else s.cityNum != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? wx.getStorageSync("city").children.forEach(function(e, t) {
                        if (console.log(e.areanum), s.cityNum == e.areanum) console.log(1111111111), r.order(a); else {
                            console.log(2222222222);
                            var i = [];
                            wx.getStorageSync("cityList").forEach(function(e, t) {
                                var a = [ e.areanum ], n = e.children;
                                null != n && n.forEach(function(e, t) {
                                    a.push(e.areanum);
                                }), a.forEach(function(t, a) {
                                    s.cityNum == t && i.push(e);
                                });
                            }), r.isChangeCity({
                                inList: i
                            });
                        }
                    }) : r.order(a); else i.verifyCity({
                        latitude: s.latitude,
                        longitude: s.longitude
                    }).then(function(e) {
                        e.cityCode != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length ? (console.log(11111111111), 
                        console.log(wx.getStorageSync("city").children), r.isChangeCity(e)) : e.cityCode != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? (console.log(22222222222), 
                        console.log(wx.getStorageSync("city").children), wx.getStorageSync("city").children.forEach(function(t, i) {
                            e.cityCode == t.areanum ? r.order(a) : r.isChangeCity(e);
                        })) : r.order(a), s.cityNum = e.cityCode, s.cityName = e.cityName, r.saveCity(s);
                    }).catch(function(e) {
                        console.log("验证城市错误"), console.log(e), r.order(a);
                    });
                } else t.default.fail("请填写详细地址"); else t.default.fail("请填写取货地址"); else t.default.fail("手机号格式错误！"); else t.default.fail("请填写联系电话"); else t.default.fail("请填写联系人姓名");
            } else t.default.fail("请填写下单时间");
        } else this.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
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
       var n = wx.getStorageSync("city"), r = this, uu =wx.getStorageSync("userInfo");
        r.setData({
            disabled: !0
        }),i.Util.ajax(n.interfaceUrl + "order/add", "POST", {e,uu}, !0).then(function(t) {
            t.errno==0 ? (wx.setStorageSync("order_user", {
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
    loginSuccess: function(e) {},
    onShareAppMessage: function() {
        return i.share();
    }
});