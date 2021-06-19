var e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        refuses: [ {
            id: 1,
            img: "/images/refuse/refuse_1.png",
            name: "可回收物"
        }, {
            id: 2,
            img: "/images/refuse/refuse_2.png",
            name: "厨余垃圾"
        }, {
            id: 3,
            img: "/images/refuse/refuse_3.png",
            name: "有害垃圾"
        }, {
            id: 4,
            img: "/images/refuse/refuse_4.png",
            name: "其他垃圾"
        } ]
    },
    onLoad: function(e) {
        var a = getCurrentPages();
        this.setData({
            pageLength: a.length
        });
    },
    goRefuses: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/refuses/details?id=" + a
        });
    },
    onShareAppMessage: function() {
        return e.share();
    }
});