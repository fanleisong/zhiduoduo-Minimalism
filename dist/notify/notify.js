function e(e) {
    return "string" == typeof e ? {
        message: e
    } : e;
}

function t() {
    var e = getCurrentPages();
    return e[e.length - 1];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o) {
    var r = ((o = Object.assign({}, n, e(o))).context || t()).selectComponent(o.selector);
    delete o.context, delete o.selector, r ? (r.set(o), r.show()) : console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
};

var n = {
    selector: "#van-notify",
    type: "danger",
    message: "",
    background: "",
    duration: 3e3,
    zIndex: 110,
    color: require("../common/color").WHITE,
    safeAreaInsetTop: !1,
    onClick: function() {},
    onOpened: function() {},
    onClose: function() {}
};