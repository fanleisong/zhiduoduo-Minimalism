function e(e, t) {
    e.$emit("input", t), e.$emit("change", t);
}

var t = require("../common/component"), i = require("../common/utils");

(0, t.VantComponent)({
    field: !0,
    relation: {
        name: "checkbox-group",
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
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        },
        iconSize: {
            type: null,
            observer: "setSizeWithUnit"
        }
    },
    data: {
        sizeWithUnit: "20px"
    },
    methods: {
        emitChange: function(t) {
            this.parent ? this.setParentValue(this.parent, t) : e(this, t);
        },
        toggle: function() {
            var e = this.data, t = e.disabled, i = e.value;
            t || this.emitChange(!i);
        },
        onClickLabel: function() {
            var e = this.data, t = e.labelDisabled, i = e.disabled, n = e.value;
            i || t || this.emitChange(!n);
        },
        setParentValue: function(t, i) {
            var n = t.data.value.slice(), a = this.data.name, l = t.data.max;
            if (i) {
                if (l && n.length >= l) return;
                -1 === n.indexOf(a) && (n.push(a), e(t, n));
            } else {
                var s = n.indexOf(a);
                -1 !== s && (n.splice(s, 1), e(t, n));
            }
        },
        setSizeWithUnit: function(e) {
            this.set({
                sizeWithUnit: (0, i.addUnit)(e)
            });
        }
    }
});