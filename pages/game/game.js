var a = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        this.setData({
            url: a.globalData.host + "/game.html"
        });
    }
});