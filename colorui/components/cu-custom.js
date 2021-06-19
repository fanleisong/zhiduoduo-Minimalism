var t = getApp();

Component({
    options: {
        addGlobalClass: !0,
        multipleSlots: !0
    },
    properties: {
        bgColor: {
            type: String,
            default: ""
        },
        isCustom: {
            type: [ Boolean, String ],
            default: !1
        },
        isBack: {
            type: [ Boolean, String ],
            default: !1
        },
        bgImage: {
            type: String,
            default: ""
        },
        isLocation: {
            type: [ Boolean, String ],
            default: !1
        },
        pageLength: {
            type: Number,
            default: 1
        },
        isRefresh: {
            type: [ Boolean, String ],
            default: !1
        },
        city: {
            type: String,
            default: ""
        }
    },
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        Custom: t.globalData.Custom,
        canBack: !1,
        CustomWith: t.globalData.Custom.width,
        refresh: !1,
        citynum: ""
    },
    methods: {
        BackPage: function() {
            wx.navigateBack({
                delta: 1
            });
        },
        toHome: function() {
            this.data.refresh ? wx.reLaunch({
                url: "/pages/index/index?refresh=true&citynum=" + this.data.citynum
            }) : wx.reLaunch({
                url: "/pages/index/index"
            });
        },
        goLocation: function() {
            wx.navigateTo({
                url: "/pages/location/location"
            });
        }
    },
    observers: {
        pageLength: function(t) {
            this.setData({
                canBack: t > 1,
                CustomWith: t > 1 ? this.data.Custom.width : this.data.Custom.width / 2
            });
        },
        "isRefresh, city": function(t, a) {
            t && this.setData({
                refresh: !0,
                citynum: a
            });
        }
    }
});