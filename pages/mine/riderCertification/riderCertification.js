var a = getApp();

Page({
    data: {
        id: "",
        issq: "",
        breason: "",
        multiArray: [ [], [], [] ],
        multiArray1: [ [], [], [] ],
        multiIndex: [],
        multiIndexNow: [ 0, 0, 0 ],
        sexArray: [ "男", "女" ],
        sexIndex: 0,
        addrArr: [],
        yysIndex: "",
        yysArray: [],
        region: [],
        sfimgzm: "../../../images/id_z_icon.png",
        sfimgfm: "../../../images/id_f_icon.png",
        sfimgzmshow: "../../../images/id_z_icon.png",
        sfimgfmshow: "../../../images/id_f_icon.png"
    },
    onLoad: function(a) {
        this.setData({
            id: wx.getStorageSync("userInfo").id
        }),console.log(this.data.id), "" != this.data.id && (this.getInfo(), this.getYys()), 
        this.getArr();
    },
    onShow: function() {},
    getInfo: function() {
        var e = this;
        wx.showLoading({
            mask: !0
        }), wx.request({
            url: wx.getStorageSync("city").interfaceUrl+'user/info',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                id: wx.getStorageSync("userInfo").id,
                type: "1"
            },
            success: function(a) {
                console.log(a), wx.hideLoading(), 200 == a.statusCode ? e.setData({
                    issq: a.data.issq,
                    breason: a.data.breason
                }) : wx.showToast({
                    title: a.data.msg,
                    mask: !0,
                    icon: "none"
                });
            }
        });
    },
    getYys: function() {
        var e = this;
        wx.showLoading({
            mask: !0
        }), wx.request({
            url: wx.getStorageSync("city").interfaceUrl+'user/info',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                id: wx.getStorageSync("userInfo").id
            },
            success: function(a) {
                console.log(a), wx.hideLoading(), 1 == a.data.code ? e.setData({
                    yysArray: a.data.data
                }) : wx.showToast({
                    title: a.data.msg,
                    mask: !0,
                    icon: "none"
                });
            }
        });
    },
    getArr: function() {
        var e = this;
        wx.showLoading({
            mask: !0
        }), wx.request({
            url: wx.getStorageSync("city").interfaceUrl+'user/info',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                id: wx.getStorageSync("userInfo").id
            },
            success: function(a) {
                if (console.log(a), wx.hideLoading(), 1 == a.data.code) {
                    var t = [], i = a.data.data.map(function(a) {
                        return a.areaName;
                    }), o = a.data.data[0].cities.map(function(a) {
                        return a.areaName;
                    }), s = a.data.data[0].cities[0].counties.map(function(a) {
                        return a.areaName;
                    });
                    t[0] = i, t[1] = o, t[2] = s, e.setData({
                        addrArr: a.data.data,
                        multiArray: t,
                        multiArray1: t
                    });
                } else wx.showToast({
                    title: a.data.msg,
                    mask: !0,
                    icon: "none"
                });
            }
        });
    },
    qishouTJ: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var t = this, i = e.detail.value;
        if (wx.showLoading({
            mask: !0
        }), "" == i.qname) wx.showToast({
            title: "请输入姓名",
            mask: !0,
            icon: "none"
        }); else if ("" == i.qmobile) wx.showToast({
            title: "请输入联系方式",
            mask: !0,
            icon: "none"
        }); else if ("" == i.nowaddress) wx.showToast({
            title: "请输入详细地址",
            mask: !0,
            icon: "none"
        }); else if ("../../../images/id_z_icon.png" == t.data.sfimgzm) wx.showToast({
            title: "请上传身份证正面",
            mask: !0,
            icon: "none"
        }); else if ("../../../images/id_f_icon.png" == t.data.sfimgfm) wx.showToast({
            title: "请上传身份证反面",
            mask: !0,
            icon: "none"
        }); else {
            var o = t.data.sfimgzm, s = t.data.sfimgfm, n = t.data.multiArray, d = t.data.multiIndex, l = n[0][d[0]] + "/" + n[1][d[1]] + "/" + n[2][d[2]], r = o + "," + s;
            console.log(r), wx.request({
                url: wx.getStorageSync("city").interfaceUrl+'user/qishou',
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    id:  wx.getStorageSync("userInfo").id,
                    type: "2",
                    qname: i.qname,
                    qsex: t.data.sexArray[t.data.sexIndex],
                    qmobile: i.qmobile,
                    city: l,
                    nowaddress: i.nowaddress,
                    qimages: r,
                  //  yyid: t.data.yysArray[t.data.yysIndex].id
                },
                success: function(a) {
                    console.log(a), wx.hideLoading(), 0 == a.data.errno ? (wx.showToast({
                        title: a.data.data.msg,
                        mask: !0,
                        icon: "none"
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 2000)) : wx.showToast({
                        title: a.data.data.msg,
                        mask: !0,
                        icon: "none"
                    });
                }
            });
        }
    },
    bindPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            sexIndex: a.detail.value
        });
    },
    bindPickerChange2: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            yysIndex: a.detail.value
        });
    },
    bindRegionChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            region: a.detail.value
        });
    },
    bindMultiPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value);
        var e;
        e = a.detail.value[0] ? a.detail.value : [ 0, 0, 0 ];
        var t = this;
        this.setData({
            multiIndex: e,
            multiIndexNow: a.detail.value,
            multiArray: t.data.multiArray1
        });
    },
    bindMultiPickerColumnChange: function(a) {
        var e = this;
        console.log("修改的列为", a.detail.column, "，值为", a.detail.value);
        var t = e.data.multiIndexNow, i = e.data.multiArray1, o = e.data.addrArr;
        switch (a.detail.column) {
          case 0:
            var s = o[a.detail.value].cities.map(function(a) {
                return a.areaName;
            }), n = o[a.detail.value].cities[0].counties.map(function(a) {
                return a.areaName;
            });
            i[1] = s, i[2] = n, t[0] = a.detail.value;
            break;

          case 1:
            console.log(o[t[0]].cities[a.detail.value]);
            n = o[t[0]].cities[a.detail.value].counties.map(function(a) {
                return a.areaName;
            });
            i[2] = n, t[1] = a.detail.value;
            break;

          case 2:
            t[2] = a.detail.value;
        }
        e.setData({
            multiArray1: i,
            multiIndexNow: t
        });
    },
    backBtn: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    resetSH: function() {
        this.setData({
            issq: 0
        });
    },
    chooseImage: function(e) {
        var t = this;
        console.log(e);
        var i = e.currentTarget.dataset.type;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e);
                var o = e.tempFilePaths[0];
                t.uploadimg({
                    url: wx.getStorageSync("city").interfaceUrl+'user/saveimage',
                    path: o,
                    type: i
                });
            }
        });
    },
    uploadimg: function(a) {
        var e = this;
        console.log(a.path)
        wx.uploadFile({
            url: a.url,
            filePath: a.path,
            name: "photo",
            formData: {
                filePath: a.path,
                id: e.data.id
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: function(t) {
                console.log(t.data);
               var i = JSON.parse(t.data);
                "1" == a.type ? e.setData({
                    sfimgzm: i.data.url1,
                    sfimgzmshow: i.data.url1
                }) : e.setData({
                    sfimgfm: i.data.url1,
                    sfimgfmshow: i.data.url1
                }), wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            },
            fail: function(a) { 
                console.log("fail:");
            },
            complete: function(t) {
               
            }
        });
    }
});