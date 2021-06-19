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
            name: "全部",
            type: ""
        }, {
            name: "已完成",
            type: "OPERATION_STATUS_COMMPLETE"
        } ],
        allPage: 1,
        finishPage: 1,
        limit: 10,
        allList: [],
        finishList: [],
        display1: "none",
        display2: "none",
        isLoading1: !0,
        isLoading2: !0
    },
    onLoad: function(t) {
        var a = getCurrentPages();
        this.setData({
            pageLength: a.length
        }), this.init("");
    },
    init: function(a) {
        if ("" == a) {
            if (!this.data.isLoading1) return;
        } else if (!this.data.isLoading2) return;
        var i = wx.getStorageSync("city"), s = this, e = {
            openid: wx.getStorageSync("userInfo").openid,
            operationStatus: a,
            pageNum: "" == a ? s.data.allPage : s.data.finishPage,
            pageSize: s.data.limit
        };
        t.Util.ajax(i.interfaceUrl + "wxWeb/my_withdraw.do", "POST", e, !1).then(function(i) {
            i.data.length < 10 && ("" == a ? s.setData({
                display1: "block",
                isLoading1: !1
            }) : s.setData({
                display2: "block",
                isLoading2: !1
            }));
            var e = s.data.allList, n = s.data.finishList;
            i.data.forEach(function(i) {
                var o = t.Util.formatTime(new Date(i.subtime)), h = {
                    id: i.id,
                    time: o,
                    withdrawType: i.withdrawType,
                    operationStatus: i.operationStatus,
                    money: i.money
                };
                a == s.data.Tabs[0].type && (e.push(h), s.setData({
                    allList: e
                })), a == s.data.Tabs[1].type && (n.push(h), s.setData({
                    finishList: n
                }));
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
        }), 0 == a && "" == this.data.allList && this.init(this.data.Tabs[a].type), 1 == a && "" == this.data.finishList && this.init(this.data.Tabs[a].type);
    },
    onPullDownRefresh: function() {
        0 == this.data.TabCur && (this.setData({
            allPage: 1,
            allList: [],
            display1: "none",
            isLoading1: !0
        }), this.init(this.data.Tabs[0].type)), 1 == this.data.TabCur && (this.setData({
            finishPage: 1,
            finishList: [],
            display2: "none",
            isLoading2: !0
        }), this.init(this.data.Tabs[1].type)), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.TabCur && (this.setData({
            allPage: this.data.allPage + 1
        }), this.init(this.data.Tabs[0].type)), 1 == this.data.TabCur && (this.setData({
            finishPage: this.data.finishPage + 1
        }), this.init(this.data.Tabs[1].type));
    },
    onShareAppMessage: function() {
        return t.share();
    }
});