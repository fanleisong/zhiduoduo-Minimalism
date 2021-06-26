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
        e.Util.ajax(i.interfaceUrl + "waste/getprice", "GET", null, !0).then(function(e) {
            if (e.errno==0) {
                console.log(e)
                a = e.data.map(function(e) {
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