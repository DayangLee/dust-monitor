<template>
  <div class="device-wrapper">
    <q-list>
      <div class="row justify-between" style="padding:0 20px;">
        <h5>设备信息</h5>
        <q-btn color="positive" v-if="edit" @click="changeDeviceInfo">完成</q-btn>
        <q-btn color="primary" v-else-if="!edit" @click="edit = true">编辑</q-btn>
      </div>
      <q-item-separator />
      <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备名称：
            </div>
            <div class="right">
              <q-input class="input1" v-model="deviceName" :disabled="!edit" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              SIM ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">{{simId}}</div>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">{{deviceId}}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备状态：
            </div>
            <div class="right">
              <q-radio v-model="newDeviceState" :disabled="!edit" val="0" color="red" label="关闭" />
              <q-radio v-model="newDeviceState" :disabled="!edit" val="1" color="secondary" label="开启" style="margin-left: 10px" />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备位置：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              运行时长：
            </div>
            <div class="right">
              <div class="input1 row items-center">{{runTime}}</div>
            </div>
          </div>
        </div>
      </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>设备数据</h5>
          <h6>{{updateTime}} 更新</h6>
        </div>
        <q-item-separator />
        <div class="row dy-cols justify-between">
          <div class="dy-col" v-show="hasPM25">
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.pm2d5}}</span>
                  <span class="unit">ug/m³</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range" :style="{backgroundColor: pm2d5Color}">
                    {{pm2d5LevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasPM10">
            <q-card>
              <q-card-title>PM10</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.pm10}}</span>
                  <span class="unit">ug/m³</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range" :style="{backgroundColor: pm10Color}">
                    {{pm10LevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasDB">
            <q-card>
              <q-card-title>噪音</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.bd}}</span>
                  <span class="unit">db</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range" :style="{backgroundColor: dbColor}">
                    {{dbLevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasTemp">    
            <q-card>
              <q-card-title>温度</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.temperature}}</span>
                  <span class="unit">℃</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range" :style="{backgroundColor: tempColor}">
                    {{tempLevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasHum">    
            <q-card>
              <q-card-title>湿度</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.humidity}}</span>
                  <span class="unit">%</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range" :style="{backgroundColor: humColor}">
                    {{humLevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasWindspeed">    
            <q-card>
              <q-card-title>风速</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.windSpeed}}</span>
                  <span class="unit">m/s</span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range text-white">
                    {{pm2d5LevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col" v-show="hasWindDirection">    
            <q-card>
              <q-card-title>风向</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.windDirection}}</span>
                  <span class="unit"></span>
                </div>
                <div class="row justify-center items-center">
                  <div class="range text-white">
                    {{pm2d5LevelText}}
                  </div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>设备常用设置</h5>
          <q-btn color="positive" @click="changeSettings">应用</q-btn>
        </div>
        <q-item-separator />
          <div class="row justify-around">
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">数据上传间隔：</div>
              <div class="right">
                <q-select v-model="durTargetSelect" :options="durTargetOptions" />
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">颗粒物校准：</div>
              <div class="right">
                <q-select v-model="particulatesSelect" :options="particulatesOptions" />
              </div>
            </div>
          </div>
          <div class="row justify-around">
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">温度校准：</div>
              <div class="right">
                <q-select v-model="tempSelect" :options="tempOptions" />
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">湿度校准：</div>
              <div class="right">
                <q-select v-model="humSelect" :options="humOptions" />
              </div>
            </div>
          </div>
        </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>历史记录</h5>
          <q-btn color="positive" @click="export2Excel">导出</q-btn>
        </div>
        <q-item-separator />
        <!-- <div class="row justify-start items-center" style="margin:20px 0;">
          <div class="left" style="width: 15%;">监测项目：</div>
          <div class="right">
            <q-checkbox v-model="checkArray" label="PM2.5" color="primary" val="pm2d5" />
            <q-checkbox v-model="checkArray" label="PM10" val="pm10" color="positive" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="噪音" val="db" color="negative" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="温度" val="temp" color="warning" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="湿度" val="hum" color="secondary" style="margin-left: 10px" />
          </div>
        </div> -->
        <div class="row justify-start items-center" style="margin:20px 0;">
          <div class="left" style="width: 15%;">时间范围：</div>
          <div class="right">
            <el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getHistoryData"></el-date-picker>
          </div>
        </div>
        <div class="echarts">
          <IEcharts :option="option" :resizable="true"/>
        </div>
      </q-list>

      
      </el-date-picker>
  </div>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/lite.js";
import "echarts/lib/chart/line";
import "echarts/lib/component/grid";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legend";
import { deviceService } from "../api/index";
import { timestampToTime } from "../lib/params";
import { dataFormatService } from "../lib/dataFormat";
import { Alert } from "quasar";
import "quasar-extras/animate/bounceInRight.css";
import "quasar-extras/animate/bounceOutRight.css";
const durTargetOptions = [
  { value: 0, label: "5min" },
  { value: 1, label: "15min" },
  { value: 2, label: "30min" },
  { value: 3, label: "60min" }
];
const particulatesOptions = [
  { value: 0, label: "0.40" },
  { value: 1, label: "0.45" },
  { value: 2, label: "0.50" },
  { value: 3, label: "0.55" },
  { value: 4, label: "0.60" },
  { value: 5, label: "0.65" },
  { value: 6, label: "0.70" },
  { value: 7, label: "0.75" },
  { value: 8, label: "0.80" },
  { value: 9, label: "0.85" },
  { value: 10, label: "0.90" },
  { value: 11, label: "0.95" },
  { value: 12, label: "1.00" },
  { value: 13, label: "1.05" },
  { value: 14, label: "1.10" },
  { value: 15, label: "1.15" },
  { value: 16, label: "1.20" },
  { value: 17, label: "1.25" },
  { value: 18, label: "1.30" },
  { value: 19, label: "1.35" },
  { value: 20, label: "1.40" },
  { value: 21, label: "1.45" },
  { value: 22, label: "1.50" },
  { value: 23, label: "1.55" }
];
const tempOptions = [
  { value: 0, label: "-2.5%" },
  { value: 1, label: "-2.0%" },
  { value: 2, label: "-1.5%" },
  { value: 3, label: "-1.0%" },
  { value: 4, label: "-0.5%" },
  { value: 5, label: "0" },
  { value: 6, label: "+0.5%" },
  { value: 7, label: "+1.0%" },
  { value: 8, label: "+1.5%" },
  { value: 9, label: "+2.0%" },
  { value: 10, label: "+2.5%" }
];
const humOptions = [
  { value: 0, label: "-25%" },
  { value: 1, label: "-20%" },
  { value: 2, label: "-15%" },
  { value: 3, label: "-10%" },
  { value: 4, label: "-5%" },
  { value: 5, label: "0" },
  { value: 6, label: "+05%" },
  { value: 7, label: "+10%" },
  { value: 8, label: "+15%" },
  { value: 9, label: "+20%" },
  { value: 10, label: "+25%" }
];
export default {
  name: "devicePanel",
  components: {
    IEcharts
  },
  props: {
    adapterId: {
      required: true
    },
    name: {
      type: String
    },
    state: {
      required: true,
      default: 0,
      type: Number
    }
  },
  data: () => ({
    edit: false,
    deviceName: null,
    deviceId: null,
    simId: null,
    runTime: null,
    deviceState: "0",
    newDeviceState: "0",
    updateTime: "",
    hasPM25: false,
    hasPM10: false,
    hasDB: false,
    hasTemp: false,
    hasHum: false,
    hasWindspeed: false,
    hasWindDirection: false,
    lastData: {
      pm2d5: "--",
      pm10: "--",
      db: "--",
      temperature: "--",
      humidity: "--",
      windSpeed: "--",
      windDirection: "--"
    },
    input: "",
    radio: 1,
    durTargetOptions: durTargetOptions,
    particulatesOptions: particulatesOptions,
    tempOptions: tempOptions,
    humOptions: humOptions,
    durTargetSelect: null,
    particulatesSelect: null,
    tempSelect: null,
    humSelect: null,
    checkArray: ["pm2d5"],
    timeRange: [],
    historyData: []
  }),
  computed: {
    pm2d5Color: function() {
      return dataFormatService.pm2d5.getColor(this.lastData.pm2d5);
    },
    pm2d5LevelText: function() {
      return dataFormatService.pm2d5.getLevelText(this.lastData.pm2d5);
    },
    pm10Color: function() {
      return dataFormatService.pm10.getColor(this.lastData.pm10);
    },
    pm10LevelText: function() {
      return dataFormatService.pm10.getLevelText(this.lastData.pm10);
    },
    dbColor: function() {
      return dataFormatService.db.getColor(this.lastData.db);
    },
    dbLevelText: function() {
      return dataFormatService.db.getLevelText(this.lastData.db);
    },
    tempColor: function() {
      return dataFormatService.temperature.getColor(this.lastData.temperature);
    },
    tempLevelText: function() {
      return dataFormatService.temperature.getLevelText(
        this.lastData.temperature
      );
    },
    humColor: function() {
      return dataFormatService.humidity.getColor(this.lastData.humidity);
    },
    humLevelText: function() {
      return dataFormatService.humidity.getLevelText(this.lastData.humidity);
    },
    option: function() {
      let xData = [];
      let itemType = [];
      let seriesData = [];
      let pm2d5Data = [];
      let pm10Data = [];
      let dbData = [];
      let tempData = [];
      let humData = [];
      let start = 0;

      for (let i = 0; i < this.historyData.length; i++) {
        xData.push(this.historyData[i].time);
        pm2d5Data.push(this.historyData[i].pm2d5);
        pm10Data.push(this.historyData[i].pm10);
        dbData.push(this.historyData[i].db);
        tempData.push(this.historyData[i].temp);
        humData.push(this.historyData[i].hum);
      }

      if (this.historyData.length < 10) {
        start = 0;
      } else if (this.historyData.length < 50) {
        start = 15;
      } else if (this.historyData.length < 100) {
        start = 30;
      } else if (this.historyData.length < 150) {
        start = 40;
      } else if (this.historyData.length < 200) {
        start = 60;
      } else if (this.historyData.length < 300) {
        start = 70;
      } else if (this.historyData.length < 400) {
        start = 80;
      } else {
        start = 90;
      }

      // console.log(seriesData)

      let config = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        legend: {
          show: true,
          data: [
            {
              name: "PM2.5",
              icon: "bar",
              textStyle: {
                color: "#027be3"
              }
            },
            {
              name: "PM10",
              icon: "bar",
              textStyle: {
                color: "#21ba45"
              }
            },
            {
              name: "噪音",
              icon: "bar",
              textStyle: {
                color: "#db2828"
              }
            },
            {
              name: "温度",
              icon: "bar",
              textStyle: {
                color: "#f2c037"
              }
            },
            {
              name: "湿度",
              icon: "bar",
              textStyle: {
                color: "#26a69a"
              }
            }
          ],
          selected: {
            "PM2.5": true,
            PM10: true,
            噪音: false,
            温度: false,
            湿度: false
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: start,
            end: 100,
            handleSize: "100%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "PM2.5",
            type: "line",
            lineStyle: {
              color: "#027be3"
            },
            itemStyle: {
              normal: { color: "#027be3" }
            },
            data: pm2d5Data
          },
          {
            name: "PM10",
            type: "line",
            lineStyle: {
              color: "#21ba45"
            },
            itemStyle: {
              normal: { color: "#21ba45" }
            },
            data: pm10Data
          },
          {
            name: "噪音",
            type: "line",
            lineStyle: {
              color: "#db2828"
            },
            itemStyle: {
              normal: { color: "#db2828" }
            },
            data: dbData
          },
          {
            name: "温度",
            type: "line",
            lineStyle: {
              color: "#f2c037"
            },
            itemStyle: {
              normal: { color: "#f2c037" }
            },
            data: tempData
          },
          {
            name: "湿度",
            type: "line",
            lineStyle: {
              color: "#26a69a"
            },
            itemStyle: {
              normal: { color: "#26a69a" }
            },
            data: humData
          }
        ]
      };
      return config;
    }
  },
  methods: {
    getRunTime: function(id) {
      deviceService.getDeviceOnlineTime(id).then(r => {
        if (r.data.value) {
          let time = r.data.value;
          if (time < 60) {
            time = time + "秒";
          } else if (time < 3540) {
            time = Math.ceil(time / 60) + "分钟";
          } else {
            time =
              Math.floor(time / 3600) +
              "小时" +
              Math.ceil((time % 3600) / 60) +
              "分钟";
          }
          this.runTime = time;
        }
      });
    },
    getDeviceInfo: function(id) {
      deviceService.getDevice(id).then(r => {
        if (r.data && r.data.status) {
          let status = r.data.status;
          if (status.imsi && status.imsi.data) {
            let imsi = r.data.status.imsi.data;
            let simid = "";
            for (let i = 0; i <= imsi.length - 1; i++) {
              if (i % 2 !== 0) {
                simid += imsi[i];
              }
            }
            this.simId = simid;
          }

          if (status.settings_03) {
            this.deviceState = status.settings_03.data + "";
            this.newDeviceState = this.deviceState;
          }

          if (status.settings_00) {
            this.particulatesSelect = status.settings_00.data;
          }

          if (status.settings_01) {
            this.tempSelect = status.settings_01.data;
          }

          if (status.settings_02) {
            this.humSelect = status.settings_02.data;
          }

          if (status.settings_05) {
            this.durTargetSelect = status.settings_05.data;
          }
          // o   settings_00      颗粒数系数更改，0-23
          // o   settings_01      温度校准（加减0.5°）
          // o   settings_02      湿度校准（加减5%）
          // o   settings_03     开关机
          // o   settings_04     开关LED屏幕
          // o   settings_05     更改数据上传间隔单位s
        }
      });
    },
    getLastData: function(id) {
      deviceService
        .getLastData(id)
        .then(r => {
          if (r.data && r.data.data && r.data.data[0]) {
            this.updateTime = timestampToTime(r.data.data[0].timestamp);
            const data = r.data.data[0].data;
            for (let item in this.lastData) {
              if (item !== "windDirection") {
                if (data[item] || data[item] === 0) {
                  if (item === "temperature" || item === "humidity") {
                    this.lastData[item] = (data[item] / 100).toFixed(0);
                  } else {
                    this.lastData[item] = data[item].toFixed(0);
                  }
                  if (item === "db") {
                    this.hasDB = true;
                  } else if (item === "pm2d5") {
                    this.hasPM25 = true;
                  } else if (item === "pm10") {
                    this.hasPM10 = true;
                  } else if (item === "temperature") {
                    this.hasTemp = true;
                  } else if (item === "humidity") {
                    this.hasHum = true;
                  } else if (item === "windSpeed") {
                    this.hasWindspeed = true;
                  } else if (item === "windDirection") {
                    this.hasWindDir = true;
                  }
                }
              } else {
                if (data.windDirection || data.windDirection === 0) {
                  this.hasWindDirection = true
                  if (data.windDirection <= 22) {
                    this.lastData.windDirection = "北风";
                  } else if (data.windDirection <= 67) {
                    this.lastData.windDirection = "东北风";
                  } else if (data.windDirection <= 112) {
                    this.lastData.windDirection = "东风";
                  } else if (data.windDirection <= 157) {
                    this.lastData.windDirection = "东南风";
                  } else if (data.windDirection <= 202) {
                    this.lastData.windDirection = "南风";
                  } else if (data.windDirection <= 247) {
                    this.lastData.windDirection = "西南风";
                  } else if (data.windDirection <= 292) {
                    this.lastData.windDirection = "西风";
                  } else if (data.windDirection <= 337) {
                    this.lastData.windDirection = "西北风";
                  } else if (data.windDirection <= 360) {
                    this.lastData.windDirection = "北风";
                  } else {
                    this.lastData.windDirection = "--";
                  }
                  console.log(this.lastData.windDirection);
                }
              }
            }
          }
        })
        .catch(e => {});
    },
    getHistoryData() {
      this.historyData = [];
      if (this.timeRange !== []) {
        console.log(this.timeRange);
        const start = this.timeRange[0].getTime();
        const end = this.timeRange[1].getTime();
        const duration = end - start;

        let params = {};
        params.scale = 2;
        params.start = start;
        params.duration = duration;

        this.$http
          .get("/device/" + this.deviceId + "/data/history", {
            params: params
          })
          .then(r => {
            const list = r.data.data;
            if (list && list.length !== 0) {
              for (let i = 0; i < list.length; i++) {
                let item = {};
                item.time = timestampToTime(list[i].timestamp);
                item.pm2d5 = list[i].data.pm2d5;
                item.pm10 = list[i].data.pm10;
                item.db = list[i].data.db;
                item.temp = list[i].data.temperature;
                item.hum = list[i].data.humidity;
                this.historyData.push(item);
              }
            }
          });
      }
    },
    changeDeviceInfo() {
      let change1 = false;
      let change2 = false;
      if (this.deviceName !== "" && this.deviceName !== this.name) {
        let body = {
          value: this.deviceName
        };
        deviceService
          .changeCustomize(this.adapterId, "name", body)
          .then(r => {
            // this.edit = false;
            change1 = true;
          })
          .catch(e => {
            const alert = Alert.create({
              enter: "bounceInRight",
              leave: "bounceOutRight",
              color: "error",
              icon: "report_problem",
              html: "操作失败",
              position: "top-right"
            });

            setTimeout(function() {
              if (alert) {
                alert.dismiss();
              }
            }, 3000);
          });
      } else if (this.deviceName !== "" && this.deviceName === this.name) {
        change1 = true;
      } else if (this.deviceName === "") {
        const alert = Alert.create({
          enter: "bounceInRight",
          leave: "bounceOutRight",
          color: "warning",
          icon: "warning",
          html: "设备名称不能为空",
          position: "top-right"
        });

        setTimeout(function() {
          if (alert) {
            alert.dismiss();
          }
        }, 3000);
      }

      if (this.newDeviceState !== this.deviceState) {
        let body = {};
        body.settings_03 = this.newDeviceState;

        deviceService
          .postDeviceCommands(this.deviceId, body)
          .then(r => {
            this.deviceState = this.newDeviceState;
            change2 = true;
          })
          .catch(e => {
            const alert = Alert.create({
              enter: "bounceInRight",
              leave: "bounceOutRight",
              color: "error",
              icon: "report_problem",
              html: "操作失败",
              position: "top-right"
            });

            setTimeout(function() {
              if (alert) {
                alert.dismiss();
              }
            }, 3000);
          });
      } else {
        change2 = true;
      }

      const self = this;
      setTimeout(function() {
        if (change1 && change2) {
          self.edit = false;
        }
      }, 1000);
    },
    changeSettings() {
      let commit = {};
      commit.settings_00 = this.particulatesSelect;
      commit.settings_01 = this.tempSelect;
      commit.settings_02 = this.humSelect;
      commit.settings_05 = this.durTargetSelect;
      deviceService
        .postDeviceCommands(this.deviceId, commit)
        .then(r => {
          const alert = Alert.create({
            enter: "bounceInRight",
            leave: "bounceOutRight",
            color: "positive",
            icon: "check",
            html: "常用设置更改成功",
            position: "top-right"
          });

          setTimeout(function() {
            if (alert) {
              alert.dismiss();
            }
          }, 3000);
        })
        .catch(e => {
          const alert = Alert.create({
            enter: "bounceInRight",
            leave: "bounceOutRight",
            color: "error",
            icon: "report_problem",
            html: "操作失败",
            position: "top-right"
          });

          setTimeout(function() {
            if (alert) {
              alert.dismiss();
            }
          }, 3000);
        });
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../lib/Export2Excel");
        const tHeader = ["时间", "PM2.5", "PM10", "噪音", "温度", "湿度"];
        const filterVal = ["time", "pm2d5", "pm10", "db", "temp", "hum"];
        const list = [];

        const data = this.formatJson(filterVal, this.historyData);
        export_json_to_excel(tHeader, data, this.name + "历史数据");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    deviceService.getOneAdapter(this.adapterId).then(r => {
      if (r.data) {
        this.deviceId = r.data.linked.id;
        this.getRunTime(this.deviceId);
        this.getDeviceInfo(this.deviceId);
        this.getLastData(this.deviceId);
        this.getHistoryData(this.deviceId);
      }
    });

    if (this.state === 0) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    let now = new Date();
    let preDate = new Date(now.getTime() - 24 * 3 * 60 * 60 * 1000);
    this.timeRange = [preDate, now];
    this.deviceName = this.name;
  }
};
</script>

<style lang="stylus">
.device-wrapper
  .row
    margin 5px 0
  .q-input-target
    color black
  .left
    width 30%
    text-align right
    font-size 1rem
  .right
    width 70%
    text-align left
    font-size 1rem
    .input1
      width 87%
      height 40px
      font-size 18px
    .input2
      width 40%
      height 40px
    .q-select
      width 60%
  .echarts
    width 80%
    height 500px
    margin 0 auto
  .num
    font-size 1.4rem
  .unit
    margin-left 10px
  .range
    color white
    margin-top 10px
    width 100px
    padding-top 5px
    padding-bottom 5px
    border-radius 10rem
@media (min-width: 576px)
  .dy-cols .dy-col
    width 50%
@media (min-width: 768px)
  .dy-cols .dy-col
    width 28.4%
@media (min-width: 992px)
  .dy-cols .dy-col
    width 14.2%
@media (min-width: 1200px)
  .dy-cols .dy-col
    width 14.2%
</style>

