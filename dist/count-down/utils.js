function e(e) {
    for (var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, o = e + ""; o.length < r; ) o = "0" + o;
    return o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseTimeData = function(e) {
    return {
        days: Math.floor(e / s),
        hours: Math.floor(e % s / t),
        minutes: Math.floor(e % t / o),
        seconds: Math.floor(e % o / r),
        milliseconds: Math.floor(e % r)
    };
}, exports.parseFormat = function(r, o) {
    var t = o.days, s = o.hours, n = o.minutes, a = o.seconds, l = o.milliseconds;
    return -1 === r.indexOf("DD") ? s += 24 * t : r = r.replace("DD", e(t)), -1 === r.indexOf("HH") ? n += 60 * s : r = r.replace("HH", e(s)), 
    -1 === r.indexOf("mm") ? a += 60 * n : r = r.replace("mm", e(n)), -1 === r.indexOf("ss") ? l += 1e3 * a : r = r.replace("ss", e(a)), 
    r.replace("SSS", e(l, 3));
}, exports.isSameSecond = function(e, r) {
    return Math.floor(e / 1e3) === Math.floor(r / 1e3);
};

var r = 1e3, o = 60 * r, t = 60 * o, s = 24 * t;