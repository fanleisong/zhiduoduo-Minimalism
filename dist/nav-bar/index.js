(0, require("../common/component").VantComponent)({
    classes: [ "title-class" ],
    props: {
        title: String,
        fixed: Boolean,
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        statusBarHeight: 0
    },
    created: function() {
        var t = wx.getSystemInfoSync().statusBarHeight;
        this.setData({
            statusBarHeight: t
        });
    },
    methods: {
        onClickLeft: function() {
            this.$emit("click-left");
        },
        onClickRight: function() {
            this.$emit("click-right");
        }
    }
});