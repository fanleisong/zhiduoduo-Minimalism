(0, require("../common/component").VantComponent)({
    relation: {
        name: "sidebar-item",
        type: "descendant",
        linked: function(t) {
            this.items.push(t), this.setActive(this.data.active);
        },
        unlinked: function(t) {
            this.items = this.items.filter(function(e) {
                return e !== t;
            }), this.setActive(this.data.active);
        }
    },
    props: {
        active: {
            type: Number,
            value: 0,
            observer: "setActive"
        }
    },
    beforeCreate: function() {
        this.items = [], this.currentActive = -1;
    },
    methods: {
        setActive: function(t) {
            var e = this.items, i = this.currentActive;
            if (!e.length) return Promise.resolve();
            this.currentActive = t;
            var s = [];
            return i !== t && e[i] && s.push(e[i].setActive(!1)), e[t] && s.push(e[t].setActive(!0)), 
            Promise.all(s);
        }
    }
});