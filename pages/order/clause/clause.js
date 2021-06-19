var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        url: ""
    },
    onLoad: function(a) {
        var t = getCurrentPages();
        this.setData({
            pageLength: t.length
        });
    },
    onShareAppMessage: function() {
        return a.share();
    }
});