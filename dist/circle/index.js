function e(e) {
    return Math.min(Math.max(e, 0), 100);
}

var t = require("../common/component"), r = require("../common/utils"), a = require("../common/color"), i = 2 * Math.PI, n = -Math.PI / 2;

(0, t.VantComponent)({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: "round"
        },
        value: {
            type: Number,
            value: 0,
            observer: "reRender"
        },
        speed: {
            type: Number,
            value: 50
        },
        size: {
            type: Number,
            value: 100,
            observer: "setStyle"
        },
        fill: String,
        layerColor: {
            type: String,
            value: a.WHITE
        },
        color: {
            type: [ String, Object ],
            value: a.BLUE,
            observer: "setHoverColor"
        },
        strokeWidth: {
            type: Number,
            value: 4
        },
        clockwise: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        style: "width: 100px; height: 100px;",
        hoverColor: a.BLUE
    },
    methods: {
        getContext: function() {
            return this.ctx || (this.ctx = wx.createCanvasContext("van-circle", this)), this.ctx;
        },
        setHoverColor: function() {
            var e = this.getContext(), t = this.data, a = t.color, i = t.size, n = a;
            if ((0, r.isObj)(a)) {
                var l = e.createLinearGradient(i, 0, 0, 0);
                Object.keys(a).sort(function(e, t) {
                    return parseFloat(e) - parseFloat(t);
                }).map(function(e) {
                    return l.addColorStop(parseFloat(e) / 100, a[e]);
                }), n = l;
            }
            this.setData({
                hoverColor: n
            });
        },
        setStyle: function() {
            var e = this.data.size, t = "width: " + e + "px; height: " + e + "px;";
            this.setData({
                style: t
            });
        },
        presetCanvas: function(e, t, r, a, i) {
            var n = this.data, l = n.strokeWidth, o = n.lineCap, s = n.clockwise, c = n.size / 2, u = c - l / 2;
            e.setStrokeStyle(t), e.setLineWidth(l), e.setLineCap(o), e.beginPath(), e.arc(c, c, u, r, a, !s), 
            e.stroke(), i && (e.setFillStyle(i), e.fill());
        },
        renderLayerCircle: function(e) {
            var t = this.data, r = t.layerColor, a = t.fill;
            this.presetCanvas(e, r, 0, i, a);
        },
        renderHoverCircle: function(e, t) {
            var r = this.data, a = r.clockwise, l = r.hoverColor, o = i * (t / 100), s = a ? n + o : 3 * Math.PI - (n + o);
            this.presetCanvas(e, l, n, s);
        },
        drawCircle: function(t) {
            var r = this.getContext(), a = this.data.size;
            r.clearRect(0, 0, a, a), this.renderLayerCircle(r);
            var i = e(t);
            0 !== i && this.renderHoverCircle(r, i), r.draw();
        },
        reRender: function() {
            var e = this, t = this.data, r = t.value, a = t.speed;
            a <= 0 || a > 1e3 ? this.drawCircle(r) : (this.clearInterval(), this.currentValue = this.currentValue || 0, 
            this.interval = setInterval(function() {
                e.currentValue !== r ? (e.currentValue < r ? e.currentValue += 1 : e.currentValue -= 1, 
                e.drawCircle(e.currentValue)) : e.clearInterval();
            }, 1e3 / a));
        },
        clearInterval: function(e) {
            function t() {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function() {
            this.interval && (clearInterval(this.interval), this.interval = null);
        })
    },
    created: function() {
        var e = this.data.value;
        this.currentValue = e, this.drawCircle(e);
    },
    destroyed: function() {
        this.ctx = null, this.clearInterval();
    }
});