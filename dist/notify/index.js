var e = require("../common/component"), t = require("../common/color");

(0, e.VantComponent)({
    props: {
        message: String,
        background: String,
        type: {
            type: String,
            value: "danger"
        },
        color: {
            type: String,
            value: t.WHITE
        },
        duration: {
            type: Number,
            value: 3e3
        },
        zIndex: {
            type: Number,
            value: 110
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        show: function() {
            var e = this, t = this.data, o = t.duration, a = t.onOpened;
            clearTimeout(this.timer), this.setData({
                show: !0
            }, a), o > 0 && o !== 1 / 0 && (this.timer = setTimeout(function() {
                e.hide();
            }, o));
        },
        hide: function() {
            var e = this.data.onClose;
            clearTimeout(this.timer), this.setData({
                show: !1
            }, e);
        },
        onTap: function(e) {
            var t = this.data.onClick;
            t && t(e.detail);
        }
    }
});