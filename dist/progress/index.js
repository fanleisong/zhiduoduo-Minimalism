var t = require("../common/component"), o = require("../common/color"), e = require("../common/utils");

(0, t.VantComponent)({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        trackColor: String,
        showPivot: {
            type: Boolean,
            value: !0
        },
        color: {
            type: String,
            value: o.BLUE
        },
        textColor: {
            type: String,
            value: "#fff"
        },
        strokeWidth: {
            type: null,
            observer: "setStrokeWidthUnit"
        }
    },
    data: {
        strokeWidthUnit: "4px"
    },
    methods: {
        setStrokeWidthUnit: function(t) {
            this.setData({
                strokeWidthUnit: (0, e.addUnit)(t)
            });
        }
    }
});