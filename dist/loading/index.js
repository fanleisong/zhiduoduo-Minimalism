var t = require("../common/component"), e = require("../common/utils");

(0, t.VantComponent)({
    props: {
        size: {
            type: String,
            observer: "setSizeWithUnit"
        },
        type: {
            type: String,
            value: "circular"
        },
        color: {
            type: String,
            value: "#c9c9c9"
        },
        textSize: {
            type: String,
            observer: "setTextSizeWithUnit"
        },
        vertical: Boolean
    },
    data: {
        sizeWithUnit: "30px",
        textSizeWithUnit: "14px"
    },
    methods: {
        setSizeWithUnit: function(t) {
            this.setData({
                sizeWithUnit: (0, e.addUnit)(t)
            });
        },
        setTextSizeWithUnit: function(t) {
            this.set({
                textSizeWithUnit: (0, e.addUnit)(t)
            });
        }
    }
});