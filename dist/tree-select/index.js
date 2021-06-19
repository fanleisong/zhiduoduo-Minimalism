(0, require("../common/component").VantComponent)({
    classes: [ "main-item-class", "content-item-class", "main-active-class", "content-active-class", "main-disabled-class", "content-disabled-class" ],
    props: {
        items: Array,
        activeId: null,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        maxHeight: {
            type: Number,
            value: 300
        },
        max: {
            type: Number,
            value: 1 / 0
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items: function() {
            var t = this;
            this.updateSubItems().then(function() {
                t.updateMainHeight();
            });
        },
        maxHeight: function() {
            this.updateItemHeight(this.data.subItems), this.updateMainHeight();
        },
        mainActiveIndex: "updateSubItems"
    },
    methods: {
        onSelectItem: function(t) {
            var e = t.currentTarget.dataset.item, a = Array.isArray(this.data.activeId), i = a && this.data.activeId.length >= this.data.max, s = a ? this.data.activeId.indexOf(e.id) > -1 : this.data.activeId === e.id;
            e.disabled || i && !s || this.$emit("click-item", e);
        },
        onClickNav: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.items[e].disabled || this.$emit("click-nav", {
                index: e
            });
        },
        updateSubItems: function() {
            var t = this.data, e = (t.items[t.mainActiveIndex] || {}).children, a = void 0 === e ? [] : e;
            return this.updateItemHeight(a), this.set({
                subItems: a
            });
        },
        updateMainHeight: function() {
            var t = this.data, e = t.items, a = void 0 === e ? [] : e, i = t.subItems, s = void 0 === i ? [] : i, n = Math.max(44 * a.length, 44 * s.length);
            this.setData({
                mainHeight: Math.min(n, this.data.maxHeight)
            });
        },
        updateItemHeight: function(t) {
            var e = Math.min(44 * t.length, this.data.maxHeight);
            return this.setData({
                itemHeight: e
            });
        }
    }
});