Component({
    data: {
        selected: 0,
        color: "#aaaaaa",
        selectedColor: "#d71318",
        list: [ {
            pagePath: "/pages/index/index",
            iconPath: "/images/tabbar/home.png",
            selectedIconPath: "/images/tabbar/home_cur.png",
            text: "首页"
        },  {
            pagePath: "/pages/advice/advice",
            iconPath: "/images/tabbar/advice.png",
            selectedIconPath: "/images/tabbar/advice_cur.png",
            text: "反馈建议"
        }, {
            pagePath: "/pages/mine/mine",
            iconPath: "/images/tabbar/mine.png",
            selectedIconPath: "/images/tabbar/mine_cur.png",
            text: "个人中心"
        } ]
    },
    attached: function() {},
    methods: {
        switchTab: function(e) {
            var a = e.currentTarget.dataset, t = a.path;
            wx.switchTab({
                url: t
            }), this.setData({
                selected: a.index
            });
        }
    }
});