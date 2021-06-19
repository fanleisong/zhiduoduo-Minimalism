var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        detail: {}
    },
    onLoad: function(e) {
        var t = getCurrentPages();
        this.setData({
            pageLength: t.length
        }), e.cityCodeWX && e.recyclerName && e.recyclerPhone && (a.changeCity(e.cityCodeWX), 
        this.setData({
            detail: e
        }));
    },
    call: function(a) {
        var e = a.currentTarget.dataset.phone;
        void 0 != e && "" != e && wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onShareAppMessage: function() {
        return a.share();
    }
});