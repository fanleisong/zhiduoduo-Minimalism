var e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        title: "",
        desc: "",
        icons: [],
        refuses: [ {
            title: "可回收物",
            desc: "包括废纸、塑料、玻璃、金属和布料五大类。\n\n 废纸：主要包括报纸、期刊、图书、各种包装纸等。但是，要注意纸巾和厕所纸由于水溶性太强不可回收。 \n\n 塑料：各种塑料袋、塑料泡沫、塑料包装、一次性塑料参和餐具、硬塑料、塑料牙刷、塑料杯子、矿泉水瓶等。 \n\n 玻璃：主要包括各种玻璃瓶、碎玻璃片、镜子、暖瓶等。",
            icons: [ {
                name: "织物类",
                icon: "/images/refuse/refuse_1_1.png"
            }, {
                name: "废纸类",
                icon: "/images/refuse/refuse_1_2.png"
            }, {
                name: "牛奶盒",
                icon: "/images/refuse/refuse_1_3.png"
            }, {
                name: "玻璃类",
                icon: "/images/refuse/refuse_1_4.png"
            } ]
        }, {
            title: "厨余垃圾",
            desc: "包括剩菜剩饭、骨头、菜梗菜叶、果皮等食品类废物",
            icons: [ {
                name: "剩菜剩饭",
                icon: "/images/refuse/refuse_2_1.png"
            }, {
                name: "果皮",
                icon: "/images/refuse/refuse_2_2.png"
            }, {
                name: "菜梗菜叶",
                icon: "/images/refuse/refuse_2_3.png"
            }, {
                name: "骨骼内脏",
                icon: "/images/refuse/refuse_2_4.png"
            } ]
        }, {
            title: "有害垃圾",
            desc: "含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。包括电池、荧光灯管、灯泡、水银温度计、油漆桶、部分家电、过期药品、过期化妆品等。",
            icons: [ {
                name: "杀虫剂",
                icon: "/images/refuse/refuse_3_1.png"
            }, {
                name: "废灯管",
                icon: "/images/refuse/refuse_3_2.png"
            }, {
                name: "过期药品",
                icon: "/images/refuse/refuse_3_3.png"
            }, {
                name: "废油漆桶",
                icon: "/images/refuse/refuse_3_4.png"
            }, {
                name: "废墨盒",
                icon: "/images/refuse/refuse_3_5.png"
            }, {
                name: "废电池",
                icon: "/images/refuse/refuse_3_6.png"
            } ]
        }, {
            title: "其他垃圾",
            desc: "包括砖瓦陶瓷、渣土、卫生间废纸、瓷器碎片等难以回收的废弃物",
            icons: [ {
                name: "灰土",
                icon: "/images/refuse/refuse_4_1.png"
            }, {
                name: "破旧陶瓷品",
                icon: "/images/refuse/refuse_4_2.png"
            }, {
                name: "污染纸张",
                icon: "/images/refuse/refuse_4_3.png"
            }, {
                name: "烟头",
                icon: "/images/refuse/refuse_4_4.png"
            }, {
                name: "宠物粪便",
                icon: "/images/refuse/refuse_4_5.png"
            }, {
                name: "一次性餐具",
                icon: "/images/refuse/refuse_4_6.png"
            } ]
        } ]
    },
    onLoad: function(e) {
        var s = getCurrentPages();
        this.setData({
            pageLength: s.length
        }), e.id && this.setData({
            title: this.data.refuses[e.id - 1].title,
            desc: this.data.refuses[e.id - 1].desc,
            icons: this.data.refuses[e.id - 1].icons
        });
    },
    onShareAppMessage: function() {
        return e.share();
    }
});