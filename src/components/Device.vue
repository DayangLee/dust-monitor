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
              <q-input class="input1" v-model="input" :disabled="!edit" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              SIM ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备状态：
            </div>
            <div class="right">
              <q-radio v-model="radio" :disabled="!edit" val="0" color="red" label="关闭" />
              <q-radio v-model="radio" :disabled="!edit" val="1" color="secondary" label="开启" style="margin-left: 10px" />
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
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备备注：
            </div>
            <div class="right">
              <q-input class="input1" v-model="input" :disabled="!edit" color="white" inverted />
            </div>
          </div>
        </div>
      </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>设备数据</h5>
          <h6>10:00 更新</h6>
        </div>
        <q-item-separator />
        <div class="row dy-cols justify-between">
          <div class="dy-col">
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">    
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">    
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">    
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
              </q-card-main>
            </q-card>
          </div>
          <div class="dy-col">    
            <q-card>
              <q-card-title>PM2.5</q-card-title>
              <q-card-main class="text-center">
                123
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
                <q-select v-model="select1" :options="options" />
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">颗粒物校准：</div>
              <div class="right">
                <q-select v-model="select1" :options="options" />
              </div>
            </div>
          </div>
          <div class="row justify-around">
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">温度校准：</div>
              <div class="right">
                <q-select v-model="select1" :options="options" />
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 row items-center">
              <div class="left">湿度校准：</div>
              <div class="right">
                <q-select v-model="select1" :options="options" />
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
            <q-checkbox v-model="checkArray" label="One" color="yellow" val="one" />
            <q-checkbox v-model="checkArray" label="Two" val="two" color="secondary" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="Three" val="three" color="red" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="Four" val="four" color="red" style="margin-left: 10px" />
            <q-checkbox v-model="checkArray" label="Five" val="five" color="red" style="margin-left: 10px" />
          </div>
        </div>
        <div class="row justify-start items-center">
          <div class="left" style="width: 15%;">时间范围：</div>
          <div class="right">
            <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
export default {
  name: "devicePanel",
  components: {
    IEcharts
  },
  data: () => ({
    edit: false,
    input: "hahaha",
    radio: 1,
    options: [
      {
        label: "Google",
        value: "goog"
      },
      {
        label: "Facebook",
        value: "fb"
      },
      {
        label: "Twitter",
        value: "twtr"
      },
      {
        label: "Apple Inc.",
        value: "appl"
      },
      {
        label: "Oracle",
        value: "ora"
      }
    ],
    select1: null,
    checkArray: ["one"],
    time: [new Date(2018, 2, 12, 10, 0), new Date()],
    xData: [0,1,2,3,4],
    yData: [0,1,2,3,4],
  }),
  computed: {
    option: function() {
      let config = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
          borderColor: "rgb(236,236,236)"
        },
        xAxis: [
          {
            type: "category",
            data: this.xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "设备数据",
            type: "line",
            data: this.yData
          }
        ]
      };
      return config;
    }
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

