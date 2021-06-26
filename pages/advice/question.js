var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../dist/toast/toast")), t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        user: {},
        disabled: ""
    },
    onLoad: function(e) {
        var t = getCurrentPages();
        this.setData({
            pageLength: t.length
        }), "" != wx.getStorageSync("advice_user") && this.setData({
            user: wx.getStorageSync("advice_user")
        });
    },
    formSubmit: function(a) {
        var s = a.detail.value;
        if ("" == s.phone || /^1[3456789]\d{9}$/.test(s.phone)) if ("" != s.text) if (s.text.length < 5 || s.text.length > 200) e.default.fail("反馈内容请控制在5-200字以内"); else {
            s.openid = wx.getStorageSync("userInfo").openid;
            console.log(s)
            var n = this.getOpenerEventChannel(), i = wx.getStorageSync("city"), r = this;
            r.setData({
                disabled: "disabled"
            }), t.Util.ajax(i.interfaceUrl + "advice/add", "POST", s, !0).then(function(t) {
                if (t.errno==0) {
                    e.default.success("提交成功");
                    var a = {
                        name: s.name,
                        phone: s.phone
                    };
                    wx.setStorageSync("advice_user", a), n.emit("itsTimeToInit", {
                        r: "success"
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3);
                } else e.default.fail("提交错误");
            }).catch(function(t) {
                console.log(t), e.default.fail("提交失败"), r.setData({
                    disabled: ""
                });
            });
        } else e.default.fail("请填写反馈内容"); else e.default.fail("手机号格式错误！");
    },
    onShareAppMessage: function() {
        return t.share();
    }
});