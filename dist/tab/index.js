(0, require("../common/component").VantComponent)({
    relation: {
        name: "tabs",
        type: "ancestor"
    },
    props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String,
        name: {
            type: [ Number, String ],
            value: "",
            observer: "setComputedName"
        }
    },
    data: {
        width: null,
        inited: !1,
        active: !1,
        animated: !1
    },
    watch: {
        title: "update",
        disabled: "update",
        dot: "update",
        info: "update",
        titleStyle: "update"
    },
    methods: {
        setComputedName: function() {
            this.computedName = this.data.name || this.index;
        },
        update: function() {
            var t = this.getRelationNodes("../tabs/index")[0];
            t && t.updateTabs();
        }
    }
});