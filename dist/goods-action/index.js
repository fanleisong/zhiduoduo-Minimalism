(0, require("../common/component").VantComponent)({
    relation: {
        type: "descendant",
        name: "goods-action-button",
        linked: function(n) {
            this.children.push(n);
        },
        unlinked: function(n) {
            this.children = this.children.filter(function(e) {
                return e !== n;
            });
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    }
});