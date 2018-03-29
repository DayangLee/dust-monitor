// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
    // ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import router from './router'

import Quasar, * as All from 'quasar'
Vue.use(Quasar, {
    components: All,
    directives: All
})

if (__THEME === 'mat') {
    require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

import {
    Button,
    DatePicker,
    TimeSelect,
    TimePicker,
} from 'element-ui';
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)

import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '1f26ad83f6bc2becbde2bd710921173e',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
    v: '1.4.4'
});

import axios from 'axios'
// Vue.prototype.$http = axios.create({ baseURL: 'http://app.hwlantian.com', withCredentials: true })
Vue.prototype.$http = axios.create({
    baseURL: 'http://web.test.hw99lt.com:8080',
    withCredentials: true
})


Vue.config.productionTip = false
Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        router,
        render: h => h(require('./App').default)
    })
})