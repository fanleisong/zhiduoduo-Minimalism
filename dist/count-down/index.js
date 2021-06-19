function t(t) {
    return setTimeout(t, 30);
}

var i = require("../common/component"), e = require("./utils");

(0, i.VantComponent)({
    props: {
        useSlot: Boolean,
        millisecond: Boolean,
        time: {
            type: Number,
            observer: "reset"
        },
        format: {
            type: String,
            value: "HH:mm:ss"
        },
        autoStart: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        timeData: (0, e.parseTimeData)(0),
        formattedTime: "0"
    },
    methods: {
        start: function() {
            this.counting || (this.counting = !0, this.endTime = Date.now() + this.remain, this.tick());
        },
        pause: function() {
            this.counting = !1, clearTimeout(this.tid);
        },
        reset: function() {
            this.pause(), this.remain = this.data.time, this.setRemain(this.remain), this.data.autoStart && this.start();
        },
        tick: function() {
            this.data.millisecond ? this.microTick() : this.macroTick();
        },
        microTick: function() {
            var i = this;
            this.tid = t(function() {
                i.setRemain(i.getRemain()), 0 !== i.remain && i.microTick();
            });
        },
        macroTick: function() {
            var i = this;
            this.tid = t(function() {
                var t = i.getRemain();
                (0, e.isSameSecond)(t, i.remain) && 0 !== t || i.setRemain(t), 0 !== i.remain && i.macroTick();
            });
        },
        getRemain: function() {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain: function(t) {
            this.remain = t;
            var i = (0, e.parseTimeData)(t);
            this.data.useSlot && this.$emit("change", i), this.setData({
                formattedTime: (0, e.parseFormat)(this.data.format, i)
            }), 0 === t && (this.pause(), this.$emit("finish"));
        }
    }
});