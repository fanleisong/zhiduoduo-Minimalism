var t = function() {
    return new Promise(function(t) {
        return setTimeout(t, 20);
    });
};

(0, require("../common/component").VantComponent)({
    classes: [ "title-class", "content-class" ],
    relation: {
        name: "collapse",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        contentHeight: 0,
        expanded: !1,
        transition: !1
    },
    mounted: function() {
        var n = this;
        this.updateExpanded().then(t).then(function() {
            var t = {
                transition: !0
            };
            n.data.expanded && (t.contentHeight = "auto"), n.setData(t);
        });
    },
    methods: {
        updateExpanded: function() {
            if (!this.parent) return Promise.resolve();
            var t = this.parent.data, n = t.value, e = t.accordion, a = this.parent.children, i = void 0 === a ? [] : a, o = this.data.name, s = i.indexOf(this), r = null == o ? s : o, d = e ? n === r : (n || []).some(function(t) {
                return t === r;
            }), u = [];
            return d !== this.data.expanded && u.push(this.updateStyle(d)), u.push(this.set({
                index: s,
                expanded: d
            })), Promise.all(u);
        },
        updateStyle: function(n) {
            var e = this;
            return this.getRect(".van-collapse-item__content").then(function(t) {
                return t.height;
            }).then(function(a) {
                return n ? e.set({
                    contentHeight: a ? a + "px" : "auto"
                }) : e.set({
                    contentHeight: a + "px"
                }).then(t).then(function() {
                    return e.set({
                        contentHeight: 0
                    });
                });
            });
        },
        onClick: function() {
            if (!this.data.disabled) {
                var t = this.data, n = t.name, e = t.expanded, a = this.parent.children.indexOf(this), i = null == n ? a : n;
                this.parent.switch(i, !e);
            }
        },
        onTransitionEnd: function() {
            this.data.expanded && this.setData({
                contentHeight: "auto"
            });
        }
    }
});