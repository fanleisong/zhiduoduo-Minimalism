function t(t, n, e) {
    return n in t ? Object.defineProperty(t, n, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[n] = e, t;
}

var n = require("../common/component"), e = require("../mixins/button"), o = require("../mixins/open-type"), i = require("../common/utils"), a = require("../common/color");

(0, n.VantComponent)({
    mixins: [ e.button, o.openType ],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: {
            type: null,
            observer: "setWidthWithUnit"
        },
        zIndex: {
            type: Number,
            value: 2e3
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        confirmButtonColor: {
            type: String,
            value: a.BLUE
        },
        cancelButtonColor: {
            type: String,
            value: a.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        }
    },
    watch: {
        show: function(t) {
            !t && this.stopLoading();
        }
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.onClose("overlay");
        },
        handleAction: function(n) {
            this.data.asyncClose && this.setData(t({}, "loading." + n, !0)), this.onClose(n);
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        stopLoading: function() {
            this.setData({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        onClose: function(t) {
            this.data.asyncClose || this.close(), this.$emit("close", t), this.$emit(t, {
                dialog: this
            });
            var n = this.data["confirm" === t ? "onConfirm" : "onCancel"];
            n && n(this);
        },
        setWidthWithUnit: function(t) {
            this.setData({
                widthWithUnit: (0, i.addUnit)(t)
            });
        }
    }
});