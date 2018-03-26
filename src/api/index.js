import axios from 'axios'

// 创建 axios 实例
const $http = axios.create({
    baseURL: 'http://web.test.hw99lt.com:8080',
    // baseURL: 'http://app.hwlantian.com',
    withCredentials: true
})

export const deviceService = {
    getAdapter: function() {
        return $http.get('/adapter');
    },
    getOneAdapter(adapterId) {
        return $http.get('/adapter/' + adapterId)
    },
    setAdapterCustomizeNow(adapterId, key) {
        return $http.post('/adapter/' + adapterId + '/customize/' + key + '/now')
    },
    deleteAdapterCustomize(adapterId, key) {
        return $http.delete('/adapter/' + adapterId + '/customize/' + key)
    },
    getDevice: function(deviceId) {
        return $http.get('/device/' + deviceId)
    },
    getDeviceOnlineTime: function(deviceId) {
        return $http.get('/device/' + deviceId + '/data/history/length')
    },
    getLastData: function(deviceId) {
        return $http.get('/device/' + deviceId + '/data/latest')
    },
    getLinkedDevices: function(deviceId) {
        return $http.get('/device/' + deviceId + '/linked')
    },
    getLinkedGW: function(deviceId) {
        return $http.get('/device/' + deviceId + '/linked/gateway')
    },
    getHistoryData: function(deviceId, timeType) {
        const now = new Date()
        let params = {}
        if (timeType === 'second') {
            params.scale = 0
            params.start = desendMinutes(now, 1).getTime()
            params.duration = 60000
        } else if (timeType === 'minute') {
            params.scale = 1
            params.start = desendMinutes(now, 60).getTime()
            params.duration = 3600000
        } else if (timeType === 'hour') {
            params.scale = 2
            params.start = desendMinutes(now, 24 * 60).getTime()
            params.duration = 24 * 3600000
        } else if (timeType === 'day') {
            params.scale = 3
            params.start = desendMinutes(now, 30 * 24 * 60).getTime()
            params.duration = 30 * 24 * 3600000
        }

        return $http.get('/device/' + deviceId + '/data/history', { params: params })
    },
    addDeviceByEncryption: function(resultStr) {
        let deviceIdIndex = resultStr.indexOf('deviceId=')
        let encryptionId = ''
        if (deviceIdIndex === -1) {
            encryptionId = resultStr
        } else {
            let result = resultStr.split('deviceId=')[1]
            if (result.indexOf('&') === -1) {
                encryptionId = result
            } else {
                result = result.substr(0, result.indexOf('&'))
                encryptionId = result
            }
        }
        return $http.post('/adapter/byEncryption', { value: encryptionId })
    },
    addDeviceByPair(pairId) {
        return $http.post('/adapter/byPairId', {
            value: pairId.trim()
        })
    },
    addDeviceByShare(shareId) {
        return $http.post('adapter/byShareLink', {
            value: shareId.trim()
        })
    },
    deleteAdapter: function(adapterId) {
        return $http.delete('/adapter/' + adapterId)
    },
    getDeviceLocation: function(deviceId) {
        return $http.get('/device/' + deviceId + '/location')
    },
    putDeviceLocation: function(deviceId, body) {
        return $http.put('/device/' + deviceId + '/location', body)
    },
    changeCustomize: function(adapterId, key, body) {
        return $http.put('/adapter/' + adapterId + '/customize/' + key, body)
    },
    getAllShareLinks: function(adapterId) {
        return $http.get('/adapter/' + adapterId + '/shareLinks')
    },
    getAllShareAdapters: function(adapterId) {
        return $http.get('/adapter/' + adapterId + '/shareAdapters')
    },
    getShare: function(shareId) {
        return $http.get('/adapter/shares/' + shareId)
    },
    createShare: function(adapterId, body) {
        return $http.post('/adapter/' + adapterId + '/shareLinks', body)
    },
    deleteShare: function(shareId) {
        return $http.delete('/adapter/shares/' + shareId)
    },
    changeDeviceToShare: function(adapterId) {
        return $http.post('/adapter/' + adapterId + '/convertToShare')
    },
    addShareAuthorization: function(adapterId, authorizations) {
        return $http.post('/adapter/' + adapterId + '/authorizations', authorizations)
    },
    deleteShareAuthorization: function(adapterId, authorizations) {
        return $http.delete('/adapter/' + adapterId + '/authorizations', { data: authorizations })
    },
    postDeviceCommands: function(deviceId, body) {
        let body1 = {
            data: body,
            delayed: 0
        }
        return $http.post('/device/' + deviceId + '/commands', body1)
    },
    getDeviceStatus: function(deviceId) {
        return $http.get('/device/' + deviceId + '/status')
    },
    getDeviceConfig: function(deviceId) {
        return $http.get('/device/' + deviceId + '/config')
    },
    changeDeviceConfig: function(deviceId, key, value) {
        return $http.put('/device/' + deviceId + '/config/' + key, { value: value })
    },
    getFirmwareList: function(deviceId) {
        return $http.get('/device/firmware/' + deviceId + '/suitable')
    }
}

export const userService = {
    getUser: function() {
        return $http.get('/user')
    },
    getUserInfo: function(accountId) {
        return $http.get('/user/info', {
            params: {
                accountIds: accountId
            }
        })
    },
    changeAuthentication: function(key, value, username, vcode) {
        return $http.put('/user/authentication/' + key, {
            value: value
        }, {
            headers: {
                'X-Verification': username + ":" + vcode
            }
        })
    },
    changeCustomize: function(key, value) {
        return $http.put('/user/customize/' + key, {
            value: value.trim()
        })
    },
    sendVerification: function(key, value) {
        return $http.post('/user/verification/fetch', {
            key: key,
            value: value
        })
    },
    exchangeVerification: function(username, vcode) {
        return $http.post("/user/verification/exchange/", null, {
            headers: {
                "X-Verification": username + ":" + vcode
            }
        })
    },
    verified: function(username, vcode) {
        return $http.post("/user/verify", null, {
            headers: {
                "X-Verification": username + ":" + vcode
            }
        })
    }
}

export const weatherService = {
    getAllDataByCityId: function(cityId) {
        // 天气详情页所有数据
        return $http.get('/weather/data', {
            params: {
                locationInfo: true,
                cityId: cityId,
                dataTypes: 'weather,air,daily'
            }
        })
    },
    getAllDataByPoint: function(point) {
        return $http.get('/weather/near', {
            params: {
                locationInfo: true,
                dataTypes: 'weather,air,daily',
                point: point
            }
        })
    },
    getCurrentWeather: function(cityId) {
        return $http.get('/weather/data', {
            params: {
                locationInfo: true,
                cityId: cityId,
                dataTypes: 'weather'
            }
        })
    },
    getCurrentAir: function(cityId) {
        return $http.get('/weather/data', {
            params: {
                locationInfo: true,
                cityId: cityId,
                dataTypes: 'air'
            }
        })
    },
    getCurrentDaily: function(cityId) {
        return $http.get('/weather/data', {
            params: {
                locationInfo: true,
                cityId: cityId,
                dataTypes: 'daily'
            }
        })
    },
    getCurrentData: function(type, key, value) {
        let params = {}
        params.locationInfo = true
        params.dataTypes = type
        params[key] = value

        // 监测点只有air数据，没有weather数据 所以请求weather数据时应获取最近城市的数据

        if (key === 'point') {
            if (type === 'air') {
                params.locationTypes = 'station'
            } else {
                params.locationTypes = 'city'
            }
            return $http.get('/weather/near', { params: params })
        } else if (key === 'cityId') {
            return $http.get('/weather/data', { params: params })
        }

    },

    getCurrentDataByPoint: function(type, key, value) {
        let params = {}
        params.locationInfo = true
        params.dataTypes = type
        params[key] = value

        // 监测点只有air数据，没有weather数据 所以请求weather数据时应获取最近城市的数据
        if (type === 'air') {
            params.locationTypes = 'station'
        } else {
            params.locationTypes = 'city'
        }

        return $http.get('/weather/near', { params: params })
    },

    getCurrentDataByCity: function(type, key, value) {
        let params = {}
        params.locationInfo = true
        params.dataTypes = type
        params[key] = value

        // 监测点只有air数据，没有weather数据 所以请求weather数据时应获取最近城市的数据
        if (type === 'air') {
            params.locationTypes = 'station'
        } else {
            params.locationTypes = 'city'
        }

        return $http.get('/weather/data', { params: params })
    },

    addWeatherAdapter: function(cityId) {
        return $http.post('/adapter/byWeatherId', {
            value: cityId.trim()
        })
    },

    getCityData: function(cityId, dataType) { // weather卡片中根据城市Id获取天气、空气
        return $http.get("/weather/data", {
            params: {
                dataTypes: dataType,
                cityId: cityId,
                locationInfo: true
            }
        })
    },

    searchCity: function(val) {
        return $http.get('/weather/search', {
            params: {
                partial: val
            }
        })
    },

    getWeatherId: function(x, y) {
        return $http.get('/weather/near', {
            params: {
                point: x + ',' + y
            }
        })
    },

    getAirRank: function(cityId) {
        return $http.get('/weather/rank/' + cityId)
    },

    getAirRankList: function() {
        return $http.get('/weather/rank')
    },

    getAirHistoryByCityId: function(cityId, start, duration) {
        return $http.get('/weather/data', {
            params: {
                cityId: cityId,
                dataTypes: 'air',
                start: start,
                duration: duration
            }
        })
    },

    getAirHistoryByPoint: function(point, start, duration) {
        return $http.get('/weather/near', {
            params: {
                point: point,
                dataTypes: 'air',
                start: start,
                duration: duration
            }
        })
    },

    getDailyData: function(cityId) {
        return $http.get('/weather/data', {
            params: {
                locationInfo: true,
                cityId: cityId,
                dataTypes: 'daily'
            }
        })
    }
}