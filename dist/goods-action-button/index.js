var t = require("../common/component"), i = require("../mixins/link"), n = require("../mixins/button"), e = require("../mixins/open-type");

(0, t.VantComponent)({
    mixins: [ i.link, n.button, e.openType ],
    relation: {
        type: "ancestor",
        name: "goods-action",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    mounted: function() {
        this.updateStyle();
    },
    methods: {
        onClick: function(t) {
            this.$emit("click", t.detail), this.jumpLink();
        },
        updateStyle: function() {
            var t = this.parent.children, i = void 0 === t ? [] : t, n = i.indexOf(this), e = i.length, o = !1, r = !1;
            0 === n && (o = !0), n === e - 1 && (r = !0), this.setData({
                isFirst: o,
                isLast: r
            });
        }
    }
});