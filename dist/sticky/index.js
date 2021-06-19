var t = require("../common/component"), e = require("../common/utils");

(0, t.VantComponent)({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        position: "",
        height: 0,
        wrapStyle: "",
        containerStyle: ""
    },
    methods: {
        setWrapStyle: function() {
            var t = this.data, e = t.offsetTop, i = void 0, o = void 0;
            switch (t.position) {
              case "top":
                i = "\n            top: " + e + "px;\n            position: fixed;\n          ", 
                o = "height: " + this.itemHeight + "px;";
                break;

              case "bottom":
                i = "\n            top: auto;\n            bottom: 0;\n          ", o = "";
                break;

              default:
                i = "", o = "";
            }
            var n = {};
            i !== this.data.wrapStyle && (n.wrapStyle = i), o !== this.data.containerStyle && (n.containerStyle = o), 
            "{}" !== JSON.stringify(n) && this.setData(n);
        },
        setPosition: function(t) {
            var i = this;
            t !== this.data.position && (this.setData({
                position: t
            }), (0, e.nextTick)(function() {
                i.setWrapStyle();
            }));
        },
        observerContentScroll: function() {
            var t = this, e = this.data.offsetTop, i = void 0 === e ? 0 : e, o = wx.getSystemInfoSync().windowHeight;
            this.createIntersectionObserver({}).disconnect(), this.createIntersectionObserver().relativeToViewport({
                top: -(this.itemHeight + i)
            }).observe(".van-sticky", function(e) {
                var o = e.boundingClientRect.top;
                if (!(o > i)) {
                    t.$emit("scroll", {
                        scrollTop: o + i,
                        isFixed: !0
                    }), t.setPosition("top");
                }
            }), this.createIntersectionObserver().relativeToViewport({
                bottom: -(o - 1 - i)
            }).observe(".van-sticky", function(e) {
                var o = e.boundingClientRect, n = o.top;
                if (!(o.bottom <= t.itemHeight - 1)) {
                    var s = e.intersectionRatio > 0 ? "top" : "";
                    t.$emit("scroll", {
                        scrollTop: n + i,
                        isFixed: "top" === s
                    }), t.setPosition(s);
                }
            });
        }
    },
    mounted: function() {
        var t = this;
        this.getRect(".van-sticky").then(function(e) {
            t.itemHeight = e.height, t.itemTop = e.top, t.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver({}).disconnect();
    }
});