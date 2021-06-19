var t = require("../common/component"), e = require("../common/utils"), i = [];

(0, t.VantComponent)({
    field: !0,
    relation: {
        name: "dropdown-item",
        type: "descendant",
        linked: function(t) {
            this.children = this.children || [];
            var e = this.data, i = e.overlay, a = e.duration, n = e.activeColor, o = e.closeOnClickOverlay, r = e.direction;
            this.updateChildData(t, {
                overlay: i,
                duration: a,
                activeColor: n,
                closeOnClickOverlay: o,
                direction: r,
                childIndex: this.children.length
            }), this.children.push(t), t && this.setData({
                itemListData: this.data.itemListData.concat([ t.data ])
            });
        },
        unlinked: function(t) {
            this.children = this.children.filter(function(e) {
                return e !== t;
            });
        }
    },
    props: {
        activeColor: String,
        overlay: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 10
        },
        duration: {
            type: Number,
            value: 200
        },
        direction: {
            type: String,
            value: "down"
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOutside: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        itemListData: []
    },
    created: function() {
        i.push(this);
    },
    destroyed: function() {
        var t = this;
        i = i.filter(function(e) {
            return e !== t;
        });
    },
    methods: {
        updateChildData: function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            t.setData(e), i && this.setData({
                itemListData: this.data.itemListData
            });
        },
        toggleItem: function(t) {
            var e = this;
            this.children.forEach(function(i, a) {
                var n = i.data.showPopup;
                a === t ? e.toggleChildItem(i) : n && e.toggleChildItem(i, !1, {
                    immediate: !0
                });
            });
        },
        toggleChildItem: function(t, e) {
            var i = this, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n = t.data, o = n.showPopup, r = n.duration;
            if (void 0 === e && (e = !o), e !== o) {
                var d = {
                    transition: !a.immediate,
                    showPopup: e
                };
                if (!e) {
                    var l = a.immediate ? 0 : r;
                    return this.updateChildData(t, Object.assign({}, d), !0), void setTimeout(function() {
                        i.updateChildData(t, {
                            showWrapper: !1
                        }, !0);
                    }, l);
                }
                this.getChildWrapperStyle().then(function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    i.updateChildData(t, Object.assign(Object.assign({}, d), {
                        wrapperStyle: e,
                        showWrapper: !0
                    }), !0);
                });
            }
        },
        close: function() {
            var t = this;
            this.children.forEach(function(e) {
                t.toggleChildItem(e, !1, {
                    immediate: !0
                });
            });
        },
        getChildWrapperStyle: function() {
            var t = wx.getSystemInfoSync().windowHeight, i = this.data, a = i.zIndex, n = i.direction, o = 0;
            return this.getRect(".van-dropdown-menu").then(function(i) {
                var r = i.top, d = void 0 === r ? 0 : r, l = i.bottom, s = void 0 === l ? 0 : l;
                o = "down" === n ? s : t - d;
                var c = "z-index: " + a + ";";
                return c += "down" === n ? "top: " + (0, e.addUnit)(o) + ";" : "bottom: " + (0, 
                e.addUnit)(o) + ";", Promise.resolve(c);
            });
        },
        onTitleTap: function(t) {
            var e = this, a = t.currentTarget.dataset, n = a.item, o = a.index;
            n.disabled || (i.forEach(function(t) {
                t && t.data.closeOnClickOutside && t !== e && t.close();
            }), this.toggleItem(o));
        }
    }
});