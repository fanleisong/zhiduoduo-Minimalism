var t = require("../mixins/link");

(0, require("../common/component").VantComponent)({
    relation: {
        name: "grid",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    mixins: [ t.link ],
    props: {
        icon: String,
        dot: Boolean,
        info: null,
        text: String,
        useSlot: Boolean
    },
    mounted: function() {
        this.updateStyle();
    },
    methods: {
        updateStyle: function() {
            if (this.parent) {
                var t = this.parent, n = t.data, i = t.children, e = n.columnNum, o = n.border, r = n.square, a = n.gutter, s = n.clickable, u = n.center, p = 100 / e + "%", c = [];
                c.push("width: " + p), r && c.push("padding-top: " + p), a && (c.push("padding-right: " + a + "px"), 
                i.indexOf(this) >= e && c.push("margin-top: " + a + "px")), this.setData({
                    style: c.join("; "),
                    center: u,
                    border: o,
                    square: r,
                    gutter: a,
                    clickable: s
                });
            }
        },
        onClick: function() {
            this.$emit("click"), this.jumpLink();
        }
    }
});