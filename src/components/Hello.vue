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
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legend";
import { deviceService } from "../api/index";
import { timestampToTime } from "../lib/params";
import { dataFormatService } from "../lib/dataFormat";
export default {
  name: "devicePanel",
  components: {
    IEcharts
  },
  // props: {
  //   adapterId: {
  //     required: true,
  //     // type: String
  //   },
  //   name: {
  //     type: String
  //   },
  //   state: {
  //     required: true,
  //     default: 0,
  //     type: Number
  //   }
  // },
  data: () => ({
    edit: false,
    deviceName: null,
    deviceId: null,
    simId: null,
    runTime: null,
    deviceState: "0",
    updateTime: "",
    lastData: {
      pm2d5: "--",
      pm10: "--",
      db: "--",
      temp: "--",
      hum: "--",
      windSpeed: "--",
      windDir: "--"
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
    timeRange: [],
    historyData: []
  }),
  watch: {
    // timeRange(value) {
      // this.getHistoryData();
    // }
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


  },
  created() {
    this.adapterId = "5ac2f5428273880631744c42"
    this.name = 'Y1-0003'
    this.state = 0
    
    // deviceService.getOneAdapter(this.adapterId).then(r=>{
      // console.log(r.data)
      // if(r.data){
        // this.deviceId = r.data.linked.id
      // }
    // })
    // console.log(this.state)
    // console.log(this.adapterId)
    // console.log(this.deviceId)

    if (this.state === 0) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    // let now = new Date();
    // let preDate = new Date(now.getTime() - 24 * 3 * 60 * 60 * 1000);
    // this.timeRange = [preDate, now];
    // this.deviceName = this.name
    // this.getSimId();
    // this.getRunTime();
    // this.getStatus();
    // this.getLastData();
    // this.getHistoryData();
    // deviceService.getOneAdapter(this.adapterId).then(r=>{
    //   console.log(r.data)
    // })
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