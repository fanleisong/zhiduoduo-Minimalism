(0, require("../common/component").VantComponent)({
    relation: {
        type: "ancestor",
        name: "sidebar",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String
    },
    methods: {
        onClick: function() {
            var t = this, e = this.parent;
            if (e) {
                var n = e.items.indexOf(this);
                e.setActive(n).then(function() {
                    t.$emit("click", n), e.$emit("change", n);
                });
            }
        },
        setActive: function(t) {
            return this.setData({
                active: t
            });
        }
    }
});