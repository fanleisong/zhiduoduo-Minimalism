var e = require("../common/component"), t = require("../common/color");

(0, e.VantComponent)({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: "horizontal"
        },
        activeColor: {
            type: String,
            value: t.GREEN
        },
        activeIcon: {
            type: String,
            value: "checked"
        },
        inactiveIcon: String
    }
});