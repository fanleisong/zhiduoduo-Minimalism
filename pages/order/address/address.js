function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../dist/toast/toast")), i = (t(require("../../../dist/dialog/dialog")), 
getApp());

Page({
    data: {
        StatusBar: i.globalData.StatusBar,
        CustomBar: i.globalData.CustomBar,
        address: [],
        isDel: !1
    },
    onLoad: function(t) {
        var e = getCurrentPages();
        this.setData({
            pageLength: e.length
        }), this.init();
    },
    init: function() {
        var t = this, n = wx.getStorageSync("city"), a = wx.getStorageSync("userInfo");
        "" != a ? i.Util.ajax(n.interfaceUrl + "wxWeb/get_my_address.do", "POST", {
            openid: a.openid
        }, !0).then(function(i) {
            if (i.result) {
                var n = [];
                i.data.forEach(function(t) {
                    var e = {
                        id: t.id,
                        name: t.poi,
                        address: t.poiDetail,
                        longitude: parseFloat(t.longitude),
                        latitude: parseFloat(t.latitude),
                        cityNum: t.cityNum,
                        cityName: t.cityName
                    };
                    "" != wx.getStorageSync("current_address") && t.id == wx.getStorageSync("current_address").id && (e.check = !0), 
                    n.push(e);
                }), t.setData({
                    address: n
                }), wx.setStorageSync("address", n);
            } else e.default.fail("地址获取失败");
        }).catch(function(t) {
            console.log(t), e.default.fail("地址获取错误");
        }) : t.selectComponent("#login").open(wx.getStorageSync("city").interfaceUrl);
    },
    loginSuccess: function(t) {
        this.init();
    },
    choose: function() {
        var t = this;
        i.getLocationAuth().then(function(n) {
            n.authSetting["scope.userLocation"] ? wx.chooseLocation({
                success: function(n) {
                    console.log(n);
                    var a = {
                        poi: n.name,
                        poiDetail: n.address,
                        longitude: n.longitude + "",
                        latitude: n.latitude + "",
                        openid: wx.getStorageSync("userInfo").openid
                    }, o = wx.getStorageSync("city");
                    i.Util.ajax(o.interfaceUrl + "wxWeb/add_my_address.do", "POST", a, !0).then(function(i) {
                        i.result ? t.init() : e.default.fail("地址添加失败");
                    }).catch(function(t) {
                        console.log(t), e.default.fail("地址添加错误");
                    });
                }
            }) : t.auth();
        }).catch(function(t) {
            console.log(t);
        });
    },
    auth: function() {
        var t = this;
        wx.showModal({
            content: "纸先生服务需要获取地理位置权限，是否前往开启",
            confirmText: "前往开启",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.openSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userLocation"] ? t.choose() : (console.log("没有开启授权。。。"), 
                        t.auth());
                    }
                });
            }
        });
    },
    del: function(t) {
        var n = this;
        n.setData({
            isDel: !0
        }), wx.showModal({
            title: "提示",
            content: "是否删除该地址",
            success: function(a) {
                if (a.confirm) {
                    var o = t.currentTarget.dataset.id, c = wx.getStorageSync("city");
                    i.Util.ajax(c.interfaceUrl + "wxWeb/del_my_address.do", "POST", {
                        id: o,
                        openid: wx.getStorageSync("userInfo").openid
                    }, !0).then(function(t) {
                        t.result ? n.init() : e.default.fail("地址删除失败");
                    }).catch(function(t) {
                        console.log(t), e.default.fail("地址删除错误");
                    });
                }
            },
            complete: function(t) {
                n.setData({
                    isDel: !1
                });
            }
        });
    },
    check: function(t) {
        if (!this.data.isDel) {
            var e = this, n = t.currentTarget.dataset.address;
            if (this.setData({
                curAddr: n
            }), null != n.cityNum && null != n.cityName) if (console.log(n.cityNum), n.cityNum != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length) {
                console.log(123456);
                var a = [];
                wx.getStorageSync("cityList").forEach(function(t, e) {
                    var i = [ t.areanum ], o = t.children;
                    null != o && o.forEach(function(t, e) {
                        i.push(t.areanum);
                    }), i.forEach(function(e, i) {
                        n.cityNum == e && a.push(t);
                    });
                }), e.isChangeCity({
                    inList: a
                });
            } else n.cityNum != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? (console.log(456789), 
            wx.getStorageSync("city").children.forEach(function(t, i) {
                if (console.log(t.areanum), n.cityNum == t.areanum) console.log(1111111111), e.goBack(n); else {
                    console.log(2222222222);
                    var a = [];
                    wx.getStorageSync("cityList").forEach(function(t, e) {
                        var i = [ t.areanum ], o = t.children;
                        null != o && o.forEach(function(t, e) {
                            i.push(t.areanum);
                        }), i.forEach(function(e, i) {
                            n.cityNum == e && a.push(t);
                        });
                    }), e.isChangeCity({
                        inList: a
                    });
                }
            })) : e.goBack(n); else i.verifyCity({
                latitude: n.latitude,
                longitude: n.longitude
            }).then(function(t) {
                console.log(t), t.cityCode != wx.getStorageSync("city").cityCode && 0 == wx.getStorageSync("city").children.length ? (console.log(11111111111), 
                console.log(wx.getStorageSync("city").children), e.isChangeCity(t)) : t.cityCode != wx.getStorageSync("city").cityCode && wx.getStorageSync("city").children.length > 0 ? (console.log(22222222222), 
                console.log(wx.getStorageSync("city").children), wx.getStorageSync("city").children.forEach(function(i, a) {
                    t.cityCode == i.areanum ? e.goBack(n) : e.isChangeCity(t);
                })) : e.goBack(n), n.cityNum = t.cityCode, n.cityName = t.cityName, e.saveCity(n);
            }).catch(function(t) {
                console.log("验证城市错误"), console.log(t), e.goBack(n);
            });
        }
    },
    isChangeCity: function(t) {
        console.log(t);
        var e = this;
        t.inList.length > 0 ? wx.showModal({
            title: "提示",
            content: "是否切换到下单地址的城市",
            success: function(n) {
                if (console.log(t), n.confirm) {
                    var a = {
                        id: t.inList[0].id,
                        cityCode: t.inList[0].areanum,
                        city: t.inList[0].areaname,
                        children: t.inList[0].children,
                        interfaceUrl: t.inList[0].interfaceUrl,
                        phone: t.inList[0].phone
                    };
                    i.globalData.cityObj = a, wx.setStorageSync("city", a), console.log("切换城市：" + a.city), 
                    e.goBack(e.data.curAddr, !0, a);
                }
            }
        }) : wx.showModal({
            title: "提示",
            content: "您当前选择的城市没有我们的业务，请选择我们业务下的城市",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        });
    },
    goBack: function(t, e, n) {
        wx.setStorageSync("current_address", t);
        var a = getCurrentPages();
        a[a.length - 2].address(), e ? (a.length > 1 && i.refreshCity(n.city), wx.reLaunch({
            url: "/pages/index/index"
        })) : wx.navigateBack();
    },
    saveCity: function(t) {
        var e = this, n = wx.getStorageSync("city");
        i.Util.ajax(n.interfaceUrl + "wxWeb/edit_my_address.do", "POST", {
            id: t.id,
            cityNum: t.cityNum,
            cityName: t.cityName
        }, !1).then(function(i) {
            if (i.result) {
                var n = e.data.address.map(function(e) {
                    return e.id == t.id && (e.cityNum = t.cityNum, e.cityName = t.cityName), e;
                });
                e.setData({
                    address: n
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    ListTouchStart: function(t) {
        this.setData({
            ListTouchStart: t.touches[0].pageX
        });
    },
    ListTouchMove: function(t) {
        this.setData({
            ListTouchDirection: t.touches[0].pageX - this.data.ListTouchStart > 0 ? "right" : "left"
        });
    },
    ListTouchEnd: function(t) {
        "left" == this.data.ListTouchDirection ? this.setData({
            modalName: t.currentTarget.dataset.target
        }) : this.setData({
            modalName: null
        }), this.setData({
            ListTouchDirection: null
        });
    },
    onShareAppMessage: function() {
        return i.share();
    }
});