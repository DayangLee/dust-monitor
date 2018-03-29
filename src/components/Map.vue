<template>
  <div class="layout-padding map">
    <div class="title row justify-between">
      <div>
        <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
        <q-btn flat @click="status = 0">地图显示</q-btn>
        <span v-show="status === 1">> <q-btn flat>设备详情</q-btn></span>
      </div>
      <div v-show="status === 1">
        <q-btn color="primary" @click="status = 0">返回</q-btn>
      </div>
    </div>

    <div v-if="status === 0">
      <q-list>
        <q-list-header>
          <h5>设备总览</h5>
        </q-list-header>
        <div class="row">
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-card color="blue-6">
              <q-card-title>当前设备总数</q-card-title>
              <q-card-main class="text-center">
                <h5>{{total}} 台</h5>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-card color="green-6">
              <q-card-title>设备在线率</q-card-title>
              <q-card-main class="text-center">
                <h5>{{onlineRate}} %</h5>
              </q-card-main>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-card color="red-6">
              <q-card-title>设备故障数</q-card-title>
              <q-card-main class="text-center">
                <h5>{{error}} 台</h5>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-list>

      <q-list>
        <q-list-header class="row justify-between">
          <h5>设备地区分布</h5>
          <q-search v-model="searchKey" placeholder="输入设备名称或设备ID">
            <q-autocomplete @search="searchDevice" :max-results='99' :debounce='800' />
          </q-search>        
        </q-list-header> 

        <div class="amap-wrapper">
          <el-amap vid="amapDemo" :zoom="map.zoom" :center="map.center" class="amap-demo">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :icon="marker.icon" :key="marker.id"></el-amap-marker>
            <el-amap-text v-for="(marker,index) in markers" :text="addressText" :offset="[0,-45]" :position="marker.position" :visible="marker.showText" :key="'text'+marker.id"></el-amap-text>
            <el-amap-info-window v-for="(marker,index) in markers" :offset="[0,-30]" :position="marker.position" :visible="marker.showInfo" :content="addressInfo" :key="'info'+marker.id"></el-amap-info-window>
          </el-amap>
          
          <q-slide-transition>
            <div class="panel absolute-top-right bg-white" v-show="panelVisible"> 
              <q-list>
                <q-list-header class="row justify-between">
                  <h6>设备{{deviceId}}</h6>
                  <q-icon name="close" @click="panelVisible = false" />
                  </q-list-header>
                  <q-item-separator />
                <q-item>
                  <q-icon name="location_on" />
                  {{addressInfo}}
                </q-item>
                <q-item-separator />
                <q-item>
                  <q-item-side class="text-bold text-red">AQI</q-item-side>
                  <q-item-main class="text-bold text-red">233</q-item-main>
                  <q-item-side right><div class="rank text-white bg-red">严重污染</div></q-item-side>
                </q-item>
                <q-item-separator />
                <q-list-header>设备数据</q-list-header>
                <q-item v-for="(item,index) in dataList" :key="index">
                  <q-item-side>{{item.type}}</q-item-side>
                  <q-item-main>{{item.data}}</q-item-main>
                  <q-item-side>重度污染</q-item-side>
                </q-item>
                <q-item><q-item-main class="text-center"><q-btn color="primary" @click="status = 1">查看详情</q-btn></q-item-main></q-item>
              </q-list>
            </div>
          </q-slide-transition>
        </div>
      </q-list>
    </div>

    <div v-else-if="status === 1">
      <device-panel></device-panel>
    </div>

  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { deviceService } from "api/index";
import devicePanel from "./Device";
export default {
  components: {
    devicePanel
  },
  data: () => ({
    status: 0,
    total: 0,
    online: 0,
    error: 13,
    deviceIdList: [],
    deviceTimeMap: new Map(),
    deviceLocation: new Map(),
    clickDeviceId: null,
    mouseoverDeviceId: null,
    searchKey: null,
    deviceList: [],
    map: {
      zoom: 12,
      center: [116.397045, 39.907623]
    },
    markers: [],
    addressText: null,
    addressInfo: null,
    panelVisible: false,
    dataList: []
  }),
  computed: {
    deviceId: function() {
      if (this.clickDeviceId) {
        return this.clickDeviceId;
      } else {
        return this.mouseoverDeviceId;
      }
    },
    onlineRate: function() {
      if (this.total > 0) {
        return (this.online * 100 / this.total).toFixed(0);
      }
    }
  },
  methods: {
    searchDevice(terms, done) {
      if (this.searchKey !== "") {
        let searchList = [];
        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].name.includes(this.searchKey)) {
            searchList.push(this.deviceList[i]);
          }
        }
        this.markers = searchList;
        done([]);
      }
    },
    getDeviceList() {
      deviceService
        .getAdapter()
        .then(r => {
          if (r.data) {
            for (let i = 0; i < r.data.length; i++) {
              if (
                r.data[i].linked.id.includes("Y1") &&
                (r.data[i].authorizations.indexOf("Operate") !== -1 ||
                  r.data[i].authorizations.indexOf("operate") !== -1)
              ) {
                this.deviceIdList.push(r.data[i].linked.id);
              }
            }

            this.total = this.deviceIdList.length;
            this.getLastTime(this.deviceIdList);
          }
        })
        .catch(e => {});
    },
    getLastTime(list) {
      for (let i = 0; i < list.length; i++) {
        deviceService
          .getLastData(list[i])
          .then(r => {
            if (r.data && r.data.data && r.data.data[0]) {
              let timestamp = r.data.data[0].timestamp;
              let now = new Date().getTime();
              if (now - timestamp < 60000) {
                this.online++;
              }
            }
          })
          .catch(e => {});
      }
    },
    init() {
      let markers = [];
      let num = 20;
      let self = this;

      for (let i = 0; i < num; i++) {
        markers.push({
          id: i,
          position: [116.242045 + i * 0.02, 39.907623 + i * 0.002],
          name: i + "",
          showText: false,
          showInfo: false,
          events: {
            click() {
              self.clickDeviceId = markers[i].id;
              self.getAddressText(0, markers[i].position);
              for (let j = 0; j < markers.length; j++) {
                if (i === j) {
                  markers[j].showInfo = true;
                } else {
                  markers[j].showInfo = false;
                }
              }
              self.panelVisible = true;
              self.getDataList();
            },
            mouseover() {
              self.mouseoverDeviceId = markers[i].id;
              self.getAddressText(1, markers[i].position);
              markers[i].showText = true;
            },
            mouseout() {
              markers[i].showText = false;
            }
          }
        });
      }
      this.markers = markers;
      this.deviceList = markers;
    },
    getAddressText(e, position) {
      const self = this;
      position = position || [116.397045, 39.907623];
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress(position, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (e === 0) {
            self.addressInfo = result.regeocode.formattedAddress;
          } else {
            self.addressText = result.regeocode.formattedAddress;
          }
        }
      });
    },
    getDataList: function() {
      if (this.panelVisible && this.deviceId) {
        console.log(this.deviceId);
        let deviceId = "Y1-41013edd16b365040005";
        let dataListType = ["pm2d5", "pm10", "pmSensorFails", "hum", "temp"];
        let list = [];
        deviceService.getLastData(deviceId).then(r => {
          if (r.data && r.data.data && r.data.data[0] && r.data.data[0].data) {
            let lastData = r.data.data[0].data;
            for (let i = 0; i < dataListType.length; i++) {
              let type = dataListType[i];
              if (lastData[type] >= 0) {
                list.push({
                  type: type,
                  data: lastData[type]
                });
              }
            }
            this.dataList = list;
          }
        });
      }
    }
  },
  created() {
    // this.init();
    this.getDeviceList();
  }
};
</script>

<style lang="stylus" scoped>
.map
  .title
    margin-bottom 20px
  .amap-wrapper
    width 100%
    height 500px
    position relative
  .q-list-header
    padding-right 16px
  .panel
    width 300px
  .rank
    padding 2px 8px
    border-radius 4px
</style>