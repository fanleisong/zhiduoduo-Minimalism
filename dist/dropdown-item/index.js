(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "dropdown-menu",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    props: {
        value: null,
        title: String,
        disabled: Boolean,
        titleClass: String,
        options: {
            type: Array,
            value: []
        }
    },
    data: {
        transition: !0,
        showPopup: !1,
        showWrapper: !1,
        displayTitle: ""
    },
    created: function() {
        this.setData({
            displayTitle: this.computedDisplayTitle(this.data.value)
        });
    },
    methods: {
        computedDisplayTitle: function(t) {
            var e = this.data, i = e.title, a = e.options;
            if (i) return i;
            var n = a.filter(function(e) {
                return e.value === t;
            });
            return n.length ? n[0].text : "";
        },
        onClickOverlay: function() {
            this.toggle(), this.$emit("close");
        },
        onOptionTap: function(t) {
            var e = this, i = this.data, a = i.value, n = i.displayTitle, s = t.currentTarget.dataset.option.value;
            s !== a && (a = s, n = this.computedDisplayTitle(s), this.$emit("change", s)), this.setData({
                showPopup: !1,
                value: a,
                displayTitle: n
            });
            var o = this.data.duration || 0;
            setTimeout(function() {
                e.setData({
                    showWrapper: !1
                });
            }, o), this.parent.setData({
                itemListData: this.parent.data.itemListData
            });
        },
        toggle: function() {
            var t = this.data.childIndex;
            this.parent.toggleItem(t);
        }
    }
});