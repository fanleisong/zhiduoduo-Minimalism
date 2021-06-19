var t = require("../common/component"), i = require("../mixins/touch"), e = [];

(0, t.VantComponent)({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean,
        name: {
            type: [ Number, String ],
            value: ""
        }
    },
    mixins: [ i.touch ],
    data: {
        catchMove: !1
    },
    created: function() {
        this.offset = 0, e.push(this);
    },
    destroyed: function() {
        var t = this;
        e = e.filter(function(i) {
            return i !== t;
        });
    },
    methods: {
        open: function(t) {
            var i = this.data, e = i.leftWidth, s = i.rightWidth, n = "left" === t ? e : -s;
            this.swipeMove(n);
        },
        close: function() {
            this.swipeMove(0);
        },
        swipeMove: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.offset = t;
            var i = "translate3d(" + t + "px, 0, 0)", e = this.draging ? "none" : "transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)";
            this.setData({
                wrapperStyle: "\n        -webkit-transform: " + i + ";\n        -webkit-transition: " + e + ";\n        transform: " + i + ";\n        transition: " + e + ";\n      "
            });
        },
        swipeLeaveTransition: function() {
            var t = this.data, i = t.leftWidth, e = t.rightWidth, s = this.offset;
            e > 0 && -s > .3 * e ? this.open("right") : i > 0 && s > .3 * i ? this.open("left") : this.swipeMove(0), 
            this.setData({
                catchMove: !1
            });
        },
        startDrag: function(t) {
            var i = this;
            this.data.disabled || (e.forEach(function(t) {
                t !== i && t.close();
            }), this.draging = !0, this.startOffset = this.offset, this.firstDirection = "", 
            this.touchStart(t));
        },
        noop: function() {},
        onDrag: function(t) {
            if (!this.data.disabled && (this.touchMove(t), this.firstDirection || (this.firstDirection = this.direction, 
            this.setData({
                catchMove: "horizontal" === this.firstDirection
            })), "vertical" !== this.firstDirection)) {
                var i = this.data, e = i.leftWidth, s = i.rightWidth, n = this.startOffset + this.deltaX;
                s > 0 && -n > s || e > 0 && n > e || this.swipeMove(n);
            }
        },
        endDrag: function() {
            this.data.disabled || (this.draging = !1, this.swipeLeaveTransition());
        },
        onClick: function(t) {
            var i = t.currentTarget.dataset.key, e = void 0 === i ? "outside" : i;
            this.$emit("click", e), this.offset && (this.data.asyncClose ? this.$emit("close", {
                position: e,
                instance: this,
                name: this.data.name
            }) : this.swipeMove(0));
        }
    }
});