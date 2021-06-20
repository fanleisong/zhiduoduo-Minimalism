var t = new (require("/utils/qqmap-wx-jssdk.min.js"))({
    key: "YG7BZ-VABWF-JJHJB-NB6O7-BLG2J-76B4W"
}), n = require("/utils/util.js"), e = require("/utils/dateTimePicker.js");

App({
    onLaunch: function() {
        var t = this;
        if (wx.getSystemInfo({
            success: function(n) {
                t.globalData.StatusBar = n.statusBarHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                t.globalData.Custom = e, t.globalData.CustomBar = e.bottom + e.top - n.statusBarHeight;
            }
        }), this.init(), wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        t.globalData.userInfo = n.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(n);
                    }
                });
            }
        }), wx.canIUse("getUpdateManager")) {
            var n = wx.getUpdateManager();
            n.onCheckForUpdate(function(t) {
                t.hasUpdate && (n.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            t.confirm && n.applyUpdate();
                        }
                    });
                }), n.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。"
        });
    },
    globalData: {
        host: "https://shop.icciss.cn:90/api/",
        userInfo: null,
        cityList: null,
        cityObj: {},
        show: !1,
        routeKey: "3DJBZ-CCVCX-PVI44-7N34Y-ZXYFQ-L3BFY"
    },
    Util: {
        ajax: n.ajax,
        formatTime: n.formatTime,
        dateTimePicker: e.dateTimePicker,
        getMonthDay: e.getMonthDay
    },
    init: function() {
        var t = this, n = wx.getStorageSync("city").interfaceUrl, e = 0;
        void 0 != n && (e = n.indexOf("app.zxsrecycle")), "" == wx.getStorageSync("city") || -1 != e ? (console.log(wx.getStorageSync("city")), 
        t.getCityList("city/list", null).then(function(n) {
            var e = [];
            console.log(n)
            n.forEach(function(t) {
                if (null == t.parentNum) {
                    var o = [];
                    n.forEach(function(n) {
                        null != n.parentNum && n.parentNum == t.areanum && o.push(n);
                    }), t.children = o, e.push(t);
                }
            }), t.globalData.cityList = e, console.log(e), wx.setStorageSync("cityList", e), 
            t.getLocation();
        }).catch(function(n) {
            console.log("城市列表获取失败："), wx.showModal({
                title: "提示",
                content: "城市列表加载失败，请刷新或重新打开",
                confirmText: "刷新",
                cancelText: "取消",
                success: function(n) {
                    n.confirm && t.init();
                }
            });
        })) : "" == wx.getStorageSync("userInfo") && t.login();
    },
    getCityList: function(t, n) {
        var e = this, o = this;
        return new Promise(function(i, a) {
            o.Util.ajax(e.globalData.host + t, "GET", n, !1).then(function(t) {
                t.errno==0 ? i(t.data) : a(t);
            }).catch(function(t) {
                a(t);
            });
        });
    },
    refreshCity: function(t) {
        var n = getCurrentPages();
        n[0] && "pages/index/index" == n[0].route && (n[0].setData({
            cityName: t
        }), n[0].loadWasteType()), this.login();
    },
    getLocation: function() {
        var t = this;
        t.location().then(function(n) {
            t.verifyCity(n).then(function(n) {
                if (n.inList.length > 0) {
                    var e = {
                        id: n.inList[0].id,
                        cityCode: n.inList[0].areanum,
                        city: n.inList[0].areaname,
                        children: n.inList[0].children,
                        interfaceUrl: n.inList[0].interfaceUrl,
                        phone: n.inList[0].phone
                    };
                    t.globalData.cityObj = e, wx.setStorageSync("city", e), console.log("定位城市：" + e.city), 
                    t.refreshCity(e.city), t.login();
                } else t.chooseLocationModal();
            }).catch(function(n) {
                console.log("验证城市错误"), console.log(n), t.verifyFailModal();
            });
        }).catch(function(n) {
            console.log("定位失败："), console.log(n), "" == wx.getStorageSync("city") ? t.authLocationModal() : (console.log("已手动定位"), 
            t.globalData.cityObj = wx.getStorageSync("city"), t.login());
        });
    },
    location: function() {
        return new Promise(function(t, n) {
            wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    var e = {
                        latitude: n.latitude,
                        longitude: n.longitude
                    };
                    t(e);
                },
                fail: function(t) {
                    n(t);
                }
            });
        });
    },
    getLocationAuth: function() {
        return new Promise(function(t, n) {
            wx.getSetting({
                success: function(n) {
                    t(n);
                },
                fail: function(t) {
                    console.log("获取定位授权失败：" + t), n(t);
                }
            });
        });
    },
    getCity: function(n) {
        return new Promise(function(e, o) {
            t.reverseGeocoder({
                location: n,
                success: function(t) {
                   e(t);
                },
                fail: function(t) {
                    o(t);
                }
            });
        });
    },
    authLocationModal: function() {
        var t = this;
        wx.showModal({
            content: "纸先生服务需要获取地理位置权限，是否前往开启",
            confirmText: "前往开启",
            cancelText: "手动定位",
            success: function(n) {
                if (n.confirm) wx.openSetting({
                    success: function(n) {
                        console.log(n), n.authSetting["scope.userLocation"] ? t.getLocation() : (console.log("没有开启授权。。。"), 
                        t.show = !1, t.authLocationModal());
                    }
                }); else {
                    var e = getCurrentPages();
                    e[0] && e[0].setData({
                        isChoose: !1
                    }), wx.navigateTo({
                        url: "/pages/location/location"
                    });
                }
            }
        });
    },
    chooseLocationModal: function() {
        wx.showModal({
            content: "您所在城市没有纸多多极简生活的业务，请选择纸多多极简生活业务下的城市",
            showCancel: !1,
            confirmText: "前往选择",
            success: function(t) {
                if (t.confirm) {
                    var n = getCurrentPages();
                    n[0] && n[0].setData({
                        isChoose: !1
                    }), wx.navigateTo({
                        url: "/pages/location/location"
                    });
                }
            }
        });
    },
    verifyFailModal: function() {
        wx.showModal({
            content: "逆地址解析失败，请手动定位",
            showCancel: !1,
            success: function(t) {
                if (t.confirm) {
                    var n = getCurrentPages();
                    n[0] && n[0].setData({
                        isVerify: !1
                    }), wx.navigateTo({
                        url: "/pages/location/location"
                    });
                }
            }
        });
    },
    verifyCity: function(t) {
        var n = this;
        return new Promise(function(e, o) {
            n.getCity(t).then(function(t) {
                var n = t.result.ad_info.city, o = t.result.ad_info.district, i = t.result.ad_info.adcode, a = t.result.ad_info.city_code.substring(3, t.result.ad_info.city_code.length), c = [], s = null, r = null;
                wx.getStorageSync("cityList").forEach(function(t, e) {
                    var l = [ t.areanum ], u = t.children;
                    null != u && u.forEach(function(t, n) {
                        l.push(t.areanum);
                    }), l.forEach(function(e, l) {
                        a == e && (c.push(t), s = a, r = n), i == e && (c.push(t), s = i, r = o);
                    });
                }), console.log(s), console.log(r), e({
                    inList: c,
                    cityCode: s,
                    cityName: r
                });
            }).catch(function(t) {
                console.log(t), o(t);
            });
        });
    },
    changeCity: function(t) {
        var n = wx.getStorageSync("cityList"), e = this;
        return new Promise(function(o, i) {
            n.forEach(function(n) {
                if (n.areanum == t) {
                    console.log(JSON.stringify(n));
                    var i = {
                        id: n.id,
                        cityCode: n.areanum,
                        city: n.areaname,
                        children: n.children,
                        interfaceUrl: n.interfaceUrl,
                        phone: n.phone
                    };
                    e.globalData.cityObj = i, wx.setStorageSync("city", i), o(i);
                }
            });
        });
    },
    login: function() {
        if ("" != wx.getStorageSync("city")) {
            var t = wx.getStorageSync("city"), n = this;
            wx.login({
                success: function(e) {
                    n.Util.ajax(t.interfaceUrl + "auth/loginByWeixin", "POST", {
                        code: e.code,
                    }, !0).then(function(t) {
                        console.log(t)
                        t.errno==0 ? wx.setStorageSync("userInfo", t.data) : wx.setStorageSync("userInfo", "");
                    }).catch(function(t) {
                        console.log(t);
                    });
                }
            });
        }
    },
    goLogin: function() {
        wx.showToast({
            title: "请先登录",
            icon: "none"
        }), setTimeout(function() {
            wx.switchTab({
                url: "/pages/mine/mine"
            });
        }, 1e3);
    },
    updateManager: function() {
        wx.getSystemInfo({
            success: function(t) {
                if (n.compareVersion(t.SDKVersion, "1.9.90") > 0) {
                    var e = wx.getUpdateManager();
                    e.onCheckForUpdate(function(t) {}), e.onUpdateReady(function() {
                        wx.showModal({
                            title: "更新提示",
                            content: "新版本已经准备好，是否重启应用？",
                            success: function(t) {
                                t.confirm && e.applyUpdate();
                            }
                        });
                    }), e.onUpdateFailed(function() {});
                } else wx.showModal({
                    title: "温馨提示",
                    content: "当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。"
                });
            }
        });
    },
    share: function() {
        return {
            title: "纸多多极简生活",
            imageUrl: "/images/logo.jpg",
            path: "/pages/index/index?share=" + (void 0 == wx.getStorageSync("userInfo").openid ? "" : wx.getStorageSync("userInfo").openid)
        };
    }
});