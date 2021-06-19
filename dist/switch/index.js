var a = require("../common/component"), e = require("../common/color");

(0, a.VantComponent)({
    field: !0,
    classes: [ "node-class" ],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: "30px"
        },
        activeValue: {
            type: null,
            value: !0
        },
        inactiveValue: {
            type: null,
            value: !1
        }
    },
    watch: {
        checked: function(a) {
            var e = this.getLoadingColor(a);
            this.setData({
                value: a,
                loadingColor: e
            });
        }
    },
    created: function() {
        var a = this.data.checked, e = this.getLoadingColor(a);
        this.setData({
            value: a,
            loadingColor: e
        });
    },
    methods: {
        getLoadingColor: function(a) {
            var t = this.data, i = t.activeColor, o = t.inactiveColor;
            return a ? i || e.BLUE : o || e.GRAY_DARK;
        },
        onClick: function() {
            var a = this.data, e = a.activeValue, t = a.inactiveValue;
            if (!this.data.disabled && !this.data.loading) {
                var i = this.data.checked === e ? t : e;
                this.$emit("input", i), this.$emit("change", i);
            }
        }
    }
});