var e = require("../common/component"), t = require("../mixins/button"), o = require("../mixins/open-type");

(0, e.VantComponent)({
    mixins: [ t.button, o.openType ],
    classes: [ "hover-class", "loading-class" ],
    data: {
        style: ""
    },
    props: {
        icon: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: "circular"
        },
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        },
        color: {
            type: String,
            observer: function(e) {
                var t = "";
                e && (t += "color: " + (this.data.plain ? e : "white") + ";", this.data.plain || (t += "background: " + e + ";"), 
                -1 !== e.indexOf("gradient") ? t += "border: 0;" : t += "border-color: " + e + ";"), 
                t !== this.data.style && this.setData({
                    style: t
                });
            }
        }
    },
    methods: {
        onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click");
        }
    }
});