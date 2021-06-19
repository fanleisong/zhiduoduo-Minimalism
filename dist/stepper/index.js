function t(t, e) {
    var i = Math.pow(10, 10);
    return Math.round((t + e) * i) / i;
}

var e = require("../common/component"), i = require("../common/utils");

(0, e.VantComponent)({
    field: !0,
    classes: [ "input-class", "plus-class", "minus-class" ],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: null,
        buttonSize: null,
        asyncChange: Boolean,
        disableInput: Boolean,
        decimalLength: {
            type: Number,
            value: null
        },
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            value: 1
        },
        showPlus: {
            type: Boolean,
            value: !0
        },
        showMinus: {
            type: Boolean,
            value: !0
        }
    },
    watch: {
        value: function(t) {
            if ("" !== t) {
                var e = this.range(t);
                "number" == typeof e && +this.data.value !== e && this.setData({
                    value: e
                });
            }
        },
        inputWidth: function() {
            this.set({
                inputStyle: this.computeInputStyle()
            });
        },
        buttonSize: function() {
            this.set({
                inputStyle: this.computeInputStyle(),
                buttonStyle: this.computeButtonStyle()
            });
        }
    },
    data: {
        focus: !1,
        inputStyle: "",
        buttonStyle: ""
    },
    created: function() {
        this.setData({
            value: this.range(this.data.value)
        });
    },
    methods: {
        isDisabled: function(t) {
            return "plus" === t ? this.data.disabled || this.data.value >= this.data.max : this.data.disabled || this.data.value <= this.data.min;
        },
        onFocus: function(t) {
            this.$emit("focus", t.detail);
        },
        onBlur: function(t) {
            var e = this.range(this.data.value);
            this.triggerInput(e), this.$emit("blur", t.detail);
        },
        range: function(t) {
            return t = String(t).replace(/[^0-9.-]/g, ""), t = "" === t ? 0 : +t, t = Math.max(Math.min(this.data.max, t), this.data.min), 
            (0, i.isDef)(this.data.decimalLength) && (t = t.toFixed(this.data.decimalLength)), 
            t;
        },
        onInput: function(t) {
            var e = (t.detail || {}).value, i = void 0 === e ? "" : e;
            this.triggerInput(i);
        },
        onChange: function() {
            var e = this.type;
            if (this.isDisabled(e)) this.$emit("overlimit", e); else {
                var i = "minus" === e ? -this.data.step : +this.data.step, a = t(+this.data.value, i);
                this.triggerInput(this.range(a)), this.$emit(e);
            }
        },
        longPressStep: function() {
            var t = this;
            this.longPressTimer = setTimeout(function() {
                t.onChange(), t.longPressStep();
            }, 200);
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.type;
            this.type = e, this.onChange();
        },
        onTouchStart: function(t) {
            var e = this;
            clearTimeout(this.longPressTimer);
            var i = t.currentTarget.dataset.type;
            this.type = i, this.isLongPress = !1, this.longPressTimer = setTimeout(function() {
                e.isLongPress = !0, e.onChange(), e.longPressStep();
            }, 600);
        },
        onTouchEnd: function() {
            clearTimeout(this.longPressTimer);
        },
        triggerInput: function(t) {
            this.setData({
                value: this.data.asyncChange ? this.data.value : t
            }), this.$emit("change", t);
        },
        computeInputStyle: function() {
            var t = "";
            return this.data.inputWidth && (t = "width: " + (0, i.addUnit)(this.data.inputWidth) + ";"), 
            this.data.buttonSize && (t += "height: " + (0, i.addUnit)(this.data.buttonSize) + ";"), 
            t;
        },
        computeButtonStyle: function() {
            var t = "", e = (0, i.addUnit)(this.data.buttonSize);
            return this.data.buttonSize && (t = "width: " + e + ";height: " + e + ";"), t;
        }
    }
});