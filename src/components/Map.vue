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
              <q-card-title>当前在线设备数</q-card-title>
              <q-card-main class="text-center">
                <h5>{{online}} 台</h5>
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
                  <h6>{{currentName}}</h6>
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
                  <q-item-main class="text-bold text-red">{{aqi}}</q-item-main>
                  <q-item-side right><div class="rank text-white" :style="{backgroundColor: aqiColor}">{{aqiLevel}}</div></q-item-side>
                </q-item>
                <q-item-separator />
                <q-list-header style="font-weight:600;">设备数据</q-list-header>
                <q-item v-for="(item,index) in dataList" :key="index">
                  <q-item-side style="width: 20%;">{{item.name}}</q-item-side>
                  <q-item-main>
                    <div class="backBar">
                      <span class="dataBar" :style="{width: item.width + '%', backgroundColor:item.color}"></span>
                    </div>
                  </q-item-main>
                  <q-item-side style="width: 35%;">
                    {{item.data.toFixed(0)}} {{item.unit}}
                  </q-item-side>
                </q-item>
                <q-item-separator />
                <q-list-header style="font-weight:600;">室外数据</q-list-header>
                <q-item>
                  <q-item-side style="width: 20%;">PM2.5</q-item-side>
                  <q-item-main class="text-center">{{outData.pm2d5.data}}</q-item-main>
                  <q-item-side style="width: 30%"> 
                    <div class="text-center" style="color:white;width:100%;border-radius:8px;padding: 2px;" :style="{backgroundColor:outData.pm2d5.color}">{{outData.pm2d5.level}}</div>
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-side style="width: 20%;">PM10</q-item-side>
                  <q-item-main class="text-center">{{outData.pm10.data}}</q-item-main>
                  <q-item-side style="width: 30%"> 
                    <div class="text-center" style="color:white;width:100%;border-radius:8px;padding: 2px;" :style="{backgroundColor:outData.pm10.color}">{{outData.pm10.level}}</div>
                  </q-item-side>
                </q-item>
                <q-item><q-item-main class="text-center"><q-btn color="primary" @click="status = 1">查看详情</q-btn></q-item-main></q-item>
              </q-list>
            </div>
          </q-slide-transition>
        </div>
      </q-list>
    </div>

    <div v-else-if="status === 1">
      <device-panel :adapterId="currentId" :name="currentName" :state="state"></device-panel>
    </div>

  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { deviceService, weatherService } from "api/index";
import { dataFormatService } from "../lib/dataFormat";
import devicePanel from "./Device";
export default {
  components: {
    devicePanel
  },
  data: () => ({
    status: 0,
    total: 0,
    online: 0,
    error: 0,
    state: 0,
    deviceIdList: [],
    deviceTimeMap: new Map(),
    deviceLocation: [],
    deviceNameMap: new Map(),
    deviceAdapterIdMap: new Map(),
    clickDeviceId: null,
    mouseoverDeviceId: null,
    searchKey: null,
    deviceList: [],
    map: {
      zoom: 8,
      center: [116.397045, 39.907623]
    },
    markers: [],
    currentName: null,
    currentId: null,
    addressText: null,
    addressInfo: null,
    panelVisible: false,
    dataList: [],
    outData: {
      pm2d5: {
        data: null,
        color: "rgba(136,136,136,.6)",
        level: "--"
      },
      pm10: {
        data: null,
        color: "rgba(136,136,136,.6)",
        level: "--"
      }
    },
    aqi: null,
    aqiLevel: "--",
    aqiColor: "rgba(136,136,136,.6)"
  }),
  computed: {
    deviceId: function() {
      if (this.clickDeviceId) {
        return this.clickDeviceId;
      } else {
        return this.mouseoverDeviceId;
      }
    }
  },
  watch: {
    searchKey(value) {
      if (!value) {
        this.markers = this.deviceList;
      }
    }
  },
  methods: {
    searchDevice(terms, done) {
      console.log(this.searchKey);
      if (terms !== "") {
        let searchList = [];
        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].name.includes(terms)) {
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
                let name =
                  r.data[i].customize.name ||
                  "Y1-" + r.data[i].linked.id.substr(-4);
                let adapterId = r.data[i].id;
                this.deviceNameMap.set(r.data[i].linked.id, name);
                this.deviceAdapterIdMap.set(r.data[i].linked.id, adapterId);
                // console.log(this.deviceAdapterIdMap)
              }
            }

            this.total = this.deviceIdList.length;
            this.getLastTime(this.deviceIdList);
            this.getStatus(this.deviceIdList);
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
    getStatus(list) {
      for (let i = 0; i < list.length; i++) {
        deviceService
          .getDeviceStatus(list[i])
          .then(r => {
            if (r.data && r.data.latitude && r.data.longitude) {
              let latitude = r.data.latitude.data;
              let longitude = r.data.longitude.data;
              this.deviceLocation.push({
                id: list[i],
                lat: latitude,
                long: longitude
              });
            }
            if (i === list.length - 1) {
              this.initMap();
            }
          })
          .catch(e => {});
      }
    },
    initMap() {
      let markers = [];
      let num = 20;
      let self = this;
      let idx = 0;
      for (let i = 0; i < this.deviceLocation.length; i++) {
        if (!LocalStorage.has(this.deviceLocation[i].id)) {
          this.setAddressText(this.deviceLocation[i].id, [
            this.deviceLocation[i].long,
            this.deviceLocation[i].lat
          ]);
        }

        markers.push({
          id: this.deviceLocation[i].id,
          position: [this.deviceLocation[i].long, this.deviceLocation[i].lat],
          name: this.deviceNameMap.get(this.deviceLocation[i].id),
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
              self.currentName = markers[i].name;
              self.currentId = self.deviceAdapterIdMap.get(markers[i].id);
              self.getDataList();
              self.getLocation(markers[i].position);
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
    setAddressText(id, position) {
      const self = this;
      position = position || [116.397045, 39.907623];
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress(position, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          LocalStorage.set(id, result.regeocode.formattedAddress);
        }
      });
    },
    getDataList: function() {
      if (this.panelVisible && this.deviceId) {
        let dataListType = ["pm2d5", "pm10", "db", "humidity", "temperature"];
        let list = [];
        deviceService.getLastData(this.deviceId).then(r => {
          if (r.data && r.data.data && r.data.data[0] && r.data.data[0].data) {
            let lastData = r.data.data[0].data;
            for (let i = 0; i < dataListType.length; i++) {
              let type = dataListType[i];
              if (lastData[type] >= 0 && dataFormatService[type]) {
                let item = {
                  type: type,
                  data: lastData[type],
                  width: dataFormatService[type].getPercentage(lastData[type]),
                  color: dataFormatService[type].getColor(lastData[type]),
                  name: dataFormatService[type].name,
                  unit: dataFormatService[type].unit
                  // level: dataFormatService[type].getLevelText(lastData[type])
                };
                if (type === "temperature" || type === "humidity") {
                  item.data = item.data / 100;
                  item.width = dataFormatService[type].getPercentage(item.data);
                  item.color = dataFormatService[type].getColor(item.data);
                }
                list.push(item);
              }
            }
            this.dataList = list;

            if (lastData.aqi >= 0) {
              this.aqi = lastData.aqi.toFixed(0);
              this.aqiLevel = dataFormatService.aqi.getLevelText(lastData.aqi);
              this.aqiColor = dataFormatService.aqi.getColor(lastData.aqi);
            }
          }
        });
      }
    },
    getLocation(position) {
      deviceService.getDeviceConfig(this.deviceId).then(r => {
        if (r.data && r.data.weatherId) {
          this.getOutData(r.data.weatherId);
        } else {
          this.setLocation(position);
        }
      });
    },
    getOutData(stationId) {
      let cityId;
      if (stationId.indexOf(":") !== -1) {
        cityId = stationId.split(":")[0];
      } else {
        cityId = stationId;
      }
      weatherService.getCurrentAir(cityId).then(r => {
        if (r.data && r.data.content) {
          let content = r.data.content;
          for (let i = 0; i < content.length; i++) {
            if (content[i].id === stationId) {
              this.outData.pm2d5.data = content[
                i
              ].data.air[0].data.pm25.toFixed(0);
              this.outData.pm2d5.level = dataFormatService.pm2d5.getLevelText(
                this.outData.pm2d5.data
              );
              this.outData.pm2d5.color = dataFormatService.pm2d5.getColor(
                this.outData.pm2d5.data
              );
              this.outData.pm10.data = content[i].data.air[0].data.pm10.toFixed(
                0
              );
              this.outData.pm10.level = dataFormatService.pm10.getLevelText(
                this.outData.pm10.data
              );
              this.outData.pm10.color = dataFormatService.pm10.getColor(
                this.outData.pm10.data
              );
            }
          }
        }
      });
    },
    setLocation(position) {
      const that = this;
      weatherService
        .getWeatherId(position[0], position[1])
        .then(r => {
          let weatherId = r.data.content[0].id;
          deviceService
            .changeDeviceConfig(this.deviceId, "weatherId", weatherId)
            .then(r => {
              that.getOutData(weatherId)
            })
            .catch(e => {});
        })
        .catch(e => {});
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
  font-family 'Microsoft YaHei' !important
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
  .backBar
    width 100%
    height 0.6vh
    background-color #eeeeee
    border-radius 5px
    margin 0 auto
    position relative
    z-index 10
    .dataBar
      z-index 99
      height 100%
      width 40%
      position absolute
      left 0
      top 0
      border-radius 5px
      background-color RGBA(229, 218, 48, 1)
</style>