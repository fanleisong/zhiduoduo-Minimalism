var e = require("../common/component"), n = require("../common/utils");

(0, e.VantComponent)({
    field: !0,
    relation: {
        name: "radio-group",
        type: "ancestor",
        linked: function(e) {
            this.parent = e;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            value: "right"
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        },
        iconSize: {
            type: null,
            observer: "setIconSizeUnit"
        }
    },
    data: {
        iconSizeWithUnit: "20px"
    },
    methods: {
        setIconSizeUnit: function(e) {
            this.setData({
                iconSizeWithUnit: (0, n.addUnit)(e)
            });
        },
        emitChange: function(e) {
            var n = this.parent || this;
            n.$emit("input", e), n.$emit("change", e);
        },
        onChange: function(e) {
            console.log(e), this.emitChange(this.data.name);
        },
        onClickLabel: function() {
            var e = this.data, n = e.disabled, i = e.labelDisabled, t = e.name;
            n || i || this.emitChange(t);
        }
    }
});