export const dataFormatService = {
    pm2d5: {
        name: 'PM2.5',
        unit: 'ug/m³',
        level: [{
            num: 35,
            levelName: 'excellent'
        }, {
            num: 75,
            levelName: 'good'
        }, {
            num: 115,
            levelName: 'mild'
        }, {
            num: 150,
            levelName: 'medium'
        }, {
            num: 250,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        detailText: {
            excellent: "当前空气质量令人满意，基本无空气污染，对健康没有危害，可以放心呼吸。",
            good: "当前PM2.5指数良，除少数对某些污染物特别敏感的人群外，不会对人体健康产生危害。",
            mild: "	当前PM2.5指数轻度污染，敏感人群症状会有轻度加剧，对健康人群没有明显影响。儿童、老年人及心脏病、呼吸系统疾病患者应尽量减少体力消耗大的活动。",
            medium: "当前PM2.5指数中度污染，敏感人群症状进一步加剧，可能对健康人群的心脏、呼吸系统有影响，建议开启净化器。",
            bad: "当前PM2.5指数重度污染，空气状况很差，会对每个人的健康都产生比较严重的危害，请打开净化器或者其他空气净化装置。",
            veryBad: "当前PM2.5指数严重污染，空气状况极差，所有人的健康都会受到严重危害，请开启净化装置并保持最大档位。",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/deviceCard/excellent.jpg",
            good: "assets/images/deviceCard/good.jpg",
            mild: "assets/images/deviceCard/mild.jpg",
            medium: "assets/images/deviceCard/medium.jpg",
            bad: "assets/images/deviceCard/bad.jpg",
            veryBad: "assets/images/deviceCard/veryBad.jpg",
            none: 'assets/images/deviceCard/excellent.jpg'
        },
        bgImg1: {
            excellent: "assets/images/deviceCard/excellent1.jpg",
            good: "assets/images/deviceCard/good1.jpg",
            mild: "assets/images/deviceCard/mild1.jpg",
            medium: "assets/images/deviceCard/medium1.jpg",
            bad: "assets/images/deviceCard/bad1.jpg",
            veryBad: "assets/images/deviceCard/veryBad1.jpg",
            none: 'assets/images/deviceCard/excellent1.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--' || num === undefined || num === null) {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm2d5.level.length; i++) {
                    if (num <= dataFormatService.pm2d5.level[i].num) {
                        return dataFormatService.pm2d5.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm2d5.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm2d5.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm2d5.suggestsText[this.getLevel(num)]
        },
        getDetailText: function(num) {
            return dataFormatService.pm2d5.detailText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm2d5.bgImg[this.getLevel(num)]
        },
        getBgImg1: function(num) {
            return dataFormatService.pm2d5.bgImg1[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm2d5.level.length; i++) {
                    if (num <= dataFormatService.pm2d5.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm2d5.level[i - 1].num) / (dataFormatService.pm2d5.level[i].num - dataFormatService.pm2d5.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pm0d3: {
        name: 'PM0.3',
        unit: 'ug/m³',
        level: [{
            num: 35,
            levelName: 'excellent'
        }, {
            num: 75,
            levelName: 'good'
        }, {
            num: 115,
            levelName: 'mild'
        }, {
            num: 150,
            levelName: 'medium'
        }, {
            num: 250,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm0d3.level.length; i++) {
                    if (num <= dataFormatService.pm0d3.level[i].num) {
                        return dataFormatService.pm0d3.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm0d3.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm0d3.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm0d3.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm0d3.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm0d3.level.length; i++) {
                    if (num <= dataFormatService.pm0d3.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm0d3.level[i - 1].num) / (dataFormatService.pm0d3.level[i].num - dataFormatService.pm0d3.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pm1d0: {
        name: 'PM1.0',
        unit: 'ug/m³',
        level: [{
            num: 35,
            levelName: 'excellent'
        }, {
            num: 75,
            levelName: 'good'
        }, {
            num: 115,
            levelName: 'mild'
        }, {
            num: 150,
            levelName: 'medium'
        }, {
            num: 250,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm1d0.level.length; i++) {
                    if (num <= dataFormatService.pm1d0.level[i].num) {
                        return dataFormatService.pm1d0.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm1d0.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm1d0.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm1d0.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm1d0.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm1d0.level.length; i++) {
                    if (num <= dataFormatService.pm1d0.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm1d0.level[i - 1].num) / (dataFormatService.pm1d0.level[i].num - dataFormatService.pm1d0.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pm5d0: {
        name: 'PM5.0',
        unit: 'ug/m³',
        level: [{
            num: 35,
            levelName: 'excellent'
        }, {
            num: 75,
            levelName: 'good'
        }, {
            num: 115,
            levelName: 'mild'
        }, {
            num: 150,
            levelName: 'medium'
        }, {
            num: 250,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm5d0.level.length; i++) {
                    if (num <= dataFormatService.pm5d0.level[i].num) {
                        return dataFormatService.pm5d0.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm5d0.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm5d0.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm5d0.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm5d0.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm5d0.level.length; i++) {
                    if (num <= dataFormatService.pm5d0.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm5d0.level[i - 1].num) / (dataFormatService.pm5d0.level[i].num - dataFormatService.pm5d0.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pm10: {
        name: 'PM10',
        unit: 'ug/m³',
        level: [{
            num: 50,
            levelName: 'excellent'
        }, {
            num: 150,
            levelName: 'good'
        }, {
            num: 250,
            levelName: 'mild'
        }, {
            num: 350,
            levelName: 'medium'
        }, {
            num: 420,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm10.level.length; i++) {
                    if (num <= dataFormatService.pm10.level[i].num) {
                        return dataFormatService.pm10.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm10.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm10.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm10.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm10.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm10.level.length; i++) {
                    if (num <= dataFormatService.pm10.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm10.level[i - 1].num) / (dataFormatService.pm10.level[i].num - dataFormatService.pm10.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pm25: {
        name: 'PM2.5',
        unit: 'ug/m³',
        level: [{
            num: 35,
            levelName: 'excellent'
        }, {
            num: 75,
            levelName: 'good'
        }, {
            num: 115,
            levelName: 'mild'
        }, {
            num: 150,
            levelName: 'medium'
        }, {
            num: 250,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 35) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pm2d5.level.length; i++) {
                    if (num <= dataFormatService.pm2d5.level[i].num) {
                        return dataFormatService.pm2d5.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pm2d5.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pm2d5.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pm2d5.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pm2d5.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 35) {
                return (num / 35) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pm2d5.level.length; i++) {
                    if (num <= dataFormatService.pm2d5.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pm2d5.level[i - 1].num) / (dataFormatService.pm2d5.level[i].num - dataFormatService.pm2d5.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    aqi: {
        name: 'AQI',
        unit: '',
        level: [{
            num: 50,
            levelName: 'excellent'
        }, {
            num: 100,
            levelName: 'good'
        }, {
            num: 150,
            levelName: 'mild'
        }, {
            num: 200,
            levelName: 'medium'
        }, {
            num: 300,
            levelName: 'bad'
        }, {
            num: 999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 50) {
                return 'excellent';
            } else if (num >= 999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.aqi.level.length; i++) {
                    if (num <= dataFormatService.aqi.level[i].num) {
                        return dataFormatService.aqi.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.aqi.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.aqi.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.aqi.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 50) {
                return (num / 50) * 16.6
            } else if (num >= 999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.aqi.level.length; i++) {
                    if (num <= dataFormatService.aqi.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.aqi.level[i - 1].num) / (dataFormatService.aqi.level[i].num - dataFormatService.aqi.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    o3: {
        name: 'O3',
        unit: 'ug/m³',
        level: [{
            num: 160,
            levelName: 'excellent'
        }, {
            num: 200,
            levelName: 'good'
        }, {
            num: 300,
            levelName: 'mild'
        }, {
            num: 400,
            levelName: 'medium'
        }, {
            num: 800,
            levelName: 'bad'
        }, {
            num: 1500,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 160) {
                return 'excellent';
            } else if (num >= 1500) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.o3.level.length; i++) {
                    if (num <= dataFormatService.o3.level[i].num) {
                        return dataFormatService.o3.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.o3.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.o3.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.o3.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 160) {
                return (num / 160) * 16.6
            } else if (num >= 1500) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.o3.level.length; i++) {
                    if (num <= dataFormatService.o3.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.o3.level[i - 1].num) / (dataFormatService.o3.level[i].num - dataFormatService.o3.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    tvoc: {
        name: 'TVOC',
        unit: 'mg/m³',
        level: [{
            num: 0.3,
            levelName: 'excellent'
        }, {
            num: 0.6,
            levelName: 'good'
        }, {
            num: 2.0,
            levelName: 'mild'
        }, {
            num: 3.0,
            levelName: 'medium'
        }, {
            num: 10.0,
            levelName: 'bad'
        }, {
            num: 20.0,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 0.3) {
                return 'excellent';
            } else if (num >= 20) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.tvoc.level.length; i++) {
                    if (num <= dataFormatService.tvoc.level[i].num) {
                        return dataFormatService.tvoc.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.tvoc.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.tvoc.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.tvoc.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 0.3) {
                return (num / 0.3) * 16.6
            } else if (num >= 20) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.tvoc.level.length; i++) {
                    if (num <= dataFormatService.tvoc.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.tvoc.level[i - 1].num) / (dataFormatService.tvoc.level[i].num - dataFormatService.tvoc.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pressure: {
        name: '气压',
        unit: 'kPa',
        level: [{
            num: 86,
            levelName: 'rank1'
        }, {
            num: 106,
            levelName: 'rank2'
        }, {
            num: 300,
            levelName: 'rank3'
        }],
        barColor: {
            rank1: "RGB(45,223,96)",
            rank2: "RGB(242,175,68)",
            rank3: "RGB(255,62,62)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            rank1: "偏低",
            rank2: "标准",
            rank3: "偏高",
            none: '--'
        },
        suggestsText: {
            rank1: "你一定是生活在森林里",
            rank2: "空气质量不错，尽情玩耍吧",
            rank3: "建议减少户外运动",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 86) {
                return 'rank1';
            } else if (num >= 300) {
                return 'rank3'
            } else {
                for (let i = 0; i < dataFormatService.pressure.level.length; i++) {
                    if (num <= dataFormatService.pressure.level[i].num) {
                        return dataFormatService.pressure.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pressure.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pressure.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pressure.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 86) {
                return (num / 86) * 33.3
            } else if (num >= 300) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pressure.level.length; i++) {
                    if (num <= dataFormatService.pressure.level[i].num) {
                        return (33.3 * i) + (((num - dataFormatService.pressure.level[i - 1].num) / (dataFormatService.pressure.level[i].num - dataFormatService.pressure.level[i - 1].num)) * 33.3)
                    }
                }
            }
        }
    },

    DB: {
        name: '噪声',
        unit: 'db',
        level: [{
            num: 40,
            levelName: 'excellent'
        }, {
            num: 60,
            levelName: 'good'
        }, {
            num: 70,
            levelName: 'mild'
        }, {
            num: 90,
            levelName: 'medium'
        }, {
            num: 120,
            levelName: 'bad'
        }, {
            num: 200,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "安静",
            good: "一般",
            mild: "吵闹",
            medium: "很吵",
            bad: "极吵",
            veryBad: "全聋",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--' || !num) {
                return 'none'
            } else if (num <= 40) {
                return 'excellent';
            } else if (num >= 200) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.DB.level.length; i++) {
                    if (num <= dataFormatService.DB.level[i].num) {
                        return dataFormatService.DB.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.DB.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.DB.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.DB.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 40) {
                return (num / 40) * 16.6
            } else if (num >= 200) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.DB.level.length; i++) {
                    if (num <= dataFormatService.DB.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.DB.level[i - 1].num) / (dataFormatService.DB.level[i].num - dataFormatService.DB.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    hum: {
        name: '湿度',
        unit: '%',
        level: [{
            num: 20,
            levelName: 'rank1'
        }, {
            num: 40,
            levelName: 'rank2'
        }, {
            num: 65,
            levelName: 'rank3'
        }, {
            num: 100,
            levelName: 'rank4'
        }],
        barColor: {
            rank1: "RGB(252, 210, 126)",
            rank2: "RGB(169, 216, 74)",
            rank3: "RGB(93, 219, 135)",
            rank4: "RGB(187, 228, 250)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            rank1: "干燥",
            rank2: "略干",
            rank3: "舒适",
            rank4: "潮湿",
            none: '--'
        },
        suggestsText: {
            rank1: "你一定是生活在森林里",
            rank2: "空气质量不错，尽情玩耍吧",
            rank3: "建议减少户外运动",
            rank4: "建议减少户外运动",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 20) {
                return 'rank1';
            } else if (num >= 100) {
                return 'rank4'
            } else {
                for (let i = 0; i < dataFormatService.hum.level.length; i++) {
                    if (num <= dataFormatService.hum.level[i].num) {
                        return dataFormatService.hum.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.hum.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.hum.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.hum.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 20) {
                return (num / 20) * 25
            } else if (num >= 100) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.hum.level.length; i++) {
                    if (num <= dataFormatService.hum.level[i].num) {
                        return (25 * i) + (((num - dataFormatService.hum.level[i - 1].num) / (dataFormatService.hum.level[i].num - dataFormatService.hum.level[i - 1].num)) * 25)
                    }
                }
            }
        }
    },

    temp: {
        name: '温度',
        unit: '°C',
        level: [{
            num: 4,
            levelName: 'excellent'
        }, {
            num: 18,
            levelName: 'good'
        }, {
            num: 28,
            levelName: 'mild'
        }, {
            num: 37,
            levelName: 'medium'
        }, {
            num: 38,
            levelName: 'bad'
        }],
        barColor: {
            excellent: "RGB(143, 212, 251)",
            good: "RGB(187, 228, 250)",
            mild: "RGB(93, 218, 134)",
            medium: "RGB(252, 210, 126)",
            bad: "RGB(238, 92, 95)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "寒冷",
            good: "冷",
            mild: "舒适",
            medium: "热",
            bad: "酷热",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 4) {
                return 'excellent';
            } else if (num > 37) {
                return 'bad'
            } else {
                for (let i = 0; i < dataFormatService.temp.level.length; i++) {
                    if (num <= dataFormatService.temp.level[i].num) {
                        return dataFormatService.temp.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.temp.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.temp.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.temp.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 4) {
                return (num / 5) * 25
            } else if (num > 37) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.temp.level.length; i++) {
                    if (num <= dataFormatService.temp.level[i].num) {
                        return (25 * i) + (((num - dataFormatService.temp.level[i - 1].num) / (dataFormatService.temp.level[i].num - dataFormatService.temp.level[i - 1].num)) * 25)
                    }
                }
            }
        }
    },

    ch2o: {
        name: '甲醛',
        unit: 'mg/m³',
        level: [{
            num: 0.08,
            levelName: 'excellent'
        }, {
            num: 0.3,
            levelName: 'good'
        }, {
            num: 0.5,
            levelName: 'mild'
        }, {
            num: 0.75,
            levelName: 'medium'
        }, {
            num: 2.0,
            levelName: 'bad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "正常",
            good: "轻度污染",
            mild: "中度污染",
            medium: "重度污染",
            bad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 0.08) {
                return 'excellent';
            } else if (num >= 2.0) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.ch2o.level.length; i++) {
                    if (num <= dataFormatService.ch2o.level[i].num) {
                        return dataFormatService.ch2o.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.ch2o.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.ch2o.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.ch2o.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 0.08) {
                return (num / 0.08) * 20
            } else if (num >= 2.0) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.ch2o.level.length; i++) {
                    if (num <= dataFormatService.ch2o.level[i].num) {
                        return (20 * i) + (((num - dataFormatService.ch2o.level[i - 1].num) / (dataFormatService.ch2o.level[i].num - dataFormatService.ch2o.level[i - 1].num)) * 20)
                    }
                }
            }
        }
    },

    co2: {
        name: 'CO2',
        unit: 'ppm',
        level: [{
            num: 800,
            levelName: 'rank1'
        }, {
            num: 1700,
            levelName: 'rank2'
        }, {
            num: 3000,
            levelName: 'rank3'
        }, {
            num: 5500,
            levelName: 'rank4'
        }, {
            num: 10000,
            levelName: 'rank5'
        }],
        barColor: {
            rank1: "RGB(93, 219, 135)",
            rank2: "RGB(169, 216, 74)",
            rank3: "RGB(251, 210, 128)",
            rank4: "RGB(252, 153, 156)",
            rank5: "RGB(238, 92, 95)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            rank1: "理想",
            rank2: "正常",
            rank3: "浑浊",
            rank4: "中度污染",
            rank5: "重度污染",
            none: '--'
        },
        suggestsText: {
            rank1: "你一定是生活在森林里",
            rank2: "空气质量不错，尽情玩耍吧",
            rank3: "建议减少户外运动",
            rank4: "建议减少户外运动",
            rank5: "建议减少户外运动",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 800) {
                return 'rank1';
            } else if (num > 5500) {
                return 'rank5'
            } else {
                for (let i = 0; i < dataFormatService.co2.level.length; i++) {
                    if (num <= dataFormatService.co2.level[i].num) {
                        return dataFormatService.co2.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.co2.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.co2.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.co2.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 800) {
                return (num / 1000) * 25
            } else if (num > 5500) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.co2.level.length; i++) {
                    if (num <= dataFormatService.co2.level[i].num) {
                        return (25 * i) + (((num - dataFormatService.co2.level[i - 1].num) / (dataFormatService.co2.level[i].num - dataFormatService.co2.level[i - 1].num)) * 25)
                    }
                }
            }
        }
    },

    no2: {
        name: 'NO2',
        unit: 'mg/m³',
        level: [{
            num: 100,
            levelName: 'excellent'
        }, {
            num: 200,
            levelName: 'good'
        }, {
            num: 700,
            levelName: 'mild'
        }, {
            num: 1200,
            levelName: 'medium'
        }, {
            num: 2340,
            levelName: 'bad'
        }, {
            num: 3000,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 100) {
                return 'excellent';
            } else if (num >= 3000) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.no2.level.length; i++) {
                    if (num <= dataFormatService.no2.level[i].num) {
                        return dataFormatService.no2.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.no2.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.no2.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.no2.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 100) {
                return (num / 100) * 16.6
            } else if (num >= 3000) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.no2.level.length; i++) {
                    if (num <= dataFormatService.no2.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.no2.level[i - 1].num) / (dataFormatService.no2.level[i].num - dataFormatService.no2.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    so2: {
        name: 'SO2',
        unit: 'mg/m³',
        level: [{
            num: 150,
            levelName: 'excellent'
        }, {
            num: 500,
            levelName: 'good'
        }, {
            num: 650,
            levelName: 'mild'
        }, {
            num: 800,
            levelName: 'medium'
        }, {
            num: 1600,
            levelName: 'bad'
        }, {
            num: 3000,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 150) {
                return 'excellent';
            } else if (num >= 3000) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.so2.level.length; i++) {
                    if (num <= dataFormatService.so2.level[i].num) {
                        return dataFormatService.so2.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.so2.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.so2.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.so2.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 150) {
                return (num / 100) * 16.6
            } else if (num >= 3000) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.so2.level.length; i++) {
                    if (num <= dataFormatService.so2.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.so2.level[i - 1].num) / (dataFormatService.so2.level[i].num - dataFormatService.so2.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    co: {
        name: 'CO',
        unit: 'mg/m³',
        level: [{
            num: 5,
            levelName: 'excellent'
        }, {
            num: 10,
            levelName: 'good'
        }, {
            num: 35,
            levelName: 'mild'
        }, {
            num: 60,
            levelName: 'medium'
        }, {
            num: 90,
            levelName: 'bad'
        }, {
            num: 150,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 5) {
                return 'excellent';
            } else if (num >= 150) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.co.level.length; i++) {
                    if (num <= dataFormatService.co.level[i].num) {
                        return dataFormatService.co.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.co.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.co.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.co.suggestsText[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 5) {
                return (num / 5) * 16.6
            } else if (num >= 90) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.co.level.length; i++) {
                    if (num <= dataFormatService.co.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.co.level[i - 1].num) / (dataFormatService.co.level[i].num - dataFormatService.co.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pc0d3: {
        name: '> 0.3um',
        unit: '/0.1L',
        level: [{
            num: 350,
            levelName: 'excellent'
        }, {
            num: 750,
            levelName: 'good'
        }, {
            num: 1150,
            levelName: 'mild'
        }, {
            num: 1500,
            levelName: 'medium'
        }, {
            num: 2500,
            levelName: 'bad'
        }, {
            num: 9999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 350) {
                return 'excellent';
            } else if (num >= 9999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pc0d3.level.length; i++) {
                    if (num <= dataFormatService.pc0d3.level[i].num) {
                        return dataFormatService.pc0d3.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pc0d3.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pc0d3.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pc0d3.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pc0d3.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 350) {
                return (num / 350) * 16.6
            } else if (num >= 9999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pc0d3.level.length; i++) {
                    if (num <= dataFormatService.pc0d3.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pc0d3.level[i - 1].num) / (dataFormatService.pc0d3.level[i].num - dataFormatService.pc0d3.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pc1d0: {
        name: '> 1.0um',
        unit: '/0.1L',
        level: [{
            num: 350,
            levelName: 'excellent'
        }, {
            num: 750,
            levelName: 'good'
        }, {
            num: 1150,
            levelName: 'mild'
        }, {
            num: 1500,
            levelName: 'medium'
        }, {
            num: 2500,
            levelName: 'bad'
        }, {
            num: 9999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 350) {
                return 'excellent';
            } else if (num >= 9999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pc1d0.level.length; i++) {
                    if (num <= dataFormatService.pc1d0.level[i].num) {
                        return dataFormatService.pc1d0.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pc1d0.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pc1d0.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pc1d0.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pc1d0.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 350) {
                return (num / 350) * 16.6
            } else if (num >= 9999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pc1d0.level.length; i++) {
                    if (num <= dataFormatService.pc1d0.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pc1d0.level[i - 1].num) / (dataFormatService.pc1d0.level[i].num - dataFormatService.pc1d0.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pc2d5: {
        name: '> 2.5um',
        unit: '/0.1L',
        level: [{
            num: 350,
            levelName: 'excellent'
        }, {
            num: 750,
            levelName: 'good'
        }, {
            num: 1150,
            levelName: 'mild'
        }, {
            num: 1500,
            levelName: 'medium'
        }, {
            num: 2500,
            levelName: 'bad'
        }, {
            num: 9999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 350) {
                return 'excellent';
            } else if (num >= 9999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pc2d5.level.length; i++) {
                    if (num <= dataFormatService.pc2d5.level[i].num) {
                        return dataFormatService.pc2d5.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pc2d5.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pc2d5.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pc2d5.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pc2d5.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 350) {
                return (num / 350) * 16.6
            } else if (num >= 9999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pc2d5.level.length; i++) {
                    if (num <= dataFormatService.pc2d5.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pc2d5.level[i - 1].num) / (dataFormatService.pc2d5.level[i].num - dataFormatService.pc2d5.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pc5: {
        name: '> 5.0um',
        unit: '/0.1L',
        level: [{
            num: 350,
            levelName: 'excellent'
        }, {
            num: 750,
            levelName: 'good'
        }, {
            num: 1150,
            levelName: 'mild'
        }, {
            num: 1500,
            levelName: 'medium'
        }, {
            num: 2500,
            levelName: 'bad'
        }, {
            num: 9999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 350) {
                return 'excellent';
            } else if (num >= 9999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pc5d0.level.length; i++) {
                    if (num <= dataFormatService.pc5d0.level[i].num) {
                        return dataFormatService.pc5d0.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pc5d0.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pc5d0.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pc5d0.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pc5d0.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 350) {
                return (num / 350) * 16.6
            } else if (num >= 9999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pc5d0.level.length; i++) {
                    if (num <= dataFormatService.pc5d0.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pc5d0.level[i - 1].num) / (dataFormatService.pc5d0.level[i].num - dataFormatService.pc5d0.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    },

    pc10: {
        name: '> 10.0um',
        unit: '/0.1L',
        level: [{
            num: 350,
            levelName: 'excellent'
        }, {
            num: 750,
            levelName: 'good'
        }, {
            num: 1150,
            levelName: 'mild'
        }, {
            num: 1500,
            levelName: 'medium'
        }, {
            num: 2500,
            levelName: 'bad'
        }, {
            num: 9999,
            levelName: 'veryBad'
        }],
        barColor: {
            excellent: "RGB(45,223,96)",
            good: "RGB(229,218,48)",
            mild: "RGB(242,175,68)",
            medium: "RGB(255,62,62)",
            bad: "RGB(239,60,255)",
            veryBad: "RGB(156,131,108)",
            cool: "RGB(0,160,180)",
            cold: "RGB(0,0,180)",
            freezen: "RGB(80,0,150)",
            none: 'rgba(136,136,136,.6)'
        },
        levelText: {
            excellent: "优",
            good: "良",
            mild: "轻度污染",
            medium: "中度污染",
            bad: "重度污染",
            veryBad: "严重污染",
            none: '--'
        },
        suggestsText: {
            excellent: "你一定是生活在森林里",
            good: "空气质量不错，尽情玩耍吧",
            mild: "建议减少户外运动",
            medium: "你可能需要一个口罩",
            bad: "快打开你的净化设备吧",
            veryBad: "你真的需要专业的净化设备了",
            none: ''
        },
        bgImg: {
            excellent: "assets/images/rank/excellent.jpg",
            good: "assets/images/rank/good.jpg",
            mild: "assets/images/rank/mild.jpg",
            medium: "assets/images/rank/medium.jpg",
            bad: "assets/images/rank/bad.jpg",
            veryBad: "assets/images/rank/veryBad.jpg",
            none: 'assets/images/rank/excellent.jpg'
        },
        getLevel: function(num) {
            if (num < 0 || num === '--') {
                return 'none'
            } else if (num <= 350) {
                return 'excellent';
            } else if (num >= 9999) {
                return 'veryBad'
            } else {
                for (let i = 0; i < dataFormatService.pc10.level.length; i++) {
                    if (num <= dataFormatService.pc10.level[i].num) {
                        return dataFormatService.pc10.level[i].levelName
                    }
                }
            }
        },
        getColor: function(num) {
            return dataFormatService.pc10.barColor[this.getLevel(num)]
        },
        getLevelText: function(num) {
            return dataFormatService.pc10.levelText[this.getLevel(num)]
        },
        getSuggestText: function(num) {
            return dataFormatService.pc10.suggestsText[this.getLevel(num)]
        },
        getBgImg: function(num) {
            return dataFormatService.pc10.bgImg[this.getLevel(num)]
        },
        getPercentage: function(num) {
            if (num < 0 || num === '--') {
                return 0
            } else if (num <= 350) {
                return (num / 350) * 16.6
            } else if (num >= 9999) {
                return 100
            } else {
                for (let i = 0; i < dataFormatService.pc10.level.length; i++) {
                    if (num <= dataFormatService.pc10.level[i].num) {
                        return (16.6 * i) + (((num - dataFormatService.pc10.level[i - 1].num) / (dataFormatService.pc10.level[i].num - dataFormatService.pc10.level[i - 1].num)) * 16.6)
                    }
                }
            }
        }
    }
}