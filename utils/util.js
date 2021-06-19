var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, a = e.getDate(), i = e.getHours(), r = e.getMinutes(), u = e.getSeconds();
        return [ n, o, a ].map(t).join("-") + " " + [ i, r, u ].map(t).join(":");
    },
    ajax: function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments[3];
        return o && wx.showLoading({
            title: "加载中...",
            mask: !0
        }), new Promise(function(a, i) {
            var r = {
                "content-type": "application/json"
            };
            wx.request({
                url: t,
                data: n,
                method: e,
                header: r,
                success: function(t) {
                    a(t.data);
                },
                fail: function(t) {
                    i(t.data);
                },
                complete: function(t) {
                    o && wx.hideLoading();
                }
            });
        });
    }
};