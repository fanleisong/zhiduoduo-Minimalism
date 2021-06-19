var t = function() {
    function t(t, e) {
        var i = [], n = !0, a = !1, r = void 0;
        try {
            for (var o, l = t[Symbol.iterator](); !(n = (o = l.next()).done) && (i.push(o.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            a = !0, r = t;
        } finally {
            try {
                !n && l.return && l.return();
            } finally {
                if (a) throw r;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

(0, require("../common/component").VantComponent)({
    props: {
        text: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#ed6a0c"
        },
        backgroundColor: {
            type: String,
            value: "#fffbe8"
        },
        wrapable: Boolean
    },
    data: {
        show: !0
    },
    watch: {
        text: function() {
            this.setData({}, this.init);
        }
    },
    created: function() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: "linear"
        });
    },
    destroyed: function() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function() {
            var e = this;
            Promise.all([ this.getRect(".van-notice-bar__content"), this.getRect(".van-notice-bar__wrap") ]).then(function(i) {
                var n = t(i, 2), a = n[0], r = n[1];
                if (null != a && null != r && a.width && r.width) {
                    var o = e.data, l = o.speed, u = o.scrollable, s = o.delay;
                    if (u && r.width < a.width) {
                        var c = a.width / l * 1e3;
                        e.wrapWidth = r.width, e.contentWidth = a.width, e.duration = c, e.animation = wx.createAnimation({
                            duration: c,
                            timingFunction: "linear",
                            delay: s
                        }), e.scroll();
                    }
                }
            });
        },
        scroll: function() {
            var t = this;
            this.timer && clearTimeout(this.timer), this.timer = null, this.setData({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            }), setTimeout(function() {
                t.setData({
                    animationData: t.animation.translateX(-t.contentWidth).step().export()
                });
            }, 20), this.timer = setTimeout(function() {
                t.scroll();
            }, this.duration);
        },
        onClickIcon: function() {
            this.timer && clearTimeout(this.timer), this.timer = null, this.setData({
                show: !1
            });
        },
        onClick: function(t) {
            this.$emit("click", t);
        }
    }
});