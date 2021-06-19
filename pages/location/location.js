var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        hidden: !0,
        indexes: [],
        list: [],
        listCur: ""
    },
    onLoad: function(t) {
        var e = getCurrentPages();
        this.setData({
            pageLength: e.length
        }), this.init();
    },
    onReady: function() {
        var t = this;
        wx.createSelectorQuery().select(".indexBar-box").boundingClientRect(function(e) {
            t.setData({
                boxTop: e.top
            });
        }).exec(), wx.createSelectorQuery().select(".indexes").boundingClientRect(function(e) {
            t.setData({
                barTop: e.top
            });
        }).exec();
    },
    init: function() {
        var e = this;
        t.getCityList("city/list", null).then(function(a) {
            var i = [];
            console.log(a)
            a.forEach(function(t) {
                if (null == t.parentNum) {
                    var e = [];
                    a.forEach(function(a) {
                        null != a.parentNum && a.parentNum == t.areanum && e.push(a);
                    }), t.children = e, i.push(t);
                }
            }), t.globalData.cityList = i, wx.setStorageSync("cityList", i);
            var n = [];
            i.forEach(function(t) {
                n.indexOf(t.index) < 0 && n.push(t.index);
            });
            var r = [];
            n.forEach(function(t) {
                var e = {}, a = [];
                e.index = t, i.forEach(function(e) {
                    if (t == e.index) {
                        var i = {
                            id: e.id,
                            name: e.areaname,
                            num: e.areanum,
                            interface: e.interfaceUrl,
                            phone: e.phone
                        }, n = [];
                        null != e.children && e.children.forEach(function(t) {
                            n.push(t.areaname);
                        }), i.childrens = n.toString(), a.push(i);
                    }
                }), e.citys = a, r.push(e);
            }), e.setData({
                list: r,
                indexes: n,
                listCur: n[0]
            });
        });
    },
    chooseCity: function(e) {
        var a = e.currentTarget.dataset.city;
        wx.getStorageSync("cityList").forEach(function(a) {
            if (a.areanum == e.currentTarget.dataset.city.num) {
                var i = {
                    id: a.id,
                    cityCode: a.areanum,
                    city: a.areaname,
                    children: a.children,
                    interfaceUrl: a.interfaceUrl,
                    phone: a.phone
                };
                t.globalData.cityObj = i, wx.setStorageSync("city", i);
            }
        });
        var i = getCurrentPages();
        i[0].setData({
            isChoose: !0,
            isVerify: !0
        }), "pages/index/index" == i[0].route && (i[0].setData({
            cityName: a.name
        }), i[0].loadWasteType()), t.login(), wx.navigateBack();
    },
    getCur: function(t) {
        this.setData({
            hidden: !1,
            listCur: this.data.indexes[t.target.id]
        });
    },
    setCur: function(t) {
        this.setData({
            hidden: !0,
            listCur: this.data.listCur
        });
    },
    tMove: function(t) {
        var e = t.touches[0].clientY, a = this.data.boxTop, i = this;
        if (e > a) {
            var n = parseInt((e - a) / 20);
            this.setData({
                listCur: i.data.indexes[n]
            });
        }
    },
    tStart: function() {
        this.setData({
            hidden: !1
        });
    },
    tEnd: function() {
        this.setData({
            hidden: !0,
            listCurID: this.data.listCur
        });
    },
    indexSelect: function(t) {
        for (var e = this, a = this.data.barHeight, i = this.data.list, n = Math.ceil(i.length * t.detail.y / a), r = 0; r < i.length; r++) if (n < r + 1) return e.setData({
            listCur: indexes[r],
            movableY: 20 * r
        }), !1;
    },
    onShareAppMessage: function() {
        return t.share();
    }
});