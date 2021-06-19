(0, require("../common/component").VantComponent)({
    relation: {
        name: "grid-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e);
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(t) {
                return t !== e;
            });
        }
    },
    props: {
        square: {
            type: Boolean,
            observer: "updateChildren"
        },
        gutter: {
            type: [ Number, String ],
            value: 0,
            observer: "updateChildren"
        },
        clickable: {
            type: Boolean,
            observer: "updateChildren"
        },
        columnNum: {
            type: Number,
            value: 4,
            observer: "updateChildren"
        },
        center: {
            type: Boolean,
            value: !0,
            observer: "updateChildren"
        },
        border: {
            type: Boolean,
            value: !0,
            observer: "updateChildren"
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    created: function() {
        var e = this.data.gutter;
        e && this.setData({
            style: "padding-left: " + e + "px"
        });
    },
    methods: {
        updateChildren: function() {
            this.children.forEach(function(e) {
                e.updateStyle();
            });
        }
    }
});