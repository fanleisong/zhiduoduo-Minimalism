var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        detail: {}
    },
    onLoad: function(t) {
        var e = getCurrentPages();
        this.setData({
            pageLength: e.length
        });
        var r = wx.getStorageSync("city");
        a.changeCity(t.cityCodeWX), this.setData({
            detail: r
        });
    },
    call: function(a) {
        var t = a.currentTarget.dataset.phone;
        void 0 != t && "" != t && wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onShareAppMessage: function() {
        return a.share();
    }
});