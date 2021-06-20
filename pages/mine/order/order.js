!function(t) {
    t && t.__esModule;
}(require("../../../dist/toast/toast"));

var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        Tabs: [ {
            name: "全部订单",
            type: ""
        }, {
            name: "已完成",
            type: "ORDER_COMMPLETE"
        } ],
        typeCommplte: "",
        allPage: 1,
        finishPage: 1,
        limit: 10,
        allList: [],
        finishList: [],
        show: !1,
        star: 0,
        rateOrder: "",
        isRate: !1,
        display1: "none",
        display2: "none",
        isLoading1: !0,
        isLoading2: !0,
        text: ""
    },
    onLoad: function(t) {
        void 0 !== t.typeCommplte ? (this.setData({
            Tabs: [ {
                name: "已完成",
                type: "ORDER_COMMPLETE"
            } ],
            typeCommplte: "commple",
            flag: t.flag
        }), this.init("ORDER_COMMPLETE", this.data.typeCommplte)) : this.init("", "");
        var a = getCurrentPages();
        this.setData({
            pageLength: a.length
        });
    },
    init: function(a, e) {
        if (console.log(this.data.flag), null == this.data.flag) if ("" == a) {
            if (!this.data.isLoading1) return;
        } else if (!this.data.isLoading2) return;
        console.log("456");
        var i = wx.getStorageSync("city"), s = this, n = "";
        n = "commple" == s.data.typeCommplte ? s.data.allPage : "" == a ? s.data.allPage : s.data.finishPage, 
        t.Util.ajax(i.interfaceUrl + "order/list", "POST", {
            openid: wx.getStorageSync("userInfo").openid,
            orderStatus: a,
            pageNum: n,
            pageSize: s.data.limit
        }, !1).then(function(i) {
            i.data.length < 10 && ("" == a ? s.setData({
                display1: "block",
                isLoading1: !1
            }) : s.setData({
                display2: "block",
                isLoading2: !1
            }));
            var n = s.data.allList, o = s.data.finishList;
            i.data.forEach(function(i) {
                var r = "" == a ? t.Util.formatTime(new Date(i.subTime)) : t.Util.formatTime(new Date(i.completeTime));
                console.log(i.wasteTypeOrderRelaList);
                i.wasteTypeOrderRelaList.map(function(t) {
                    t.money = parseFloat(t.money), t.weight = parseFloat(t.weight), t.total = Math.round(t.money * t.realWeight * 100) / 100;
                });
                var d = {
                    id: i.id,
                    time: r,
                    address: i.poi + i.poiDetail,
                    desc: "",
                    isFree: i.isFree,
                    status: i.orderStatus,
                    money: i.money,
                    rows: i.wasteTypeOrderRelas,
                    list: i.wasteTypeOrderRelaList,
                    userid: i.userid,
                    orderId: i.orderId,
                    star: parseInt(i.star)
                };
                "commple" === e ? a == s.data.Tabs[0].type && (o.push(d), s.setData({
                    allList: o
                })) : (a == s.data.Tabs[0].type && (n.push(d), s.setData({
                    allList: n
                })), a == s.data.Tabs[1].type && (o.push(d), s.setData({
                    finishList: o
                })));
            });
        }).catch(function(t) {
            console.log(t), wx.showToast({
                title: "数据加载失败",
                icon: "none"
            });
        });
    },
    tabSelect: function(t) {
        var a = t.currentTarget.dataset.id;
        this.setData({
            TabCur: a,
            scrollLeft: 60 * (a - 1)
        }), "commple" === this.data.typeCommplte ? 0 == a && "" == this.data.allList && this.init(this.data.Tabs[a].type, this.data.typeCommplte) : (0 == a && "" == this.data.allList && this.init(this.data.Tabs[a].type, ""), 
        1 == a && "" == this.data.finishList && this.init(this.data.Tabs[a].type, ""));
    },
    openStar: function(t) {
        var a = t.currentTarget.dataset.order;
        this.setData({
            show: !0,
            rateOrder: a,
            isRate: !0
        });
    },
    onChange: function(t) {
        this.setData({
            star: t.detail
        });
    },
    onChangeText: function(t) {},
    formSubmit: function(a) {
        if (0 != this.data.star) {
            var e = wx.getStorageSync("city"), i = this;
            t.Util.ajax(e.interfaceUrl + "wxWeb/getStar.do", "GET", {
                userid: i.data.rateOrder.userid,
                orderid: i.data.rateOrder.orderId,
                star: i.data.star,
                text: a.detail.value.text
            }, !0).then(function(t) {
                if ("SUCCESS" == t) {
                    var a = i.data.allList.map(function(t) {
                        return t.orderId == i.data.rateOrder.orderId && (t.star = i.data.star), t;
                    }), e = i.data.finishList.map(function(t) {
                        return t.orderId == i.data.rateOrder.orderId && (t.star = i.data.star), t;
                    });
                    i.setData({
                        allList: a,
                        finishList: e
                    }), i.formReset(), wx.showToast({
                        title: "评分成功",
                        icon: "none"
                    });
                } else wx.showToast({
                    title: "评分错误",
                    icon: "none"
                });
            }).catch(function(t) {
                console.log(t), wx.showToast({
                    title: "评分失败",
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请选择星级",
            icon: "none"
        });
    },
    formReset: function() {
        this.setData({
            text: "",
            show: !1,
            star: 0,
            rateOrder: "",
            isRate: !1
        });
    },
    onPullDownRefresh: function() {
        "commple" == this.data.typeCommplte ? 0 == this.data.TabCur && (this.setData({
            allPage: 1,
            allList: [],
            display1: "none",
            isLoading1: !0
        }), console.log("调用init"), this.init(this.data.Tabs[0].type, this.data.typeCommplte)) : (0 == this.data.TabCur && (this.setData({
            allPage: 1,
            allList: [],
            display1: "none",
            isLoading1: !0
        }), this.init(this.data.Tabs[0].type, "")), 1 == this.data.TabCur && (this.setData({
            finishPage: 1,
            finishList: [],
            display2: "none",
            isLoading2: !0
        }), this.init(this.data.Tabs[1].type, ""))), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        "commple" == this.data.typeCommplte ? 0 == this.data.TabCur && (this.setData({
            allPage: this.data.allPage + 1
        }), this.init(this.data.Tabs[0].type, this.data.typeCommplte)) : (0 == this.data.TabCur && (this.setData({
            allPage: this.data.allPage + 1
        }), this.init(this.data.Tabs[0].type, "")), 1 == this.data.TabCur && (this.setData({
            finishPage: this.data.finishPage + 1
        }), this.init(this.data.Tabs[1].type, "")));
    },
    details: function(t) {
        if (!this.data.isRate) {
            var a = t.currentTarget.dataset.order;
            wx.navigateTo({
                url: "/pages/mine/order/details",
                success: function(t) {
                    t.eventChannel.emit("acceptDataFromOpenerPage", {
                        data: a
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {
        return t.share();
    }
});