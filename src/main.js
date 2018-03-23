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

Vue.config.productionTip = false


if (__THEME === 'mat') {
    require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'
import axios from 'axios'
Vue.prototype.$http = axios.create({ baseURL: 'http://app.hwlantian.com', withCredentials: true })
    // Vue.prototype.$http = axios.create({
    //     baseURL: 'http://web.test.hw99lt.com:8080',
    //     withCredentials: true
    // })

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        router,
        render: h => h(require('./App').default)
    })
})