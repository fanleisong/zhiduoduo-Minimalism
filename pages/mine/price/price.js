var e = getApp();

Page({
    data: {
        interfaceUrl: "",
        notice: "",
        priceList: []
    },
    onLoad: function(t) {
        var a = getCurrentPages();
        this.setData({
            pageLength: a.length
        });
        var i = wx.getStorageSync("city"), n = this;
        e.Util.ajax(i.interfaceUrl + "wxWeb/getPriceListNew.do", "GET", null, !0).then(function(e) {
            if (e.result) {
                var t = void 0 == e.data.configList[1].wxValue ? "" : e.data.configList[1].wxValue, a = e.data.priceList.map(function(e) {
                    return {
                        wasteName: e.wasteName,
                        price: e.price,
                        remark: e.remark
                    };
                });
                n.setData({
                    notice: t,
                    priceList: a
                });
            } else wx.showToast({
                title: "数据加载错误",
                icon: "none"
            });
        }).catch(function(e) {
            console.log(e), wx.showToast({
                title: "数据加载失败",
                icon: "none"
            });
        });
    },
    onShareAppMessage: function() {
        return e.share();
    }
});