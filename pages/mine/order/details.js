var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        order: []
    },
    onLoad: function(a) {
        var t = getCurrentPages();
        this.setData({
            pageLength: t.length
        });
        var e = this;
        this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function(a) {
            e.setData({
                order: a.data
            });
        });
    },
    onShareAppMessage: function() {
        return a.share();
    }
});