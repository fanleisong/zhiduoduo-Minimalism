(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "checkbox",
        type: "descendant",
        linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.updateChild(e);
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(t) {
                return t !== e;
            });
        }
    },
    props: {
        max: Number,
        value: {
            type: Array,
            observer: "updateChildren"
        },
        disabled: {
            type: Boolean,
            observer: "updateChildren"
        }
    },
    methods: {
        updateChildren: function() {
            var e = this;
            (this.children || []).forEach(function(t) {
                return e.updateChild(t);
            });
        },
        updateChild: function(e) {
            var t = this.data, i = t.value, n = t.disabled;
            e.setData({
                value: -1 !== i.indexOf(e.data.name),
                disabled: n || e.data.disabled
            });
        }
    }
});