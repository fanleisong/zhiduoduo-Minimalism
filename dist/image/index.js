var t = require("../common/utils"), i = require("../common/component"), e = require("../mixins/button"), o = require("../mixins/open-type");

(0, i.VantComponent)({
    mixins: [ e.button, o.openType ],
    classes: [ "custom-class", "loading-class", "error-class", "image-class" ],
    props: {
        src: String,
        width: String,
        height: String,
        fit: {
            type: String,
            value: "fill"
        },
        round: Boolean,
        lazyLoad: Boolean,
        showError: {
            type: Boolean,
            value: !0
        },
        showLoading: {
            type: Boolean,
            value: !0
        },
        showMenuByLongpress: Boolean,
        useLoadingSlot: Boolean,
        useErrorSlot: Boolean
    },
    data: {
        fitWeapp: "aspectFit",
        FIT_MODE_MAP: {
            contain: "aspectFit",
            cover: "aspectFill",
            fill: "scaleToFill",
            none: "center",
            "scale-down": "aspectFit"
        },
        loading: !0,
        error: !1
    },
    watch: {
        src: function() {
            this.setData({
                loading: !0,
                error: !1
            });
        }
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            var t = this.data, i = t.FIT_MODE_MAP, e = t.fit;
            this.setData({
                mode: i[e],
                style: this.getStyle()
            });
        },
        getStyle: function() {
            var i = this.data, e = i.width, o = i.height, n = "";
            return (0, t.isDef)(e) && (n += "width: " + (0, t.addUnit)(e) + ";"), (0, t.isDef)(o) && (n += "height: " + (0, 
            t.addUnit)(o) + ";"), n;
        },
        onLoad: function(t) {
            this.setData({
                loading: !1
            }), this.$emit("load", t.detail);
        },
        onError: function(t) {
            this.setData({
                loading: !1,
                error: !0
            }), this.$emit("error", t.detail);
        },
        onClick: function(t) {
            this.$emit("click", t.detail);
        }
    }
});