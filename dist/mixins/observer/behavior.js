Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.behavior = Behavior({
    methods: {
        set: function(e, t) {
            var o = this;
            return new Promise(function(n) {
                o.setData(e, function() {
                    t && "function" == typeof t && t.call(o), n();
                });
            });
        }
    }
});