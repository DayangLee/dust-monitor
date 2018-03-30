<template>
  <div class="device-wrapper">
    <q-list>
      <div class="row justify-between" style="padding:0 20px;">
        <h5>设备信息</h5>
        <q-btn color="positive" v-if="edit" @click="edit = false">完成</q-btn>
        <q-btn color="primary" v-else-if="!edit" @click="edit = true">编辑</q-btn>
      </div>
      <q-item-separator />
      <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备名称：
            </div>
            <div class="right">
              <q-input class="input1" v-model="name" :disabled="!edit" color="white" inverted />
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
              <div class="input1 row items-center">{{id}}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备状态：
            </div>
            <div class="right">
              <q-radio v-model="deviceState" :disabled="!edit" val="0" color="red" label="关闭" />
              <q-radio v-model="deviceState" :disabled="!edit" val="1" color="secondary" label="开启" style="margin-left: 10px" />
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
        <!-- <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备备注：
            </div>
            <div class="right">
              <q-input class="input1" v-model="input" :disabled="!edit" color="white" inverted />
            </div>
          </div>
        </div> -->
      </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>设备数据</h5>
          <h6>{{updateTime}} 更新</h6>
        </div>
        <q-item-separator />
        <div class="row dy-cols justify-between">
          <div class="dy-col">
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
          <div class="dy-col">
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
          <div class="dy-col">
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
          <div class="dy-col">    
            <q-card>
              <q-card-title>温度</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.temp}}</span>
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
          <div class="dy-col">    
            <q-card>
              <q-card-title>湿度</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.hum}}</span>
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
          <div class="dy-col">    
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
          <div class="dy-col">    
            <q-card>
              <q-card-title>风向</q-card-title>
              <q-card-main class="text-center">
                <div>
                  <span class="num">{{lastData.windDir}}</span>
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
          <q-btn color="positive">应用</q-btn>
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
          <q-btn color="positive">导出</q-btn>
        </div>
        <q-item-separator />
        <div class="row justify-start items-center" style="margin:20px 0;">
          <div class="left" style="width: 15%;">监测项目：</div>
          <div class="right">
            <q-checkbox v-model="checkArray" label="PM2.5" color="primary" val="pm2d5" />
            <q-checkbox v-model="checkArray" label="PM10" val="pm10" color="positive" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="噪音" val="db" color="negative" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="温度" val="temp" color="warning" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="湿度" val="hum" color="secondary" style="margin-left: 10px" />
          </div>
        </div>
        <div class="row justify-start items-center">
          <div class="left" style="width: 15%;">时间范围：</div>
          <div class="right">
            <el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
import { deviceService } from "../api/index";
import { timestampToTime } from "../lib/params";
import { dataFormatService } from "../lib/dataFormat";
export default {
  name: "devicePanel",
  components: {
    IEcharts
  },
  props: {
    id: {
      required: true,
      type: String
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
    simId: null,
    runTime: null,
    deviceState: null,
    updateTime: "",
    lastData: {
      pm2d5: null,
      pm10: null,
      db: null,
      temp: null,
      hum: null,
      windSpeed: null,
      windDir: null
    },
    input: "",
    radio: 1,
    durTargetOptions: [
      {
        label: "5min",
        value: 300
      },
      {
        label: "15min",
        value: 900
      },
      {
        label: "30min",
        value: 1800
      },
      {
        label: "60min",
        value: 3600
      }
    ],
    particulatesOptions: [
      {
        label: "0.30",
        value: 0.3
      },
      {
        label: "0.31",
        value: 0.31
      },
      {
        label: "0.32",
        value: 0.32
      },
      {
        label: "0.33",
        value: 0.33
      },
      {
        label: "0.34",
        value: 0.34
      },
      {
        label: "0.35",
        value: 0.35
      },
      {
        label: "0.36",
        value: 0.36
      },
      {
        label: "0.37",
        value: 0.37
      },
      {
        label: "0.38",
        value: 0.38
      },
      {
        label: "0.39",
        value: 0.39
      },
      {
        label: "0.40",
        value: 0.4
      },
      {
        label: "0.41",
        value: 0.41
      },
      {
        label: "0.42",
        value: 0.42
      },
      {
        label: "0.43",
        value: 0.43
      },
      {
        label: "0.44",
        value: 0.44
      },
      {
        label: "0.45",
        value: 0.45
      }
    ],
    tempOptions: [
      {
        label: "+0.5℃",
        value: 1
      },
      {
        label: "-0.5℃",
        value: 2
      }
    ],
    humOptions: [
      {
        label: "+0.5%",
        value: 1
      },
      {
        label: "-0.5%",
        value: 2
      }
    ],
    durTargetSelect: null,
    particulatesSelect: null,
    tempSelect: null,
    humSelect: null,
    checkArray: ["pm2d5"],
    timeRange: [new Date(2018, 2, 12, 10, 0), new Date()],
    historyData: []
  }),
  watch: {
    timeRange(value) {
      this.getHistoryData();
    }
  },
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
      return dataFormatService.DB.getColor(this.lastData.db);
    },
    dbLevelText: function() {
      return dataFormatService.DB.getLevelText(this.lastData.db);
    },
    tempColor: function() {
      return dataFormatService.temp.getColor(this.lastData.temp);
    },
    tempLevelText: function() {
      return dataFormatService.temp.getLevelText(this.lastData.temp);
    },
    humColor: function() {
      return dataFormatService.hum.getColor(this.lastData.hum);
    },
    humLevelText: function() {
      return dataFormatService.hum.getLevelText(this.lastData.hum);
    },
    option: function() {
      let xData = [];
      let seriesData = [];
      let pm2d5Data = [];
      let pm10Data = [];
      let dbData = [];
      let tempData = [];
      let humData = [];

      for (let i = 0; i < this.historyData.length; i++) {
        xData.push(timestampToTime(this.historyData[i].time));
        pm2d5Data.push(this.historyData[i].pm2d5);
        pm10Data.push(this.historyData[i].pm10);
        dbData.push(this.historyData[i].db);
        tempData.push(this.historyData[i].temp);
        humData.push(this.historyData[i].hum);
      }

      if (this.checkArray.indexOf("pm2d5") !== -1) {
        seriesData.push({
          name: "PM2.5",
          type: "line",
          data: pm2d5Data
        });
      }
      if (this.checkArray.indexOf("pm10") !== -1) {
        seriesData.push({
          name: "PM10",
          type: "line",
          data: pm10Data
        });
      }
      if (this.checkArray.indexOf("db") !== -1) {
        seriesData.push({
          name: "噪音",
          type: "line",
          data: dbData
        });
      }
      if (this.checkArray.indexOf("temp") !== -1) {
        seriesData.push({
          name: "温度",
          type: "line",
          data: tempData
        });
      }
      if (this.checkArray.indexOf("hum") !== -1) {
        seriesData.push({
          name: "湿度",
          type: "line",
          data: humData
        });
      }

      let config = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
          borderColor: "rgb(236,236,236)"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
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
        series: seriesData
      };
      return config;
    }
  },
  methods: {
    getSimId: function() {
      deviceService.getDevice(this.id).then(r => {
        if (
          r.data &&
          r.data.status &&
          r.data.status.imsi &&
          r.data.status.imsi.data
        ) {
          let imsi = r.data.status.imsi.data;
          let simid = "";
          for (let i = 0; i <= imsi.length - 1; i++) {
            if (i % 2 !== 0) {
              simid += imsi[i];
            }
          }
          this.simId = simid;
        }
      });
    },
    getRunTime: function() {
      deviceService.getDeviceOnlineTime(this.id).then(r => {
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
    getStatus: function() {
      deviceService.getDeviceStatus(this.id).then(r => {
        if (r.data) {
          // this.power = r.data.power.data;
          // console.log(r.data);
        }
      });
    },
    getLastData: function() {
      deviceService
        .getLastData(this.id)
        .then(r => {
          if (r.data && r.data.data && r.data.data[0]) {
            this.updateTime = timestampToTime(r.data.data[0].timestamp);
            const data = r.data.data[0].data;
            for (let item in this.lastData) {
              if (item !== "windDir") {
                if (data[item] || data[item] === 0) {
                  this.lastData[item] = data[item].toFixed(0);
                }
              } else {
                if (data.windDir || data.windDir === 0) {
                  if (data.windDir < 20) {
                    this.lastData.windDir = "北风";
                  } else if (data.windDir < 70) {
                    this.lastData.windDir = "东北风";
                  } else if (data.windDir < 110) {
                    this.lastData.windDir = "东风";
                  } else if (data.windDir < 160) {
                    this.lastData.windDir = "东南风";
                  } else if (data.windDir < 200) {
                    this.lastData.windDir = "南风";
                  } else if (data.windDir < 250) {
                    this.lastData.windDir = "西南风";
                  } else if (data.windDir < 290) {
                    this.lastData.windDir = "西风";
                  } else if (data.windDir < 340) {
                    this.lastData.windDir = "西北风";
                  } else if (data.windDir <= 360) {
                    this.lastData.windDir = "北风";
                  }
                }
              }
            }
          }
        })
        .catch(e => {});
    },
    getHistoryData() {
      this.historyData = [];
      const start = this.timeRange[0].getTime();
      const end = this.timeRange[1].getTime();
      const duration = end - start;

      let params = {};
      params.scale = 1;
      params.start = start;
      params.duration = duration;

      this.$http
        .get("/device/" + this.id + "/data/history", {
          params: params
        })
        .then(r => {
          const list = r.data.data;
          if (list && list.length !== 0) {
            for (let i = 0; i < list.length; i++) {
              let item = {};
              item.time = list[i].timestamp;
              item.pm2d5 = list[i].data.pm2d5;
              item.pm10 = list[i].data.pm10;
              item.db = list[i].data.db;
              item.temp = list[i].data.temp;
              item.hum = list[i].data.hum;
              this.historyData.push(item);
            }
          }
        });
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../lib/Export2Excel");
        const tHeader = ["时间", "pm2d5"];
        const filterVal = ["time", "pm2d5"];
        const list = [];
        for (let i = 0; i < this.xData.length; i++) {
          list.push({
            time: this.xData[i],
            pm2d5: this.yData[i]
          });
        }

        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, this.device.name + "历史数据");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  mounted() {
    if (this.state === 0) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    this.getSimId();
    this.getRunTime();
    this.getStatus();
    this.getLastData();
    this.getHistoryData();
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

