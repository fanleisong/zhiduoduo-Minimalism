var t = function() {
    function t(t, e) {
        var i = [], n = !0, a = !1, s = void 0;
        try {
            for (var r, o = t[Symbol.iterator](); !(n = (r = o.next()).done) && (i.push(r.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            a = !0, s = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (a) throw s;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../common/component"), i = require("../mixins/touch"), n = require("../common/utils");

(0, e.VantComponent)({
    mixins: [ i.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            t.index = this.children.length, t.setComputedName(), this.children.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.children.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.children.splice(e, 1);
            for (var n = e; n >= 0 && n < this.children.length; ) {
                var a = this.children[n];
                a.index--, a.setComputedName(), n++;
            }
            this.updateTabs(i);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: [ String, Number ],
            value: -1
        },
        lineHeight: {
            type: [ String, Number ],
            value: -1
        },
        active: {
            type: [ String, Number ],
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        wrapStyle: "",
        position: "",
        currentIndex: 0
    },
    watch: {
        swipeThreshold: function() {
            this.setData({
                scrollable: this.children.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        lineHeight: "setLine",
        active: "setActiveTab",
        animated: "setTrack",
        offsetTop: "setWrapStyle"
    },
    beforeCreate: function() {
        this.children = [];
    },
    mounted: function() {
        var t = this;
        this.setLine(!0), this.setTrack(), this.scrollIntoView(), this.getRect(".van-tabs__wrap").then(function(e) {
            t.navHeight = e.height, t.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.setData({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            var i = this.data, n = i.tabs, a = i.currentIndex;
            this.$emit(t, {
                name: e,
                title: n[a].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index, i = this.children[e];
            this.data.tabs[e].disabled ? this.trigger("disabled", i.computedName) : (this.trigger("click", i.computedName), 
            this.setActive(i.computedName));
        },
        setActive: function(t) {
            t !== this.currentName && (this.currentName = t, this.trigger("change", t), this.setActiveTab());
        },
        setLine: function(t) {
            var e = this;
            if ("line" === this.data.type) {
                var i = this.data, a = i.color, s = i.duration, r = i.currentIndex, o = i.lineWidth, c = i.lineHeight;
                this.getRect(".van-tab", !0).then(function(i) {
                    var h = i[r], l = -1 !== o ? o : h.width / 2, d = -1 !== c ? "height: " + (0, n.addUnit)(c) + "; border-radius: " + (0, 
                    n.addUnit)(c) + ";" : "", u = i.slice(0, r).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    u += (h.width - l) / 2;
                    var v = t ? "" : "transition-duration: " + s + "s; -webkit-transition-duration: " + s + "s;";
                    e.setData({
                        lineStyle: "\n            " + d + "\n            width: " + (0, n.addUnit)(l) + ";\n            background-color: " + a + ";\n            -webkit-transform: translateX(" + u + "px);\n            transform: translateX(" + u + "px);\n            " + v + "\n          "
                    });
                });
            }
        },
        setTrack: function() {
            var t = this, e = this.data, i = e.animated, n = e.duration, a = e.currentIndex;
            if (!i) return "";
            this.getRect(".van-tabs__content").then(function(e) {
                var s = e.width;
                t.setData({
                    trackStyle: "\n              width: " + s * t.children.length + "px;\n              left: " + -1 * a * s + "px;\n              transition: left " + n + "s;\n              display: -webkit-box;\n              display: flex;\n            "
                });
                var r = {
                    width: s,
                    animated: i
                };
                t.children.forEach(function(t) {
                    t.setData(r);
                });
            });
        },
        setActiveTab: function() {
            var t = this;
            (0, n.isDef)(this.currentName) || (this.currentName = this.data.active || (this.children[0] || {}).computedName), 
            this.children.forEach(function(e, i) {
                var n = {
                    active: e.computedName === t.currentName
                };
                n.active && (t.setData({
                    currentIndex: i
                }), n.inited = !0), n.active !== e.data.active && e.setData(n);
            }), (0, n.nextTick)(function() {
                t.setLine(), t.setTrack(), t.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var e = this, i = this.data, n = i.currentIndex;
            i.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(i) {
                var a = t(i, 2), s = a[0], r = a[1], o = s[n], c = s.slice(0, n).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                e.setData({
                    scrollLeft: c - (r.width - o.width) / 2
                });
            });
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.tabs, i = t.currentIndex, n = this.direction, a = this.deltaX, s = this.offsetX;
                "horizontal" === n && s >= 50 && (a > 0 && 0 !== i ? this.setActive(this.children[i - 1].computedName) : a < 0 && i !== e.length - 1 && this.setActive(this.children[i + 1].computedName));
            }
        },
        setWrapStyle: function() {
            var t = this.data, e = t.offsetTop, i = void 0;
            switch (t.position) {
              case "top":
                i = "\n            top: " + e + "px;\n            position: fixed;\n          ";
                break;

              case "bottom":
                i = "\n            top: auto;\n            bottom: 0;\n          ";
                break;

              default:
                i = "";
            }
            i !== this.data.wrapStyle && this.setData({
                wrapStyle: i
            });
        },
        observerContentScroll: function() {
            var t = this;
            if (this.data.sticky) {
                var e = this.data.offsetTop, i = wx.getSystemInfoSync().windowHeight;
                this.createIntersectionObserver().disconnect(), this.createIntersectionObserver().relativeToViewport({
                    top: -(this.navHeight + e)
                }).observe(".van-tabs", function(i) {
                    var n = i.boundingClientRect.top;
                    if (!(n > e)) {
                        var a = i.intersectionRatio > 0 ? "top" : "bottom";
                        t.$emit("scroll", {
                            scrollTop: n + e,
                            isFixed: "top" === a
                        }), t.setPosition(a);
                    }
                }), this.createIntersectionObserver().relativeToViewport({
                    bottom: -(i - 1 - e)
                }).observe(".van-tabs", function(i) {
                    var n = i.boundingClientRect, a = n.top;
                    if (!(n.bottom < t.navHeight)) {
                        var s = i.intersectionRatio > 0 ? "top" : "";
                        t.$emit("scroll", {
                            scrollTop: a + e,
                            isFixed: "top" === s
                        }), t.setPosition(s);
                    }
                });
            }
        },
        setPosition: function(t) {
            var e = this;
            t !== this.data.position && this.set({
                position: t
            }).then(function() {
                e.setWrapStyle();
            });
        }
    }
});